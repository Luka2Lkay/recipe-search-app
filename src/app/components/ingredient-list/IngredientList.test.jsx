import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import IngredientList from "./IngredientList";
import { vi } from "vitest";

describe("IngredientList component", () => {
  it("should display ingredients heading", () => {
    const ingredients = [
      "cherry-tomato",
      "iceberg-lettuce",
      "peri-peri",
      "onion",
    ];
    const handleRemoveIngredient = vi.fn();

    render(
      <IngredientList
        ingredients={ingredients}
        handleRemoveIngredient={handleRemoveIngredient}
      />
    );

    expect(screen.getByTestId("ingredient-heading").textContent).toBe(
      "Ingredients for \"\":"
    );
  }) -
    it("should render the list of ingredients", () => {
      const ingredients = [
        "cherry-tomato",
        "iceberg-lettuce",
        "peri-peri",
        "onion",
      ];
      const handleRemoveIngredient = vi.fn();

      render(
        <IngredientList
          ingredients={ingredients}
          handleRemoveIngredient={handleRemoveIngredient}
        />
      );

      ingredients.forEach((ingredient) => {
        expect(screen.getByText(ingredient)).toBeInTheDocument();
      });
    });

  it("should call handleRemoveIngredient when the remove button is clicked", async () => {
    const ingredients = ["cherry-tomato", "iceberg-lettuce"];
    const handleRemoveIngredient = vi.fn();

    render(
      <IngredientList
        ingredients={ingredients}
        handleRemoveIngredient={handleRemoveIngredient}
      />
    );

    const removeButton = screen.getAllByTestId("remove-ingredient-button")[0];

    expect(handleRemoveIngredient).not.toHaveBeenCalledWith("cherry-tomato");

    await userEvent.click(removeButton);

    expect(handleRemoveIngredient).toHaveBeenCalledWith("cherry-tomato");
  });

  it("should render an empty state message when no ingredients are provided", () => {
    const ingredients = [];
    const handleRemoveIngredient = vi.fn();

    render(
      <IngredientList
        ingredients={ingredients}
        handleRemoveIngredient={handleRemoveIngredient}
      />
    );

    expect(screen.getByTestId("ingredient-list").textContent).toBe("");
  });
});
