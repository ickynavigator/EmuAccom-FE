import { ColorSchemeProvider, MantineProvider } from "@mantine/core";
import { render } from "@testing-library/react";
import React from "react";
import { StateProvider } from "../../../context/store";
import HouseCard from "./index";

describe("DormCard component tests", () => {
  it("matches the Snapshot", () => {
    render(
      <StateProvider>
        <ColorSchemeProvider>
          <MantineProvider>
            <HouseCard />
          </MantineProvider>
        </ColorSchemeProvider>
      </StateProvider>,
    );
  });
});
