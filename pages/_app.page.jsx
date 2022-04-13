import { ColorSchemeProvider, MantineProvider } from "@mantine/core";
import { useColorScheme } from "@mantine/hooks";
import React, { useState } from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import Layout from "../components/Layout";
import MetaHeader from "../components/MetaHeader";
import theme from "../config/mantine.config";
import { StateProvider } from "../context/store";
import "../styles/globals.scss";

function App({ Component, pageProps }) {
  const preferredColorScheme = useColorScheme();
  const [colorScheme, setColorScheme] = useState(preferredColorScheme);
  const toggleColorScheme = value =>
    setColorScheme(value || (colorScheme === "dark" ? "light" : "dark"));

  return (
    <StateProvider>
      <ColorSchemeProvider
        colorScheme={colorScheme}
        toggleColorScheme={toggleColorScheme}
      >
        <MantineProvider
          theme={{ ...theme, colorScheme }}
          withGlobalStyles
          withNormalizeCSS
        >
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
