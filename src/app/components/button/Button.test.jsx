import { render, screen } from "@testing-library/react";
import Button from "./Button";
import { vi } from "vitest";

describe("Button component", () => {
  it("should render button with text", () => {
    render(<Button>Click Me</Button>);
    expect(screen.getByText("Click Me")).toBeInTheDocument();
  });

  it("should call onButtonClick when button is clicked", () => {
    const onButtonClick = vi.fn();
    render(<Button onButtonClick={onButtonClick}>Click Me</Button>);
    screen.getByText("Click Me").click();
    expect(onButtonClick).toHaveBeenCalled();
  });

  it("should render button with custom classes", () => {
    render(<Button classes="bg-red-500">Click Me</Button>);
    expect(screen.getByText("Click Me")).toHaveClass("bg-red-500");
  });
});
