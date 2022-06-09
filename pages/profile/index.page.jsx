/// <reference path="../../types/typedefs.js"
import {
  Alert,
  Button,
  Container,
  Stack,
  TextInput,
  Title,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import React, { useContext, useState } from "react";
import { UPDATE_USER } from "../../context/constants";
import { store } from "../../context/store";
import WithAuthenticated from "../../HOC/withAuthenticated";
import { updateUserInfo } from "../../utils/axiosRequests";
import Notifications from "../../utils/Notifications";
import { isDev } from "../../utils/serverHelpers";
import { isBlank, regexPatterns } from "../../utils/stringTools";

const Index = () => {
  const { state, dispatch } = useContext(store);
  /** @type {AppState} state */
  const { user } = state;

  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState(false);
  const [loading, setLoading] = useState(false);

  const formDetails = useForm({
    initialValues: {
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      password: "",
      confirmPassword: "",
    },
    validate: {
      email: value => (value.length > 0 ? null : "Email is required"),
      firstName: value => (value.length > 0 ? null : "First Name is required"),
      lastName: value => (value.length > 0 ? null : "Last Name is required"),
      password: value =>
        isBlank(value) && value.length <= 0
          ? null
          : regexPatterns.password.test(value)
          ? null
          : "Password must be at least 8 characters long and contain at least one number and one uppercase letter",
      confirmPassword: value =>
        isBlank(value)
          ? regexPatterns.password.test(value)
            ? formDetails.values.password === value
              ? null
              : "Password does not match"
            : null
          : "Invalid password",
    },
  });

  /** @param {formDetails.values} values */
  const submitHandler = async values => {
    setError(false);
    setLoading(true);
    try {
      const formData = {
        email: values.email,
        firstName: values.firstName,
        lastName: values.lastName,
        password: values.password,
        token: user.token,
      };

      if (isBlank(values.password)) delete formData.password;
      const res = await updateUserInfo(formData);

      if (res.status === 200) {
        formDetails.setValues({
          email: res.data.email,
          firstName: res.data.firstName,
          lastName: res.data.lastName,
          password: "",
          confirmPassword: "",
        });

        Notifications.success("Profile updated successfully");
        dispatch({ type: UPDATE_USER, payload: res.data });
      } else {
        setError(true);
        if (res.response.status === 401) {
          setErrorMessage(res.response.data.message);
        }
      }
    } catch (err) {
      setError(true);
      if (isDev()) console.error(err);
    }
    setLoading(false);
  };

  return (
    <Container>
      {error && (
        <Alert
          title="Update Issue!"
          color="red"
          withCloseButton
          closeButtonLabel="Close alert"
          onClose={() => setError(false)}
        >
          {errorMessage ||
            "Something terrible happened! Please try and update your profile again."}
        </Alert>
      )}

      <Title order={1} align="center">
        Update your details
      </Title>

      <form onSubmit={formDetails.onSubmit(submitHandler)}>
        <Stack my="md">
          <TextInput
            id="email"
            label="Email"
            placeholder="Enter your email"
            type="email"
            {...formDetails.getInputProps("email")}
          />
          <TextInput
            id="firstName"
            label="First Name"
            placeholder="Enter your first name"
            {...formDetails.getInputProps("firstName")}
          />
          <TextInput
            id="lastName"
            label="Last Name"
            placeholder="Enter your last name"
            {...formDetails.getInputProps("lastName")}
          />
          <TextInput
            id="password"
            label="Password"
            description="Enter a password if you want to change your current password"
            placeholder="Enter your password"
            type="password"
            {...formDetails.getInputProps("password")}
          />
          {formDetails.values.password.length > 0 && (
            <TextInput
              id="confirmPassword"
              label="Confirm Password"
              placeholder="Confirm password"
              type="password"
              {...formDetails.getInputProps("confirmPassword")}
            />
          )}
        </Stack>

        <Button type="submit" loading={loading}>
          Update
        </Button>
      </form>
    </Container>
  );
};

export default WithAuthenticated(Index);
