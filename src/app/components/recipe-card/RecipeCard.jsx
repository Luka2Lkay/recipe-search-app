import { useState } from "react"
import { v4 as uuidv4 } from "uuid"
import CircularProgress from "@mui/material/CircularProgress"

function RecipeCard({ recipe }) {
    const [isLoading, setIsLoading] = useState(true)

    return (
        <div data-testid="recipe-item" key={uuidv4()} className="mb-1 flex flex-col h-full border-2 border-gray-500 p-2 rounded shadow hover:shadow-lg transition-shadow duration-300">
            {isLoading && <CircularProgress className="mt-4" role="progressbar" />}
            <h3 className="font-bold text-xl leading-tight text-gray-900 truncate">{recipe.title}</h3>
            <img
                src={recipe.image}
                alt={recipe.title}
                className={`w-full h-32 object-cover rounded mb-1 ${isLoading ? "opacity-50" : "opacity-100"}`}
                data-testid="recipe-image"
                onLoad={() => setIsLoading(false)}
                onError={() => setIsLoading(false)}
            />
            {recipe.label}
                {/* <p className="text-sm text-gray-600 border-2 border-gray-500 max-h-16 overflow-y-scroll mt-auto" data-testid="recipe-ingredients">
                    <span className="font-semibold">Ingredients:{" "}</span>
                    {recipe.recipe.ingredients.map((ingredient, index) => (

                        <span key={uuidv4()} className="text-sm">

                            {ingredient.text}
                            {index < recipe.recipe.ingredients.length - 1 && ", "}
                        </span>
                    ))}
                </p> */}
        </div>
    )
}

export default RecipeCard