import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import React from "react";
import Button from "./Button";

describe("renders button", () => {
  it("should have same text", () => {
    let { getByText } = render(<Button>Button</Button>);
    expect(getByText("Button")).toBeInTheDocument();
  });

  it("should be focusable", () => {
    let { container } = render(<Button>Button</Button>);
    const buttonElement = container.querySelector("button");
    buttonElement.focus();
    expect(buttonElement).toHaveFocus();
  });
});
