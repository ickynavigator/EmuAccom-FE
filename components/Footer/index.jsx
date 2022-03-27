import { Button, Group, Navbar, Text } from "@mantine/core";
import React from "react";
import styles from "../../styles/components/Footer.module.scss";

export const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <Navbar component="footer" height={80} className={styles.footer}>
      <Group sx={{ height: "100%" }} px={10} position="apart">
        <Text>
          EmuAccom - Group 5 <span>&copy; {year}</span>
        </Text>

        <Group>
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
