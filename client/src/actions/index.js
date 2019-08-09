export const recipesHasErrored = bool => ({
  type: 'RECIPES_HAS_ERRORED',
  recipesHasErrored: bool
});

export const recipesIsLoading = bool => ({
  type: 'RECIPES_IS_LOADING',
  recipesIsLoading: bool
});

export const recipesFetchDataSuccess = recipes => ({
  type: 'RECIPES_FETCH_DATA_SUCCESS',
  recipes
});

export const getRecipes = () => ({
  type: 'GET_RECIPES'
});

export const editRecipe = (recipeId, recipeName, recipeDescription) => ({
  type: 'EDIT_RECIPE',
  recipeId, recipeName, recipeDescription
});

export const addRecipe = (recipeName, recipeDescription) => ({
  type: 'ADD_RECIPE',
  recipeName, recipeDescription
});

export const getRecipeHistory = recipeId => ({
  type: 'GET_RECIPE_HISTORY',
  recipeId
});

export const setRecipeNameEdit = recipeName => ({
  type: 'SET_RECIPE_NAME_EDIT',
  recipeName
});

export const setRecipeDescriptionEdit = recipeDescription => ({
  type: 'SET_RECIPE_DESCRIPTION_EDIT',
  recipeDescription
});

export const setRecipeId = recipeId => ({
  type: 'SET_RECIPE_ID',
  recipeId
});

export const recipeHistoryFetchSuccess = recipeHistory => ({
  type: 'RECIPE_HISTORY_FETCH_SUCCESS',
  recipeHistory
});

export const setHistoryVisibility = bool => ({
  type: 'SET_HISTORY_VISIBILITY',
  payload: bool
});

export const setFocus = bool => ({
  type: 'SET_FOCUS',
  payload: bool
});
