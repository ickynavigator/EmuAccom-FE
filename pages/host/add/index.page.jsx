import { Alert, Container, Title } from "@mantine/core";
import { useForm } from "@mantine/form";
import React, { useState } from "react";
import PictureUpload from "../../../components/PictureUpload";

const Index = () => {
  const [error, setError] = useState(false);
  const [errorMessage] = useState("");
  const formDetails = useForm({
    initialValues: {},
  });

  /**
   * @param {typeof formDetails.values} values
   */
  const handleSubmit = values => {
    console.log(values);
  };

  return (
    <Container mx="auto">
      {error && (
        <Alert
          title="Signup Issue!"
          color="red"
          withCloseButton
          closeButtonLabel="Close alert"
          onClose={() => setError(false)}
        >
          {errorMessage || "Something terrible happened! Please try again."}
        </Alert>
      )}

      <Title>Add a new property</Title>

      <form onSubmit={formDetails.onSubmit(handleSubmit)}>
        <PictureUpload />
      </form>
    </Container>
  );
};

export default Index;
