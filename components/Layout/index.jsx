import { AppShell } from "@mantine/core";
import React, { useState } from "react";
import Header, { NavBar } from "../Header";

export const Layout = ({ children }) => {
  const [opened, setOpened] = useState(false);

  return (
    <AppShell
      // fixed
      navbarOffsetBreakpoint="sm"
      header={<Header opened={opened} setOpened={setOpened} />}
      navbar={<NavBar opened={opened} />}
    >
      {children}
    </AppShell>
  );
};

export default Layout;
