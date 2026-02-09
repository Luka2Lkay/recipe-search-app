import { render, screen } from "@testing-library/react";
import RecipeList from "./RecipeList";

describe("RecipeList component", () => {
  const mockRecipes = [
    {
      title: "Recipe 1",
      image: "image1.jpg",
      ingredients: [{ text: "ingredient1" }, { text: "ingredient2" }],
    },
    {
      title: "Recipe 2",
      image: "image2.jpg",
      ingredients: [{ text: "ingredient3" }],
    },
  ];

  beforeEach(() => {
    render(<RecipeList recipeList={mockRecipes} notFound="" />);
  });

  it("should render the RecipeList component", () => {
    expect(screen.getByTestId("recipe-list")).toBeInTheDocument();
  });

  it("should display recipe titles and images", () => {
    mockRecipes.forEach((recipe) => {
      expect(screen.getByText(recipe.title)).toBeInTheDocument();
      expect(screen.getByAltText(recipe.title)).toHaveAttribute(
        "src",
        recipe.image,
      );
    });
  });

  it("should handle empty recipes array", () => {
    const { rerender } = render(<RecipeList recipeList={[]} notFound="" />);

    rerender(<RecipeList recipeList={[]} notFound="No recipes found" />);
    expect(screen.getByText("No recipes found")).toBeInTheDocument();
  });
});
