import { render, screen, cleanup } from "@testing-library/react";
import SearchPage from "./SearchPage.jsx";
import { Provider } from "react-redux";
import store from "../../state/store.js";
import userEvent from "@testing-library/user-event";
import { expect } from "vitest";

describe("SearchPage component", () => {
  let ingredientInput, addIngredientButton;
  beforeEach(() => {
    render(
      <Provider store={store}>
        <SearchPage />
      </Provider>
    );

    ingredientInput = screen.getByPlaceholderText("Add ingredient");
    addIngredientButton = screen.getByTestId("add-ingredient-button");
  });

  afterEach(() => {
    cleanup();
    store.dispatch({ type: "ingredients/resetIngredientState" });
  });

  it("should render the SearchPage component", () => {
    expect(screen.getByTestId("search-page")).toBeInTheDocument();
  });

  it("should display the title", () => {
    expect(screen.getByTestId("title").textContent).toBe("What's for grub?");
  });

  it("should display the search button text", () => {
    expect(screen.getByTestId("search-button").textContent).toBe("Search");
  });

  it("should display the add icon in the button", () => {
    expect(screen.getByTestId("add-icon")).toBeInTheDocument;
  });

  it("should update the keyword state on input change", async () => {
    const searchInput = screen.getByPlaceholderText(
      "Enter keyword e.g Italian"
    );

    expect(searchInput).toHaveValue("");

    await userEvent.type(searchInput, "Italian");

    expect(searchInput).toHaveValue("Italian");
  });

  it("should update the ingredient state on input change", async () => {

    expect(ingredientInput).toHaveValue("");

    await userEvent.type(ingredientInput, "Chicken");

    expect(ingredientInput).toHaveValue("Chicken");
  });

  it("should add ingredient to the ingredients state", async () => {
    expect(ingredientInput).toHaveValue("");
    expect(store.getState().ingredients.ingredients.length).toBe(0);
    expect(store.getState().ingredients.ingredients).not.toContain("potato");

    await userEvent.type(ingredientInput, "Potato");
    await userEvent.click(addIngredientButton);

    const potatoElements = screen.getAllByText("potato");

    expect(ingredientInput).toHaveValue("");
    expect(potatoElements.length).toBe(1);
    expect(store.getState().ingredients.ingredients.length).toBe(1);
    expect(store.getState().ingredients.ingredients).toContain("potato");
  });

  it("should not add ingredient if it is empty", async () => {
    expect(store.getState().ingredients.ingredients.length).toBe(0);
    expect(store.getState().ingredients.ingredients).not.toContain("");

    await userEvent.click(addIngredientButton);

    expect(store.getState().ingredients.ingredients.length).toBe(0);
    expect(store.getState().ingredients.ingredients).not.toContain("");
  });

  it("should not add ingredient if it already exists", async () => {
    expect(store.getState().ingredients.ingredients.length).toBe(0);

    await userEvent.type(ingredientInput, "Chicken");
    await userEvent.click(addIngredientButton);

    expect(store.getState().ingredients.ingredients.length).toBe(1);

    await userEvent.type(ingredientInput, "Chicken");
    await userEvent.click(addIngredientButton);

    expect(store.getState().ingredients.ingredients.length).toBe(1);
  });

  it("should remove ingredient from the ingredients state", async () => {
    await userEvent.type(ingredientInput, "Chicken");
    await userEvent.click(addIngredientButton);

    expect(store.getState().ingredients.ingredients.length).toBe(1);

    const removeChickenButton = screen.getByTestId("remove-ingredient-button");

    await userEvent.click(removeChickenButton);

    expect(store.getState().ingredients.ingredients.length).toBe(0);
  });

  it("should show an error if the keyword contains numbers", async () => {
    const input = screen.getByPlaceholderText("Enter keyword e.g Italian");
    await userEvent.type(input, "123");
    const error = screen.getByTestId("keyword-error");
    expect(error).toHaveTextContent("Keyword cannot be a number");
  });

  it("should show an error if the keyword contains special characters", async () => {
    const input = screen.getByPlaceholderText("Enter keyword e.g Italian");
    await userEvent.type(input, "!");
    const error = screen.getByTestId("keyword-error");
    expect(error).toHaveTextContent(
      "Keyword can only contain letters, spaces, and hyphens"
    );
  });

  it("should show an error if the ingredient contains numbers", async () => {
    await userEvent.type(ingredientInput, "123");
    const error = screen.getByTestId("ingredient-error");
    expect(error).toHaveTextContent("Ingredient cannot be a number");
  });

  it("should show an error if the ingredient contains special characters", async () => {
    await userEvent.type(ingredientInput, "!");
    const error = screen.getByTestId("ingredient-error");
    expect(error).toHaveTextContent(
      "Ingredient can only contain letters, spaces, and hyphens"
    );
  });

  it("should show an error if the ingredient is empty", async () => {
    await userEvent.click(addIngredientButton);
    const error = screen.getByTestId("ingredient-error");
    expect(error).toHaveTextContent("Ingredient cannot be empty");
  });

  it("should show an error if the ingredient already exists", async () => {
    await userEvent.type(ingredientInput, "Chicken");
    await userEvent.click(addIngredientButton);

    expect(store.getState().ingredients.ingredients.length).toBe(1);
    await userEvent.type(ingredientInput, "Chicken");
    await userEvent.click(addIngredientButton);

    expect(store.getState().ingredients.ingredients.length).toBe(1);

    const error = screen.getByTestId("ingredient-error");
    expect(error).toHaveTextContent("Ingredient already added");
  });
});
