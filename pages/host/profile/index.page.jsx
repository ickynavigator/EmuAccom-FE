/// <reference path="../../types/typedefs.js"
import {
  Alert,
  Button,
  Container,
  Stack,
  Textarea,
  TextInput,
  Title,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import React, { useContext, useState } from "react";
import { UPDATE_MANAGER } from "../../../context/constants";
import { store } from "../../../context/store";
import WithManager from "../../../HOC/withManager";
import { updateManagerInfo } from "../../../utils/axiosRequests";
import Notifications from "../../../utils/Notifications";
import { isDev } from "../../../utils/serverHelpers";
import { isBlank, regexPatterns } from "../../../utils/stringTools";

const Index = () => {
  const { state } = useContext(store);
  /** @type {AppState} state */
  const { manager, dispatch } = state;

  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState(false);
  const [loading, setLoading] = useState(false);

  const formDetails = useForm({
    initialValues: {
      businessName: manager.businessName,
      managerEmail: manager.managerEmail,
      managerFirstName: manager.managerFirstName,
      managerLastName: manager.managerLastName,
      managerDescription: manager.managerDescription,
      password: "",
      confirmPassword: "",
    },
    validate: {
      businessName: value =>
        value.length > 0 ? null : "Business Name is required",
      managerEmail: value => (value.length > 0 ? null : "Email is required"),
      managerFirstName: value =>
        value.length > 0 ? null : "First Name is required",
      managerLastName: value =>
        value.length > 0 ? null : "Last Name is required",
      managerDescription: value =>
        value.length > 0 ? null : "Description is required",
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
        businessName: values.businessName,
        managerEmail: values.managerEmail,
        managerFirstName: values.managerFirstName,
        managerLastName: values.managerLastName,
        managerDescription: values.managerDescription,
        password: values.password,
        token: manager.token,
      };

      if (isBlank(values.password)) delete formData.password;
      const res = await updateManagerInfo(formData);

      if (res.status === 200) {
        formDetails.setValues({
          businessName: res.data.businessName,
          managerEmail: res.data.managerEmail,
          managerFirstName: res.data.managerFirstName,
          managerLastName: res.data.managerLastName,
          managerDescription: res.data.managerDescription,
          password: "",
          confirmPassword: "",
        });

        Notifications.success("Profile updated successfully");
        dispatch({ type: UPDATE_MANAGER, payload: res.data });
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
            id="businessName"
            label="Business Name"
            placeholder="Enter your business name"
            {...formDetails.getInputProps("businessName")}
          />
          <TextInput
            id="managerEmail"
            label="Manager Email"
            placeholder="Enter your email"
            type="email"
            {...formDetails.getInputProps("managerEmail")}
          />
          <TextInput
            id="managerfirstName"
            label="Manager First Name"
            placeholder="Enter your first name"
            {...formDetails.getInputProps("managerfirstName")}
          />
          <TextInput
            id="managerlastName"
            label="Manager Last Name"
            placeholder="Enter your last name"
            {...formDetails.getInputProps("managerlastName")}
          />
          <Textarea
            id="managerDescription"
            label="Manager Description"
            placeholder="Enter the manager's description"
            autosize
            minRows={2}
            maxRows={5}
            {...formDetails.getInputProps("managerDescription")}
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

export default WithManager(Index);
