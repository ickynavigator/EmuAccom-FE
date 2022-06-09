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
import { NextLink } from "@mantine/next";
import React, { useContext, useState } from "react";
import { MoonStars, Sun, User } from "tabler-icons-react";
import { LOGOUT_MANAGER, LOGOUT_USER } from "../../context/constants";
import { store } from "../../context/store";
import { useAuth, useManagerAuth } from "../../hooks";

export const MenuList = ({
  controlElement,
  onCloseCallback,
  onOpenCallback,
}) => {
  const { isAuthenticated } = useAuth();
  const { isAuthenticated: isManager } = useManagerAuth();
  const { dispatch } = useContext(store);

  const LogoutHandler = () => {
    dispatch({ type: LOGOUT_USER });
  };
  const LogoutManagerHandler = () => {
    dispatch({ type: LOGOUT_MANAGER });
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
          <Menu.Item component={NextLink} href="/signup">
            Sign Up
          </Menu.Item>
          <Menu.Item component={NextLink} href="/login">
            Login
          </Menu.Item>
        </>
      )}
      <Menu.Item component={NextLink} href="/about">
        About
      </Menu.Item>

      <Menu.Label>Menu</Menu.Label>
      <Menu.Item component={NextLink} href="/dorm">
        View Dorms
      </Menu.Item>
      <Menu.Item component={NextLink} href="/home">
        View Homes
      </Menu.Item>

      <Menu.Label>Hosting</Menu.Label>

      {isManager ? (
        <>
          <Menu.Item component={NextLink} href="/host">
            View dashboard
          </Menu.Item>
          <Menu.Item component={NextLink} href="/host/profile">
            View manager profile
          </Menu.Item>
          <Menu.Item component={NextLink} href="/host/add">
            Add new property
          </Menu.Item>
          <Menu.Item onClick={LogoutManagerHandler}>Logout manager</Menu.Item>
        </>
      ) : (
        <Menu.Item component={NextLink} href="/host">
          Register a dorm or home
        </Menu.Item>
      )}

      {isAuthenticated && (
        <>
          <Menu.Label>User</Menu.Label>

          <Menu.Item component={NextLink} href="/profile">
            Profile
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
          <Image
            src="/EmuAccomLogo-Hero.png"
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
