const recipes = require('./handlers/home.js');
const add = require('./handlers/addRecipe.js');
const edit = require('./handlers/editRecipe.js');
const history = require('./handlers/viewHistory.js');

module.exports = function (app) {
  app.get('/api/recipes', recipes.home);
  app.post('/api/recipes', add.addRecipe);
  app.put('/api/edit', edit.editRecipe);
  app.post('/api/history', history.viewHistory);
};