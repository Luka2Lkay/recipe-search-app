import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import SearchField from "./SearchField";
import { vi } from "vitest";

describe("SearchField component", () => {
  it("should render a search field", () => {
    render(<SearchField />);
    expect(screen.getByTestId("input-field")).toBeInTheDocument();
  });

  it("should call handleChange when input value changes", async () => {
    const handleChange = vi.fn();
    render(<SearchField handleChange={handleChange} />);

    const newValue = "Italian";
    const searchField = screen.getByTestId("input-field");

    await userEvent.type(searchField, newValue);

    expect(handleChange).toHaveBeenCalled();
  });

  it("should render search field with placeholder", () => {
    render(<SearchField placeholder="Search for a recipe" />);
    expect(
      screen.getByPlaceholderText("Search for a recipe")
    ).toBeInTheDocument();
  });

  it("should render search field with custom classes", () => {
    render(<SearchField classes="bg-red-500" />);
    expect(screen.getByTestId("input-field")).toHaveClass("bg-red-500");
  });

  it("should render search field with value", () => {
    render(<SearchField value="Italian" />);
    expect(screen.getByDisplayValue("Italian")).toBeInTheDocument();
  });

  it("should render search field with custom classes and value", () => {
    render(<SearchField classes="bg-red-500" value="Italian" />);
    expect(screen.getByDisplayValue("Italian")).toHaveClass("bg-red-500");
  });

  it("should render search field with custom classes and placeholder", () => {
    render(
      <SearchField classes="bg-red-500" placeholder="Search for a recipe" />
    );
    expect(screen.getByPlaceholderText("Search for a recipe")).toHaveClass(
      "bg-red-500"
    );
  });

  it("should render search field with custom classes, placeholder, and value", () => {
    render(
      <SearchField
        classes="bg-red-500"
        placeholder="Search for a recipe"
        value="Italian"
      />
    );
    expect(screen.getByDisplayValue("Italian")).toHaveClass("bg-red-500");
    expect(screen.getByPlaceholderText("Search for a recipe")).toHaveClass(
      "bg-red-500"
    );
  });

  it("should call handleChange with the correct value when input value changes", async () => {
    const handleChange = vi.fn();
    const newValue = "Italian";
    render(<SearchField handleChange={handleChange} value={newValue} />);

    const searchField = screen.getByTestId("input-field");

    await userEvent.type(searchField, newValue);

    expect(handleChange).toHaveBeenCalledWith(
      expect.objectContaining({
        target: expect.objectContaining({ value: newValue }),
      })
    );
  });
});
