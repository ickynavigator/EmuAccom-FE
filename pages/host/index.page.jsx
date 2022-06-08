import { Container } from "@mantine/core";
import React from "react";
import WithManager from "../../HOC/withManager";

// eslint-disable-next-line arrow-body-style
const Index = () => {
  return (
    <Container sx={{ maxWidth: 500 }} mx="auto">
      list of items
    </Container>
  );
};

export default WithManager(Index);
