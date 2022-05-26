import { render } from "@testing-library/react";
import React from "react";
import { dormResponse } from "../../utils/testData";
import Index from "./index.page";

describe("Home", () => {
  it("matches the Dorm page Snapshot", () => {
    render(<Index data={dormResponse} />);
  });
});
