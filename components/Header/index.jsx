import {
  ActionIcon,
  Anchor,
  Burger,
  Button,
  createStyles,
  Group,
  Header,
  MediaQuery,
  Navbar,
  Text,
  useMantineColorScheme
} from "@mantine/core";
import React from "react";
import { MoonStars, Sun } from "tabler-icons-react";
import { useAuth } from "../../hooks";

const useStyles = createStyles(theme => ({
  navbar: {
    [theme.fn.largerThan("sm")]: {
      display: "none",
    },
  },

  links: {
    [theme.fn.smallerThan("sm")]: {
      display: "none",
    },
  },
}));

export const MenuList = () => {
  const { isAuthenticated } = useAuth();

  return (
    <>
      <Anchor href="/about">About</Anchor>
      {isAuthenticated && <Anchor>protected</Anchor>}
    </>
  );
};

export const Index = ({ opened, setOpened }) => {
  const { isAuthenticated } = useAuth();
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const { classes } = useStyles();

  return (
    <Header py={30}>
      <Group sx={{ height: "100%" }} px={20} position="apart">
        <Anchor href="#">
          <Text>EmuAccom</Text>
        </Anchor>

        <MediaQuery largerThan="sm" styles={{ display: "none" }}>
          <Burger
            opened={opened}
            onClick={() => setOpened(o => !o)}
            size="sm"
            mr="xl"
          />
        </MediaQuery>

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

          <div className={classes.links}>
            <MenuList />
          </div>
        </Group>
      </Group>
    </Header>
  );
};

export const NavBar = ({ opened }) => {
  const { classes } = useStyles();

  return (
    <Navbar
      fixed
      className={classes.navbar}
      width={{ base: "100%", sm: 0 }}
      hidden={!opened}
    >
      <MenuList />
    </Navbar>
  );
};

export default Index;
