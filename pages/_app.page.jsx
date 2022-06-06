import { ColorSchemeProvider, MantineProvider } from "@mantine/core";
import { useLocalStorage } from "@mantine/hooks";
import { NotificationsProvider } from "@mantine/notifications";
import React from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import Layout from "../components/Layout";
import MetaHeader from "../components/MetaHeader";
import theme from "../config/mantine.config";
import { StateProvider } from "../context/store";
import "../styles/globals.scss";

function App({ Component, pageProps }) {
  const [colorScheme, setColorScheme] = useLocalStorage({
    key: "mantine-color-scheme",
    defaultValue: "light",
    getInitialValueInEffect: true,
  });

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
          <NotificationsProvider>
            <Layout>
              <MetaHeader />
              <Component {...pageProps} />
            </Layout>
          </NotificationsProvider>
        </MantineProvider>
      </ColorSchemeProvider>
    </StateProvider>
  );
}

export default App;
