import { combineReducers } from 'redux';

const recipesHasErrored = (state = false, action) => {
  switch (action.type) {
    case 'RECIPES_HAS_ERRORED':
      return action.recipesHasErrored;
    default:
      return state;
  }
};

const recipesIsLoading = (state = false, action) => {
  switch (action.type) {
    case 'RECIPES_IS_LOADING':
      return action.recipesIsLoading;
    default:
      return state;
  }
};

const recipes = (state = [], action) => {
  switch (action.type) {
    case 'RECIPES_FETCH_DATA_SUCCESS':
      return action.recipes;
    default:
      return state;
  }
};

const setRecipeNameEdit = (state = '', action) => {
  switch (action.type) {
    case 'SET_RECIPE_NAME_EDIT':
      return action.recipeName;
    default:
      return state;
  }
};

const setRecipeDescriptionEdit = (state = '', action) => {
  switch (action.type) {
    case 'SET_RECIPE_DESCRIPTION_EDIT':
      return action.recipeDescription;
    default:
      return state;
  }
};

const setRecipeId = (state = '', action) => {
  switch (action.type) {
    case 'SET_RECIPE_ID':
      return action.recipeId;
    default:
      return state;
  }
};

const recipeHistory = (state = [], action) => {
  switch (action.type) {
    case 'RECIPE_HISTORY_FETCH_SUCCESS':
      return action.recipeHistory;
    default:
      return state;
  }
};

const setHistoryVisibility = (state = false, action) => {
  switch (action.type) {
    case 'SET_HISTORY_VISIBILITY':
      return action.payload;
    default:
      return state;
  }
};

const setFocus = (state = false, action) => {
  switch (action.type) {
    case 'SET_FOCUS':
      return action.payload;
    default:
      return state;
  }
};

export default combineReducers({
  recipes,
  recipesHasErrored,
  recipesIsLoading,
  setRecipeNameEdit,
  setRecipeDescriptionEdit,
  setRecipeId,
  recipeHistory,
  setHistoryVisibility,
  setFocus
});
