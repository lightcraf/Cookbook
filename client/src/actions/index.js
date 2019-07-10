export const recipesHasErrored = bool => ({
  type: 'RECIPES_HAS_ERRORED',
  recipesHasErrored: bool
});

export const recipesIsLoading = bool => ({
  type: 'RECIPES_IS_LOADING',
  recipesIsLoading: bool
});

export const recipesFetchDataSuccess = recipes => {
  return {
    type: 'RECIPES_FETCH_DATA_SUCCESS',
    recipes
  };
}

export const recipesFetchData = url => {
  return (dispatch) => {
    dispatch(recipesIsLoading(true));

    fetch(url)
      .then((res) => {
        if (!res.ok) {
          throw Error(res.statusText);
        }
        dispatch(recipesIsLoading(false));
        return res;
      })
      .then((res) => res.json())
      .then((result) => dispatch(recipesFetchDataSuccess(result.recipes)))
      .catch(() => dispatch(recipesHasErrored(true)));
  };
}

export const setRecipeNameEdit = recipeName => ({
  type: 'SET_RECIPE_NAME_EDIT',
  payload: recipeName
});

export const setRecipeDescriptionEdit = recipeDescription => ({
  type: 'SET_RECIPE_DESCRIPTION_EDIT',
  payload: recipeDescription
});

export const setRecipeId = recipeId => ({
  type: 'SET_RECIPE_ID',
  payload: recipeId
});

export const addRecipe = (url, recipeName, recipeDescription) => {
  return (dispatch) => {
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        recipeName: recipeName,
        recipeDescription: recipeDescription
      })
    }).then((res) => res.json())
      .then((result) => {
        if (result.fieldError) {
          alert(result.fieldError);
          return;
        }
        dispatch(recipesFetchDataSuccess(result.recipes))
      })
      .catch(() => dispatch(recipesHasErrored(true)))
  };
}

export const editRecipe = (url, recipeId, recipeName, recipeDescription) => {
  return (dispatch) => {
    fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        recipeId: recipeId,
        recipeName: recipeName,
        recipeDescription: recipeDescription
      })
    }).then((res) => res.json())
      .then((result) => {
        if (result.fieldError) {
          alert(result.fieldError);
          return;
        }
        dispatch(recipesFetchDataSuccess(result.recipes))
      })
      .catch(() => dispatch(recipesHasErrored(true)))
  };
}

export const recipeHistoryFetchSuccess = recipeHistory => {
  return {
    type: 'RECIPE_HISTORY_FETCH_SUCCESS',
    recipeHistory
  };
}

export const fetchRecipeHistory = (url, recipeId) => {
  return (dispatch) => {
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ recipeId: recipeId })
    }).then((res) => res.json())
      .then((result) => {
        if (result.fieldError) {
          alert(result.fieldError);
          return;
        }
        dispatch(recipeHistoryFetchSuccess(result.recipes))
      })
      .catch(() => dispatch(recipesHasErrored(true)))
  };
}

export const setHistoryVisibility = bool => ({
  type: 'SET_HISTORY_VISIBILITY',
  payload: bool
});

export const setFocus = bool => ({
  type: 'SET_FOCUS',
  payload: bool
});
