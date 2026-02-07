import SearchField from "../search-field/SearchField";
import handleValidation from "./handleTextInputValidation";
import IngredientList from "../ingredient-list/IngredientList";
import RecipeList from "../recipe-list/RecipeList.jsx";
import Pagination from "../pagination/Pagination.jsx";
import Modal from "../modal/Modal.jsx";
import { IoIosAddCircleOutline } from "react-icons/io";
import Button from "../button/Button";
import logo from "/recipe.png";
import { useDispatch, useSelector } from "react-redux";
import {
  setKeyWord,
  showKeywordError,
} from "../../state/slices/search/search_slice";
import {
  setNewIngredient,
  addIngredient,
  removeIngredient,
  showIngredientError,
  resetIngredientState,
} from "../../state/slices/ingredients/ingredients_slice";
import { fetchRecipesByKeyword } from "../../state/thunks/recipe_thunks.js";
import {
  clearRecipes,
  setOffset,
} from "../../state/slices/recipes/recipes_slice.js";
import CircularProgress from "@mui/material/CircularProgress";
import { useState } from "react";

export default function SearchPage() {
  const keyword = useSelector((state) => state.search.keyword);
  const keywordError = useSelector((state) => state.search.keywordError);
  const newIngredient = useSelector((state) => state.ingredients.ingredient);
  const ingredients = useSelector((state) => state.ingredients.ingredients);
  const ingredientError = useSelector(
    (state) => state.ingredients.ingredientError,
  );
  const recipeList = useSelector((state) => state.recipes.recipes);
  const totalResults = useSelector((state) => state.recipes.totalResults);
  const offset = useSelector((state) => state.recipes.offset);
  const isLoading = useSelector((state) => state.recipes.isLoading);
  const recipeError = useSelector((state) => state.recipes.recipeError);

  const [isOpen, setIsOpen] = useState(false);

  const dispatch = useDispatch();

  const ITEMS_PER_PAGE = 10;


  const {
    handleChange: handleKeywordChange,
    handleButtonClick: validateKeyword,
  } = handleValidation(
    (error) => dispatch(showKeywordError(error)),
    (value) => dispatch(setKeyWord(value)),
  );

  const {
    handleChange: handleIngredientChange,
    handleButtonClick: validateIngredient,
  } = handleValidation(
    (error) => dispatch(showIngredientError(error)),
    (value) => dispatch(setNewIngredient(value)),
  );

  const ingredient = newIngredient.trim().toLowerCase();
  const handleAddIngredient = () => {
    const isValidated = validateIngredient(ingredient, "Ingredient");

    if (ingredients.includes(ingredient)) {
      dispatch(showIngredientError("Ingredient already added"));
      return;
    }

    if (isValidated) {
      dispatch(showIngredientError(isValidated));
      dispatch(addIngredient(ingredient));
      dispatch(setNewIngredient(""));
      dispatch(showIngredientError(""));
    }
  };

  const handleRemoveIngredient = (ingredientToRemove) =>
    dispatch(removeIngredient(ingredientToRemove));

  const handleClearIngredients = () => setIsOpen(true);

  const handleNextPage = () => {
    if (offset + ITEMS_PER_PAGE < totalResults) {
      dispatch(setOffset(offset + ITEMS_PER_PAGE));
      console.log("Next page offset:", offset + ITEMS_PER_PAGE);
    }
  };
  const handlePreviousPage = () => {
    if (offset - ITEMS_PER_PAGE >= 0) {
      dispatch(setOffset(offset - ITEMS_PER_PAGE));
      console.log("Previous page offset:", offset - ITEMS_PER_PAGE);
    }
  };

  const handleSearch = async () => {
    const isValidated = validateKeyword(keyword, "Keyword");

    if (isValidated) {
      dispatch(showKeywordError(isValidated));
      dispatch(setNewIngredient(""));
      dispatch(showIngredientError(""));
    }

    if (ingredients.length === 0) {
      dispatch(showIngredientError("Add at least one ingredient"));
      return;
    }

    if (
      !keywordError &&
      !ingredientError &&
      keyword &&
      ingredients.length > 0
    ) {
      dispatch(clearRecipes());
      await dispatch(fetchRecipesByKeyword({ keyword, ingredients, page: 1 }));
      dispatch(showKeywordError(""));
      dispatch(showIngredientError(""));
      dispatch(setNewIngredient(""));
    }
  };

  return (
    <>
      <div
        data-testid="search-page"
        className="bg-gray-300 h-full p-4 max-w-md mx-auto"
      >
        <div className="flex items-center justify-center rounded">
          <img src={logo} className="mb-2 w-12" />
          <h1
            className="text-sm md:text-2xl font-bold mb-4"
            data-testid="title"
          >
            What's for grub?
          </h1>
        </div>

        <SearchField
          handleChange={(e) => handleKeywordChange(e.target.value, "Keyword")}
          value={keyword}
          placeholder={"Enter keyword e.g Italian"}
          classes="w-full  mb-2"
        />

        {keywordError && (
          <p className="text-red-500 text-sm mb-2" data-testid="keyword-error">
            {keywordError}
          </p>
        )}

        <div className="flex items-center mb-4">
          <SearchField
            handleChange={(e) =>
              handleIngredientChange(e.target.value, "Ingredient")
            }
            value={newIngredient}
            placeholder="Add ingredient"
            classes="w-3/4  mr-2"
          />
          <Button
            onButtonClick={handleAddIngredient}
            classes="w-1/4 p-2 justify-center"
            testId="add-ingredient-button"
          >
            <IoIosAddCircleOutline
              className="text-2xl"
              data-testid="add-icon"
            />
          </Button>
        </div>
        {ingredientError && (
          <p
            className="text-red-500 text-sm mb-2"
            data-testid="ingredient-error"
          >
            {ingredientError}
          </p>
        )}

        {ingredients.length > 0 && (
          <IngredientList
            ingredients={ingredients}
            handleRemoveIngredient={handleRemoveIngredient}
            keyword={keyword}
            handleClearIngredients={handleClearIngredients}
          />
        )}

        <Button
          onButtonClick={handleSearch}
          classes="w-1/2 p-2 mt-4 bg-blue-500 rounded flex justify-center"
          testId="search-button"
        >
          Search
        </Button>
      </div>

      {isLoading ? (
        <CircularProgress className="mt-6" />
      ) : (
        <div className="mt-4 border-t pt-4 border-gray-300">
          <RecipeList recipeList={recipeList} notFound={recipeError} />
          {recipeList.length > 0 && (
            <Pagination
              offset={offset}
              totalResults={totalResults}
              itemsPerPage={ITEMS_PER_PAGE}
              handleNextPage={handleNextPage}
              handlePreviousPage={handlePreviousPage}
            />
          )}
        </div>
      )}

      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <div className="p-4 border border-gray-500 bg-white absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded shadow-lg w-96">
          <h2 className="text-lg font-semibold mb-2">Clear Ingredients</h2>
          <p className="mb-4">
            Are you sure you want to clear all ingredients?
          </p>
          <div className="flex gap-2 justify-center">
            <Button
              onButtonClick={() => {
                dispatch(resetIngredientState());
                setIsOpen(false);
              }}
              classes="bg-red-500 text-white px-4 py-2 rounded"
            >
              Yes, Clear
            </Button>
            <Button
              onButtonClick={() => setIsOpen(false)}
              classes="bg-gray-300 px-4 py-2 rounded"
            >
              Cancel
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
}
