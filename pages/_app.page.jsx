import { ColorSchemeProvider, MantineProvider } from "@mantine/core";
import React, { useState } from "react";
import Layout from "../components/Layout";
import MetaHeader from "../components/MetaHeader";
import theme from "../config/mantine.config";
import { StateProvider } from "../context/store";
import "../styles/globals.scss";

function App({ Component, pageProps }) {
  const [colorScheme, setColorScheme] = useState("light");
  const toggleColorScheme = value =>
    setColorScheme(value || (colorScheme === "dark" ? "light" : "dark"));

  return (
    <StateProvider>
      <ColorSchemeProvider
        colorScheme={colorScheme}
        toggleColorScheme={toggleColorScheme}
      >
        <MantineProvider theme={{ ...theme, colorScheme }}>
          <Layout>
            <MetaHeader />
            <Component {...pageProps} />
          </Layout>
        </MantineProvider>
      </ColorSchemeProvider>
    </StateProvider>
  );
}

export default App;
