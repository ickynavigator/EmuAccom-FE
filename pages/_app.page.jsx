import { MantineProvider } from "@mantine/core";
import React from "react";
import Layout from "../components/Layout";
import MetaHeader from "../components/MetaHeader";
import theme from "../config/mantine.config";
import { StateProvider } from "../context/store";
import "../styles/globals.scss";

function App({ Component, pageProps }) {
  return (
    <StateProvider>
      <MantineProvider theme={theme}>
        <Layout>
          <MetaHeader />
          <Component {...pageProps} />
        </Layout>
      </MantineProvider>
    </StateProvider>
  );
}

export default App;
