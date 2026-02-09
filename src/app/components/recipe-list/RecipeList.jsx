import RecipeCard from "../recipe-card/RecipeCard";

function RecipeList({ recipeList, notFound }) {
  // Support both shapes: either a flat array of recipes, or the thunk-style
  // payload where recipes are at recipeList[0]. Normalize to `recipes`.
  const recipes = Array.isArray(recipeList) &&
    recipeList.length > 0 &&
    Array.isArray(recipeList[0])
    ? recipeList[0]
    : Array.isArray(recipeList)
    ? recipeList
    : [];

  return (
    <div data-testid="recipe-list" className="p-4">
      {notFound && recipes.length === 0 && (
        <p className="text-red-500 text-lg">{notFound}</p>
      )}

      {recipes.length > 0 && (
        <div>
          <h2 className="text-xl font-bold mb-2">Recipes Found:</h2>
          <div className="mt-4 grid grid-cols-1 gap-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 sm:grid-cols-2">
            {recipes.map((recipe) => (
              <div key={recipe.id || recipe.title}>
                <RecipeCard recipe={recipe} />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default RecipeList;
