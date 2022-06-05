import { Center, Container, Title } from "@mantine/core";
import React from "react";
import { WreckingBall } from "tabler-icons-react";

const Index = () => (
  <Container fluid>
    <Title order={1} align="center">
      Page under construction
    </Title>
    <Center style={{ minHeight: "80vh" }}>
      <WreckingBall size={200} strokeWidth={1} />
    </Center>
  </Container>
);

export default Index;
