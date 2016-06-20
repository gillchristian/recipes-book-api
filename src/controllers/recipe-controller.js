const Controller = require('../libraries/controller');
const RecipeModel = require('../models/recipe-model');

module.exports = new Controller(RecipeModel);
