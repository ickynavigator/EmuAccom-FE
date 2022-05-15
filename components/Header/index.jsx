import {
  ActionIcon,
  Anchor,
  Burger,
  Button,
  Group,
  Header,
  Image,
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
          <Anchor href="/signup" style={{ fontWeight: "bold" }}>
            <Menu.Item>Sign Up</Menu.Item>
          </Anchor>
          <Anchor href="/login">
            <Menu.Item>Login</Menu.Item>
          </Anchor>
        </>
      )}

      <Menu.Label>Menu</Menu.Label>
      <Anchor href="/dorm">
        <Menu.Item>View Dorms</Menu.Item>
      </Anchor>
      <Anchor href="/home">
        <Menu.Item>View Homes</Menu.Item>
      </Anchor>

      <Menu.Label>Hosting</Menu.Label>
      <Anchor href="/host">
        <Menu.Item>Register a dorm or home</Menu.Item>
      </Anchor>

      {isAuthenticated && (
        <>
          <Menu.Label>User</Menu.Label>

          <Anchor href="/profile">
            <Menu.Item>Profile</Menu.Item>
          </Anchor>
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
          <Image
            src="./EmuAccomLogo-Hero.png"
            width={200}
            height={23}
            alt="Site Header"
            placeholder={<Text>EmuAccom</Text>}
          />
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
