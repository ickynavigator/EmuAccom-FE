import { render } from "@testing-library/react";
import React from "react";
import Header from "./index";

describe("Header component tests", () => {
  it("matches the Snapshot", () => {
    const { container } = render(<Header />);
    expect(container).toMatchSnapshot();
  });
});
