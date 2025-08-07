import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import RecipeCard from './RecipeCard';

describe('RecipeCard component', () => {
    let recipe;

    beforeEach(() => {
        recipe = {
            recipe: {
                uri: 'test-uri',
                image: 'test-image.jpg',
                label: 'Test Recipe',
                ingredients: [
                    { text: 'Ingredient 1' },
                    { text: 'Ingredient 2' },
                ],
            },
        };
    })


    it('should render the recipe card with image, label, and ingredients', () => {

        render(<RecipeCard recipe={recipe} />);

        expect(screen.getByTestId('recipe-item')).toBeInTheDocument();
        expect(screen.getByTestId('recipe-image')).toHaveAttribute('src', 'test-image.jpg');
        expect(screen.getByText('Test Recipe')).toBeInTheDocument();
        expect(screen.getByTestId('recipe-ingredients')).toHaveTextContent('Ingredient 1, Ingredient 2');
    });

    it('should show loading state when image is loading', () => {
        render(<RecipeCard recipe={recipe} />);

        expect(screen.getByTestId('recipe-image')).toHaveClass('opacity-50');
        expect(screen.getByRole('progressbar')).toBeInTheDocument();
    });
})