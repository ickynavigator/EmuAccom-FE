import {
  ActionIcon,
  Button,
  Group,
  Header,
  Text,
  useMantineColorScheme,
} from "@mantine/core";
import React from "react";
import { MoonStars, Sun } from "tabler-icons-react";
import { useAuth } from "../../hooks";

export const Index = () => {
  const { isAuthenticated } = useAuth();
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();

  return (
    <Header py={30}>
      <Group sx={{ height: "100%" }} px={20} position="apart">
        <Text>EmuAccom</Text>

        <Group>
          {!isAuthenticated && (
            <>
              <Button component="a" href="/login" variant="outline">
                Login
              </Button>
              <Button component="a" href="/signup" variant="light">
                Sign Up
              </Button>
            </>
          )}
          <ActionIcon
            variant="default"
            onClick={() => toggleColorScheme()}
            size={30}
          >
            {colorScheme === "dark" ? (
              <Sun size={16} />
            ) : (
              <MoonStars size={16} />
            )}
          </ActionIcon>
        </Group>
      </Group>
    </Header>
  );
};

export default Index;
