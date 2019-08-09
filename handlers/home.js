const sqlite3 = require('sqlite3').verbose();
const DB_PATH = 'public/db/recipes.db';
const db = new sqlite3.Database(DB_PATH);

exports.home = function (req, res) {
  db.all("SELECT id, created, recipe, description FROM recipes ORDER BY created DESC", [], (err, rows) => {
    if (err) {
      throw err;
    }
    const pageData = rows;
    res.send({ recipes: pageData });
  });
};