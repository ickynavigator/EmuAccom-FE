import { Alert, Box, Button, Group, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useRouter } from "next/router";
import React, { useContext, useEffect, useState } from "react";
import { LOGIN_USER } from "../../context/constants";
import { store } from "../../context/store";
import { useAuth } from "../../hooks";
import { signInRequest } from "../../utils/axiosRequests";
import regexPatterns from "../../utils/regex-patterns";

const Index = () => {
  const { isAuthenticated } = useAuth();
  const { dispatch } = useContext(store);
  const router = useRouter();
  const [error, setError] = useState(false);
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
      const { data, status } = await signInRequest(values);
      if (status === 200) {
        dispatch({ type: LOGIN_USER, payload: data });
        const returnUrl = router.query.redirect || "/";
        router.push(returnUrl);
        return;
      }

      setError(true);
    } catch (err) {
      setError(true);
    }
  };

  return (
    <Box sx={{ maxWidth: 300 }} mx="auto">
      {error && (
        <Alert
          title="Login Issue!"
          color="red"
          withCloseButton
          closeButtonLabel="Close alert"
          onClose={() => setError(false)}
        >
          Something terrible happened! Please try and login again.
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
  );
};

export default Index;
