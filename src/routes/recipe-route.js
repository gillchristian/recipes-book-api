const Router = require('express').Router;
const recipeRouter = new Router();
const recipe = require('../controllers/recipe-controller');

recipeRouter.route('/')
  .get(recipe.find.bind(recipe))
  .post(recipe.create.bind(recipe))
  .put(recipe.update.bind(recipe))
  .delete(recipe.remove.bind(recipe));

recipeRouter.route('/:id')
  .get(recipe.findByIdOrNameId.bind(recipe))
  .put(recipe.update.bind(recipe))
  .delete(recipe.remove.bind(recipe));

module.exports = recipeRouter;
