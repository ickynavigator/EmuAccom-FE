import {
  Alert,
  Button,
  Checkbox,
  Container,
  Group,
  TextInput,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { useRouter } from "next/router";
import React, { useContext, useEffect, useState } from "react";
import { LOGIN_USER } from "../../context/constants";
import { store } from "../../context/store";
import { useAuth } from "../../hooks";
import { signUpRequest } from "../../utils/axiosRequests";
import regexPatterns from "../../utils/regex-patterns";

const Index = () => {
  const { isAuthenticated } = useAuth();
  const { dispatch } = useContext(store);
  const router = useRouter();
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  useEffect(() => {
    if (isAuthenticated) {
      router.push("/");
    }
  });

  const formDetails = useForm({
    initialValues: {
      fName: "",
      lName: "",
      email: "",
      password: "",
      confirmPassword: "",
      termsOfService: false,
    },

    validate: {
      fName: value => (regexPatterns.name.test(value) ? null : "Invalid email"),
      lName: value => (regexPatterns.name.test(value) ? null : "Invalid email"),
      email: value =>
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
      const res = await signUpRequest({
        ...values,
        type: "student",
      });
      const { data, status } = res;
      if (status === 201) {
        dispatch({ type: LOGIN_USER, payload: data });
        const returnUrl = router.query.redirect || "/";
        router.push(returnUrl);
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
          id="FirstName"
          label="First Name"
          placeholder="Enter your first name"
          type="text"
          {...formDetails.getInputProps("fName")}
        />
        <TextInput
          required
          id="LastName"
          label="Last Name"
          placeholder="Enter your last name"
          type="text"
          {...formDetails.getInputProps("lName")}
        />
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
          <Button type="submit">Sign Up</Button>
        </Group>
      </form>
    </Container>
  );
};

export default Index;
