import {
  Button,
  Card,
  Group,
  Image,
  Text,
  useMantineTheme,
} from "@mantine/core";
import React from "react";
import { Carousel } from "react-responsive-carousel";

const Index = ({ _id, name, pictures, description }) => {
  const theme = useMantineTheme();

  const secondaryColor =
    theme.colorScheme === "dark" ? theme.colors.dark[1] : theme.colors.gray[7];

  return (
    <div style={{ width: 340, margin: "auto" }}>
      <Card shadow="sm" p="lg">
        <Card.Section>
          <Carousel showArrows showThumbs={false} showStatus={false}>
            {pictures?.map(({ _id: id, url }) => (
              <div key={id}>
                <Image src={url} height={160} alt={name} />
              </div>
            ))}
          </Carousel>
        </Card.Section>

        <Group
          position="apart"
          style={{ marginBottom: 5, marginTop: theme.spacing.sm }}
        >
          <Text weight={500}>{name}</Text>
          {/* <Badge color="pink" variant="light">
            On Sale
          </Badge> */}
        </Group>

        <Text size="sm" style={{ color: secondaryColor, lineHeight: 1.5 }}>
          {description}
        </Text>

        <Button
          variant="light"
          color="blue"
          fullWidth
          style={{ marginTop: 14 }}
          component="a"
          href={`/dorm/${_id}`}
        >
          Check out house now
        </Button>
      </Card>
    </div>
  );
};

export default Index;
