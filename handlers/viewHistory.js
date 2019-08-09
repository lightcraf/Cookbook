const sqlite3 = require('sqlite3').verbose();
const DB_PATH = 'public/db/recipes.db';
const db = new sqlite3.Database(DB_PATH);

exports.viewHistory = function (req, res) {
  const recipeId = req.body.recipeId;

  if (!Number.isInteger(Number(recipeId)) || Math.floor(Number(recipeId)) <= 0) {
    return res.send({ fieldError: 'Something went wrong' });
  }

  db.all("SELECT edited, recipe, description FROM recipe_history WHERE id = ? ORDER BY edited DESC", [recipeId], (err, rows) => {
    if (err) {
      throw err;
    }
    const pageData = rows;
    res.send({ recipes: pageData });
  });
};
