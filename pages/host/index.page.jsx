import {
  Alert,
  Button,
  Checkbox,
  Container,
  Group,
  Space,
  Textarea,
  TextInput,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import Router from "next/router";
import React, { useContext, useEffect, useState } from "react";
import { STORE_MANAGER } from "../../context/constants";
import { store } from "../../context/store";
import WithAuthenticated from "../../HOC/withAuthenticated";
import { signUpManagerRequest } from "../../utils/axiosRequests";
import regexPatterns from "../../utils/regex-patterns";

const Index = () => {
  const { dispatch } = useContext(store);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [validForm, setValidForm] = useState(true);

  const formDetails = useForm({
    initialValues: {
      dormName: "",
      managerFirstName: "",
      managerLastName: "",
      managerEmail: "",
      managerDescription: "",
      termsOfService: false,
    },

    validate: {
      dormName: value =>
        regexPatterns.name.test(value) ? null : "Invalid dorm name",
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
      });
      const { data, status } = res;
      if (status === 201) {
        dispatch({ type: STORE_MANAGER, payload: data });
        const returnUrl = Router.query.redirect || "/dorm/host/add";
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

  useEffect(() => {
    if (formDetails.values.termsOfService) {
      setValidForm(formDetails.validate());
    }
  }, [setValidForm, formDetails]);

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
          required
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
          {...formDetails.getInputProps("email")}
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
          {...formDetails.getInputProps("termsOfService", { type: "checkbox" })}
        />
        <Group position="right" mt="md">
          <Button type="submit" disabled={validForm}>
            Sign Up
          </Button>
        </Group>
      </form>
    </Container>
  );
};

export default WithAuthenticated(Index);
