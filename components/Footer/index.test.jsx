import { render } from "@testing-library/react";
import React from "react";
import Footer from "./index";

describe("Footer component tests", () => {
  it("matches the Snapshot", () => {
    const { container } = render(<Footer />);
    expect(container).toMatchSnapshot();
  });
});
