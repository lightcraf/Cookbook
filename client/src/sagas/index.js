import { put, takeEvery, call, all } from 'redux-saga/effects';
import { recipesFetchDataSuccess, recipesHasErrored, recipeHistoryFetchSuccess } from '../actions';

function* watchGetRecipes() {
  yield takeEvery('GET_RECIPES', fetchRecipes);
}

function* fetchRecipes() {
  try {
    const result = yield call(() => {
      return fetch('/api/recipes')
        .then(res => res.json())
    });
    yield put(recipesFetchDataSuccess(result.recipes));
  } catch (error) {
    yield put(recipesHasErrored(true));
  }
}

function* watchEditRecipe() {
  yield takeEvery('EDIT_RECIPE', fetchEditRecipe);
}

function* fetchEditRecipe({ recipeId, recipeName, recipeDescription }) {
  try {
    const result = yield call(() => {
      return fetch('/api/edit', {
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
    });
    if (result.fieldError) {
      alert(result.fieldError);
      return;
    }
    yield put(recipesFetchDataSuccess(result.recipes));
  } catch (error) {
    yield put(recipesHasErrored(true));
  }
}

function* watchAddRecipe() {
  yield takeEvery('ADD_RECIPE', fetchAddRecipe);
}

function* fetchAddRecipe({ recipeName, recipeDescription }) {
  try {
    const result = yield call(() => {
      return fetch('/api/recipes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          recipeName: recipeName,
          recipeDescription: recipeDescription
        })
      }).then((res) => res.json())
    });
    if (result.fieldError) {
      alert(result.fieldError);
      return;
    }
    yield put(recipesFetchDataSuccess(result.recipes));
  } catch (error) {
    yield put(recipesHasErrored(true));
  }
}

function* watchRecipeHistory() {
  yield takeEvery('GET_RECIPE_HISTORY', fetchRecipeHistory);
}

function* fetchRecipeHistory({ recipeId }) {
  try {
    const result = yield call(() => {
      return fetch('/api/history', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ recipeId: recipeId })
      }).then((res) => res.json())
    });
    if (result.fieldError) {
      alert(result.fieldError);
      return;
    }
    yield put(recipeHistoryFetchSuccess(result.recipes));
  } catch (error) {
    yield put(recipesHasErrored(true));
  }
}

export default function* rootSaga() {
  yield all([
    watchGetRecipes(),
    watchEditRecipe(),
    watchAddRecipe(),
    watchRecipeHistory()
  ]);
}
