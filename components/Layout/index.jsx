import { AppShell } from "@mantine/core";
import React from "react";
import Header from "../Header";

// eslint-disable-next-line arrow-body-style
export const Layout = ({ children }) => {
  return (
    <AppShell
      // fixed
      navbarOffsetBreakpoint="sm"
      header={<Header />}
    >
      {children}
    </AppShell>
  );
};

export default Layout;
