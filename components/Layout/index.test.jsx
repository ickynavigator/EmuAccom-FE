import { ColorSchemeProvider, MantineProvider } from "@mantine/core";
import { render } from "@testing-library/react";
import React from "react";
import { StateProvider } from "../../context/store";
import Layout from "./index";

describe("Layout component tests", () => {
  it("matches the Snapshot", () => {
    render(
      <StateProvider>
        <ColorSchemeProvider>
          <MantineProvider>
            <Layout>
              <div>test child</div>
            </Layout>
          </MantineProvider>
        </ColorSchemeProvider>
      </StateProvider>,
    );
  });
});
