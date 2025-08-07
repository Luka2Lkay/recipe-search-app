import RecipeCard from "../recipe-card/RecipeCard"

function RecipeList({ recipeList, notFound }) {
    return (
        <div data-testid="recipe-list" className="p-4">
            {notFound && recipeList.length === 0 && (
                <p className="text-red-500 text-lg">{notFound}</p>
            )}
            {recipeList && recipeList.length > 0 && (
                <div> <h2 className="text-xl font-bold mb-2">Recipes Found:</h2>
                    <div className="mt-4 grid grid-cols-5 gap-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 sm:grid-cols-2">

                        {recipeList.length > 0 && recipeList.map((recipe) => (
<div key={recipe.recipe.uri}>
 <RecipeCard key={recipe.recipe.uri} recipe={recipe} />
</div>
                           

                        ))}
                    </div>
                </div>
            )}
        </div>
    )
}

export default RecipeList