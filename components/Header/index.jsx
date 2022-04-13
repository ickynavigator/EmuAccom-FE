import {
  ActionIcon,
  Anchor,
  Burger,
  Button,
  Group,
  Header,
  Menu,
  Text,
  useMantineColorScheme,
} from "@mantine/core";
import React, { useContext, useState } from "react";
import { MoonStars, Sun, User } from "tabler-icons-react";
import { LOGOUT_USER } from "../../context/constants";
import { store } from "../../context/store";
import { useAuth } from "../../hooks";

export const MenuList = ({
  controlElement,
  onCloseCallback,
  onOpenCallback,
}) => {
  const { isAuthenticated } = useAuth();
  const { dispatch } = useContext(store);

  const LogoutHandler = () => {
    dispatch({ type: LOGOUT_USER });
  };

  return (
    <Menu
      control={controlElement}
      onOpen={onOpenCallback}
      onClose={onCloseCallback}
      withArrow
      styles={{
        item: {
          paddingBlock: "0.5rem",
        },
      }}
    >
      {!isAuthenticated && (
        <>
          <Menu.Item>
            <Anchor href="/signup" style={{ fontWeight: "bold" }}>
              Sign Up
            </Anchor>
          </Menu.Item>
          <Menu.Item>
            <Anchor href="/login">Login</Anchor>
          </Menu.Item>
        </>
      )}

      <Menu.Label>Menu</Menu.Label>
      <Menu.Item>
        <Anchor href="/dorm">View Dorms</Anchor>
      </Menu.Item>
      <Menu.Item>
        <Anchor href="/home">View Homes</Anchor>
      </Menu.Item>

      <Menu.Label>Hosting</Menu.Label>
      <Menu.Item>
        <Anchor href="/dorm/host">Register a dorm</Anchor>
      </Menu.Item>
      <Menu.Item>
        <Anchor href="/home/host">Host a home</Anchor>
      </Menu.Item>

      {isAuthenticated && (
        <>
          <Menu.Label>User</Menu.Label>

          <Menu.Item>
            <Anchor href="/profile">Profile</Anchor>
          </Menu.Item>
          <Menu.Item onClick={LogoutHandler}>Logout</Menu.Item>
        </>
      )}
    </Menu>
  );
};

export const Index = () => {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const [profileOpened, setProfileOpened] = useState(false);
  const title = profileOpened ? "Close menu" : "Open menu";

  return (
    <Header py={30}>
      <Group sx={{ height: "100%" }} px={20} position="apart">
        <Anchor href="/">
          <Text>EmuAccom</Text>
        </Anchor>

        <Group>
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

          <MenuList
            controlElement={
              <Button component="div" variant="light" radius="xl">
                <Burger opened={profileOpened} title={title} size="sm" />
                <User />
              </Button>
            }
            onOpenCallback={() => setProfileOpened(true)}
            onCloseCallback={() => setProfileOpened(false)}
          />
        </Group>
      </Group>
    </Header>
  );
};

export default Index;
