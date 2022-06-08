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
import { LOGIN_MANAGER } from "../../../context/constants";
import { store } from "../../../context/store";
import { useManagerAuth } from "../../../hooks";
import { signInManagerRequest } from "../../../utils/axiosRequests";
import { regexPatterns } from "../../../utils/stringTools";

const Index = () => {
  const { isAuthenticated } = useManagerAuth();
  const { dispatch } = useContext(store);
  const router = useRouter();
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  useEffect(() => {
    if (isAuthenticated) {
      router.push("/host");
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
    setErrorMessage("");

    try {
      const res = await signInManagerRequest(values);
      const { data, status } = res;

      if (status === 200) {
        dispatch({ type: LOGIN_MANAGER, payload: data });
        const returnUrl = router.query.redirect || "/host";
        router.push(returnUrl);
        return;
      }

      setError(true);
      if (res.response.status === 401) {
        setErrorMessage(res.response.data.message);
      }
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
            id="email"
            label="Email"
            placeholder="Enter your Manager email"
            type="email"
            {...formDetails.getInputProps("email")}
          />
          <TextInput
            required
            id="password"
            label="Password"
            placeholder="Enter your Manager password"
            type="password"
            {...formDetails.getInputProps("password")}
          />
          <Group position="right" mt="md">
            <Button type="submit">Submit</Button>
          </Group>
        </form>
      </Box>
      <Group mt="md" position="center">
        <Anchor component={NextLink} href="/host/signup">
          Not Signed Up yet?
        </Anchor>
        <Divider sx={{ height: "24px" }} size="md" orientation="vertical" />
        <Anchor component={NextLink} href="/host/forgot-password">
          Forgot Password?
        </Anchor>
      </Group>
    </Container>
  );
};

export default Index;
