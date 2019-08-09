const sqlite3 = require('sqlite3').verbose();
const DB_PATH = 'public/db/recipes.db';
const db = new sqlite3.Database(DB_PATH);

exports.editRecipe = function (req, res) {
  const recipeId = req.body.recipeId;
  const recipe = req.body.recipeName;
  const description = req.body.recipeDescription;

  if (recipe.length === 0) {
    return res.send({ fieldError: 'Recipe cannot be blank' });
  } else if (description.length === 0) {
    return res.send({ fieldError: 'Description cannot be blank' });
  } else if (!Number.isInteger(Number(recipeId)) || Math.floor(Number(recipeId)) <= 0) {
    return res.send({ fieldError: 'Something went wrong' });
  }

  function updateRecipe() {
    return new Promise((resolve, reject) => {
      db.run("UPDATE recipes SET recipe = ?, description = ? WHERE id = ?", [recipe, description, recipeId], function (err) {
        if (err) {
          reject(err);
        }
        resolve();
      });
    });
  }

  function getRecipes() {
    return new Promise((resolve, reject) => {
      db.all("SELECT id, created, recipe, description FROM recipes ORDER BY created DESC", [], (err, rows) => {
        if (err) {
          reject(err);
        }
        const pageData = rows;
        res.send({ recipes: pageData });
      });

    });
  }

  function insertRecipeIntoHistory() {
    return new Promise((resolve, reject) => {
      db.run("INSERT INTO recipe_history (id, edited, recipe, description) VALUES (?, DATETIME('now', 'localtime'), ?, ?)", [recipeId, recipe, description], function (err) {
        if (err) {
          reject(err);
        }
        resolve();
      });
    });
  }

  async function editRecipe() {
    try {
      await updateRecipe();
      await insertRecipeIntoHistory();
      await getRecipes();
    } catch (error) {
      console.log(error);
    }
  }

  editRecipe();
};