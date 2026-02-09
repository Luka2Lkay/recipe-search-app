import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import CircularProgress from "@mui/material/CircularProgress";
import Button from "../button/Button";

function RecipeCard({ recipe }) {
  const [isLoading, setIsLoading] = useState(true);

  const moreInfoUrl = `https://spoonacular.com/recipes/${recipe.title.replace(/\s+/g, "-").toLowerCase()}-${recipe.id}`;  

  return (
    <div
      data-testid="recipe-item"
      key={uuidv4()}
      className="mb-1 flex flex-col h-full border-2 border-gray-500 p-2 rounded shadow hover:shadow-lg transition-shadow duration-300"
    >
      {isLoading && <CircularProgress className="mt-4" role="progressbar" />}
      <h3 data-testid="recipe-title" className="font-bold text-xl leading-tight text-gray-900 truncate">
        {recipe.title}
      </h3>
      <img
        src={recipe.image}
        alt={recipe.title}
        className={`w-full h-32 object-cover rounded mb-1 ${isLoading ? "opacity-50" : "opacity-100"}`}
        data-testid="recipe-image"
        onLoad={() => setIsLoading(false)}
        onError={() => setIsLoading(false)}
      />
      {recipe.title}

<div className="border-t-2 border-gray-500 max-w-full min-h-16 leading-relaxed break-words ellipse mt-auto">
      <p
        className="text-sm text-gray-600"
        data-testid="recipe-ingredients"
      >
        <span className="font-semibold">Ingredients: </span>
            <br/>
        {recipe.usedIngredients.map((ingredient) => (
          <span key={uuidv4()} className="text-sm text-left">
            {`${ingredient.original} `}
          </span>
        ))}
      </p>
      </div>
     <div className="flex justify-center mt-2">
       <Button
        classes="mt-2 max-w-16 p-2 text-sm"
        onButtonClick={() => window.open(moreInfoUrl, "_blank")}>More</Button>
    </div>
     </div>
  );
}

export default RecipeCard;
