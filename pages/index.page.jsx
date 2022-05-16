import {
  Anchor,
  Button,
  Card,
  Center,
  Container,
  Image,
  SimpleGrid,
  Space,
  Text,
  Title,
} from "@mantine/core";
import React from "react";
import { Heart, Home, User } from "tabler-icons-react";

const GridCard = props => {
  const { imgSrc, imgAlt, url, text } = props;
  return (
    <Center>
      <Card withBorder style={{ width: 300 }} className="scale-on-hover">
        <Card.Section>
          <Image src={imgSrc} height={200} alt={imgAlt} />
        </Card.Section>

        <Anchor href={url} underline={false}>
          <Button
            variant="light"
            color="blue"
            fullWidth
            style={{ marginTop: 14 }}
          >
            {text}
          </Button>
        </Anchor>
      </Card>
    </Center>
  );
};

// eslint-disable-next-line arrow-body-style
const Index = () => {
  return (
    <Container>
      <Title order={1} align="center">
        Welcome to EmuAccom
      </Title>

      <Space h="md" />

      <Title order={3} align="center">
        A way to provide dorm and housing opportunities for students in Cyprus
        <Text>(and worldwide soon)</Text>
      </Title>

      <Space h="xl" />

      <Text align="center">
        You can browse our collections of dorms and homes that are maintained by
        the owners of the dorms and houses respectively. They are then visited
        and verified by our staff to ensure the quality of the dorms and houses
        as well as the security of our clients.
      </Text>

      <Space h="xl" />

      <Center>
        <User size={48} strokeWidth={2} />
        <Space w="md" />
        <Heart size={24} strokeWidth={2} color="pink" />
        <Space w="md" />
        <Home size={48} strokeWidth={2} />
      </Center>

      <Space h="xl" />

      <SimpleGrid
        cols={2}
        spacing={2}
        breakpoints={[{ maxWidth: 755, cols: 1, spacing: "sm" }]}
      >
        <GridCard
          imgSrc="./dorm.jpeg"
          imgAlt="Dormitory"
          url="./dorm"
          text="View all dorms"
        />
        <GridCard
          imgSrc="./apartment.jpeg"
          imgAlt="Apartment"
          url="./home"
          text="View all homes"
        />
      </SimpleGrid>
    </Container>
  );
};

export default Index;
