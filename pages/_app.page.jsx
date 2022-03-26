import { MantineProvider } from "@mantine/core";
import React from "react";
import Layout from "../components/Layout";
import MetaHeader from "../components/MetaHeader";
import theme from "../config/mantine.config";
import "../styles/globals.scss";

function App({ Component, pageProps }) {
  return (
    <MantineProvider theme={theme}>
      <Layout>
        <MetaHeader />
        <Component {...pageProps} />
      </Layout>
    </MantineProvider>
  );
}

export default App;
