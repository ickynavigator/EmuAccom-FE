import { render } from "@testing-library/react";
import React from "react";
import Index from "./index.page";

describe("Home", () => {
  it("matches the homepage Snapshot", () => {
    render(<Index />);
  });
});
