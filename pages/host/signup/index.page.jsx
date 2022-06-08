import {
  Alert,
  Anchor,
  Button,
  Checkbox,
  Container,
  Group,
  Space,
  Textarea,
  TextInput,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { NextLink } from "@mantine/next";
import Router from "next/router";
import React, { useContext, useState } from "react";
import { LOGIN_MANAGER } from "../../../context/constants";
import { store } from "../../../context/store";
import WithAuthenticated from "../../../HOC/withAuthenticated";
import { signUpManagerRequest } from "../../../utils/axiosRequests";
import { regexPatterns } from "../../../utils/stringTools";

const Index = () => {
  const { dispatch } = useContext(store);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const formDetails = useForm({
    initialValues: {
      businessName: "",
      managerFirstName: "",
      managerLastName: "",
      managerEmail: "",
      managerDescription: "",
      password: "",
      confirmPassword: "",
      termsOfService: false,
    },

    validate: {
      businessName: value =>
        regexPatterns.text.test(value) ? null : "Invalid business name",
      managerFirstName: value =>
        regexPatterns.name.test(value) ? null : "Invalid first name",
      managerLastName: value =>
        regexPatterns.name.test(value) ? null : "Invalid last name",
      managerEmail: value =>
        regexPatterns.email.test(value) ? null : "Invalid email",
      password: value =>
        regexPatterns.password.test(value) ? null : "Invalid password",
      confirmPassword: value =>
        regexPatterns.password.test(value)
          ? formDetails.values.password === value
            ? null
            : "Password does not match"
          : "Invalid password",
    },
  });

  /**
   * @param {typeof formDetails.values} values
   */
  const submitHandler = async values => {
    setError(false);
    setErrorMessage("");

    if (!values.termsOfService) {
      setError(true);
      setErrorMessage("You must accept the terms of service");
      return;
    }

    try {
      const res = await signUpManagerRequest({
        ...values,
        type: "manager",
      });
      const { data, status } = res;
      if (status === 201) {
        dispatch({ type: LOGIN_MANAGER, payload: data });
        const returnUrl = Router.query.redirect || "/host/profile";
        Router.push(returnUrl);
        return;
      }

      setError(true);
      if (res.response.status === 400) {
        setErrorMessage(res.response.data.message);
      }
    } catch (err) {
      setError(true);
    }
  };

  return (
    <Container sx={{ maxWidth: 500 }} mx="auto">
      {error && (
        <Alert
          title="Signup Issue!"
          color="red"
          withCloseButton
          closeButtonLabel="Close alert"
          onClose={() => setError(false)}
        >
          {errorMessage ||
            "Something terrible happened! Please try and signup again."}
        </Alert>
      )}

      <form onSubmit={formDetails.onSubmit(submitHandler)}>
        <TextInput
          required
          label="Business Name"
          placeholder="Enter your business name"
          type="text"
          {...formDetails.getInputProps("businessName")}
        />
        <TextInput
          required
          id="managerFirstName"
          label="Manager First Name"
          placeholder="Enter the manager's first name"
          type="text"
          {...formDetails.getInputProps("managerFirstName")}
        />
        <TextInput
          required
          id="managerLastName"
          label="Manager Last Name"
          placeholder="Enter the manager's last name"
          type="text"
          {...formDetails.getInputProps("managerLastName")}
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

        <Space h="xl" />

        <TextInput
          required
          id="Email"
          label="Email"
          placeholder="Enter your email"
          type="email"
          {...formDetails.getInputProps("managerEmail")}
        />
        <TextInput
          required
          id="Password"
          label="Password"
          placeholder="Enter your password"
          type="password"
          {...formDetails.getInputProps("password")}
        />
        <TextInput
          required
          id="ConfirmPassword"
          label="Confirm Password"
          placeholder="Confirm password"
          type="password"
          {...formDetails.getInputProps("confirmPassword")}
        />
        <Checkbox
          mt="md"
          id="ToS"
          label="I agree to the terms of service"
          {...formDetails.getInputProps("termsOfService", {
            type: "checkbox",
          })}
        />
        <Group position="right" mt="md">
          <Button type="submit">Sign Up</Button>
        </Group>
      </form>

      <Group mt="md" position="center">
        <Anchor component={NextLink} href="/host/login">
          Already Signed Up?
        </Anchor>
      </Group>
    </Container>
  );
};

export default WithAuthenticated(Index);
