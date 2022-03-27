import { ColorSchemeProvider, MantineProvider } from "@mantine/core";
import { render } from "@testing-library/react";
import React from "react";
import { StateProvider } from "../../context/store";
import Header from "./index";

describe("Header component tests", () => {
  it("matches the Snapshot", () => {
    const { container } = render(
      <StateProvider>
        <ColorSchemeProvider>
          <MantineProvider>
            <Header />
          </MantineProvider>
        </ColorSchemeProvider>
      </StateProvider>,
    );
    expect(container).toMatchSnapshot();
  });
});
