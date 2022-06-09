import { Anchor, Container, Divider, Paper, Text, Title } from "@mantine/core";
import React from "react";
import QRCode from "react-qr-code";

const PaperWrap = ({ children }) => (
  <Paper
    shadow="xl"
    radius="md"
    p="xs"
    withBorder
    sx={theme => ({
      backgroundColor:
        theme.colorScheme === "dark"
          ? theme.colors.dark[6]
          : theme.colors.gray[0],
      width: "fit-content",
    })}
  >
    {children}
  </Paper>
);

const Index = () => {
  const githubFE = "https://github.com/ickynavigator/EmuAccom-FE";
  const githubBE = "https://github.com/ickynavigator/EmuAccom-BE";
  const herokuFE = "https://emuaccom-fe.herokuapp.com/";
  const herokuBE = "https://emuaccom-be.herokuapp.com/";

  return (
    <Container>
      <Title order={1} align="center">
        About
      </Title>

      <Divider />

      <Divider
        mt="md"
        mb="xs"
        variant="dashed"
        labelPosition="center"
        label={<Title order={2}>Links</Title>}
      />

      <Divider
        mt="md"
        mb="xs"
        variant="dotted"
        labelPosition="left"
        label={<Title order={3}>Live</Title>}
      />

      <Text>
        Our website is available here:{" "}
        <Anchor href={herokuFE}>{herokuFE}</Anchor>
      </Text>

      <PaperWrap>
        <QRCode value={herokuFE} level="H" size={256} />
      </PaperWrap>

      <Text>
        Our backend/API is available here:{" "}
        <Anchor href={herokuBE}>{herokuBE}</Anchor>
      </Text>

      <PaperWrap>
        <QRCode value={herokuBE} level="H" size={256} />
      </PaperWrap>

      <Divider
        mt="md"
        mb="xs"
        variant="dotted"
        labelPosition="left"
        label={<Title order={3}>Source Code</Title>}
      />

      <Text>
        Our website source code is available here:{" "}
        <Anchor href={githubFE}>{githubFE}</Anchor>
      </Text>
      <Text>
        Our backend/API source code is available here:{" "}
        <Anchor href={githubBE}>{githubBE}</Anchor>
      </Text>
    </Container>
  );
};

export default Index;
