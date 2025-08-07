import { CiCircleRemove } from "react-icons/ci";
import { v4 as uuidv4 } from "uuid";
import Button from "../button/Button";

export default function IngredientList({
  ingredients,
  handleRemoveIngredient,
  handleClearIngredients,
  keyword
}) {
  return (
    <div className="border-2">
      <h2
        className="text-lg font-semibold mb-2"
        data-testid="ingredient-heading"
      >
        Ingredients for "{keyword}":
      </h2>
      <ul className="space-y-2" data-testid="ingredient-list">
        {ingredients.map((ingredient) => (
          <li key={uuidv4()} className="inline-flex items-center p-2">
            <Button classes="text-base cursor-text px-1 py-1">
              <span className="flex gap-2">
                {ingredient}
                <CiCircleRemove
                  onClick={() => handleRemoveIngredient(ingredient)}
                  className="text-2xl text-red-500 cursor-pointer"
                  style={{ strokeWidth: "0.5", stroke: "currentColor" }}
                  data-testid="remove-ingredient-button"
                />
              </span>
            </Button>
          </li>
        ))}
      </ul>
      {ingredients.length > 1 && (
        <Button classes="bg-red-500 hover:bg-red-700 py-1 px-1 flex justify-center cursor-text" data-testid="clear-all-button">
          <span className="flex gap-2">
            Clear All
            <CiCircleRemove
              onClick={() => handleClearIngredients()}
              className="text-2xl text-white cursor-pointer"
              style={{ strokeWidth: "0.5", stroke: "currentColor" }}
              data-testid="remove-ingredient-button"
            />
          </span>
        </Button>
      )}
    </div >
  );
}
