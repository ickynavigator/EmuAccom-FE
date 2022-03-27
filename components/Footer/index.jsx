import { Button, Group, Navbar, Text } from "@mantine/core";
import React from "react";
import styles from "../../styles/components/Footer.module.scss";

export const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <Navbar component="footer" height={120} className={styles.footer}>
      <Group
        sx={{ height: "100%", justifyContent: "center" }}
        px={10}
        my={10}
        position="apart"
        align="center"
      >
        <Text>
          EmuAccom - Group 5 <span>&copy; {year}</span>
        </Text>

        <Group sx={{ justifyContent: "center" }}>
          <Button
            component="a"
            href="https://github.com/ickynavigator/EmuAccom-FE"
            target="_blank"
            rel="noopener noreferrer"
          >
            Frontend source code
          </Button>
          <Button
            component="a"
            href="https://github.com/ickynavigator/EmuAccom-BE"
            target="_blank"
            rel="noopener noreferrer"
          >
            Backend source code
          </Button>
        </Group>
      </Group>
    </Navbar>
  );
};
export default Footer;
