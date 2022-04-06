import {
  Button,
  Card,
  Group,
  Image,
  Text,
  useMantineTheme,
} from "@mantine/core";
import React from "react";

const Index = ({ _id, name, image, description }) => {
  const theme = useMantineTheme();

  const secondaryColor =
    theme.colorScheme === "dark" ? theme.colors.dark[1] : theme.colors.gray[7];

  return (
    <div style={{ width: 340, margin: "auto" }}>
      <Card shadow="sm" p="lg">
        <Card.Section>
          <Image src={image} height={160} alt={name} />
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
          href={`/dorms/${_id}`}
        >
          Check out house now
        </Button>
      </Card>
    </div>
  );
};

export default Index;
