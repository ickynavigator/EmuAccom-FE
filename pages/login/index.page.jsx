import {
  Alert,
  Anchor,
  Box,
  Button,
  Container,
  Divider,
  Group,
  TextInput,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { NextLink } from "@mantine/next";
import { useRouter } from "next/router";
import React, { useContext, useEffect, useState } from "react";
import { LOGIN_USER } from "../../context/constants";
import { store } from "../../context/store";
import { useAuth } from "../../hooks";
import { signInRequest } from "../../utils/axiosRequests";
import { regexPatterns } from "../../utils/stringTools";

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
      email: "",
      password: "",
    },

    validate: {
      email: value =>
        regexPatterns.email.test(value) ? null : "Invalid email",
      password: value =>
        regexPatterns.password.test(value) ? null : "Invalid password",
    },
  });

  const submitHandler = async values => {
    setError(false);
    try {
      const res = await signInRequest(values);
      const { data, status } = res;
      if (status === 200) {
        dispatch({ type: LOGIN_USER, payload: data });
        const returnUrl = router.query.redirect || "/";
        router.push(returnUrl);
        return;
      }

      setError(true);
      if (res.response.status === 401) {
        setErrorMessage(res.response.data.message);
      }
      setError(true);
    } catch (err) {
      setError(true);
    }
  };

  return (
    <Container>
      <Box sx={{ maxWidth: 300 }} mx="auto">
        {error && (
          <Alert
            title="Login Issue!"
            color="red"
            withCloseButton
            closeButtonLabel="Close alert"
            onClose={() => setError(false)}
          >
            {errorMessage ||
              "Something terrible happened! Please try and login again."}
          </Alert>
        )}
        <form onSubmit={formDetails.onSubmit(submitHandler)}>
          <TextInput
            required
            label="Email"
            placeholder="Enter your email"
            type="email"
            {...formDetails.getInputProps("email")}
          />
          <TextInput
            required
            label="Password"
            placeholder="Enter your password"
            type="password"
            {...formDetails.getInputProps("password")}
          />
          <Group position="right" mt="md">
            <Button type="submit">Submit</Button>
          </Group>
        </form>
      </Box>

      <Group mt="md" position="center">
        <Anchor component={NextLink} href="/signup">
          Not Signed Up yet?
        </Anchor>
        <Divider sx={{ height: "24px" }} size="md" orientation="vertical" />
        <Anchor component={NextLink} href="/login/forgot-password">
          Forgot Password?
        </Anchor>
      </Group>
    </Container>
  );
};

export default Index;
