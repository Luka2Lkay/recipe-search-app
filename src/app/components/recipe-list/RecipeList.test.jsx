import { render, screen } from "@testing-library/react";
import RecipeList from "./RecipeList";

describe("RecipeList component", () => {
  const mockRecipes = [
    {
      title: "Recipe 1",
      image: "image1.jpg",
      usedIngredients: [
        { original: "Ingredient 1" },
        { original: "Ingredient 2" },
      ],
    },
    {
      title: "Recipe 2",
      image: "image2.jpg",
      usedIngredients: [{ original: "Ingredient 3" }],
    },
  ];

  beforeEach(() => {
    render(<RecipeList recipeList={mockRecipes} notFound="" />);
  });

  it("should render the RecipeList component", () => {
    expect(screen.getByTestId("recipe-list")).toBeInTheDocument();
  });

  it("should display 'Recipes Found:' heading when recipes are present", () => {
    expect(screen.getByText("Recipes Found:")).toBeInTheDocument();
  });

  it("should display error message when no recipes found and notFound prop is provided", () => {
    render(<RecipeList recipeList={[]} notFound="No recipes found" />);
    expect(screen.getByText("No recipes found")).toBeInTheDocument();
  });
});
