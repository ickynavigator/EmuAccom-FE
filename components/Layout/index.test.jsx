import { render } from "@testing-library/react";
import React from "react";
import Layout from "./index";

describe("Layout component tests", () => {
  it("matches the Snapshot", () => {
    const { container } = render(
      <Layout>
        <div>test child</div>
      </Layout>,
    );
    expect(container).toMatchSnapshot();
  });
});
