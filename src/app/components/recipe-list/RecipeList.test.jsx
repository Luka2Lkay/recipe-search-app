import { render, screen } from '@testing-library/react';
import RecipeList from './RecipeList';

describe('RecipeList component', () => {
    const mockRecipes = [
        {
            recipe: {
                label: 'Recipe 1',
                image: 'image1.jpg',
                ingredients: [
                    { text: 'ingredient1' },
                    { text: 'ingredient2' }
                ]
            }
        },
        {
            recipe: {
                label: 'Recipe 2',
                image: 'image2.jpg',
                ingredients: [
                    { text: 'ingredient3' }
                ]
            }
        }
    ];

    beforeEach(() => {
        render(<RecipeList recipeList={mockRecipes} notFound="" />);
    })

    it('should render the RecipeList component', () => {
        expect(screen.getByTestId('recipe-list')).toBeInTheDocument();
    });

    it('should display the correct number of recipes', () => {
        expect(screen.getAllByTestId('recipe-item').length).toBe(2);
    });

    it('should display recipe labels and images', () => {
        mockRecipes.forEach(recipe => {
            expect(screen.getByText(recipe.recipe.label)).toBeInTheDocument();
            expect(screen.getByAltText(recipe.recipe.label)).toHaveAttribute('src', recipe.recipe.image);
        });
    });

    it('should handle empty recipes array', () => {
        const { rerender } = render(
            <RecipeList recipeList={[]} notFound="" />
        );

        rerender(
            <RecipeList recipeList={[]} notFound="No recipes found" />
        );
        expect(screen.getByText('No recipes found')).toBeInTheDocument();
    });
})