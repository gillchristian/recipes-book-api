const hooks = require('../utils/hooks-utils');

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RecipeSchmea = new Schema({

  name: {
    type: String,
    unique: true,
    require: true,
  },

  ingredients: [{
    type: String,
    require: true,
  }],

  instructions: {
    type: String,
    require: true,
  },

  image: {
    type: String,
  },

});

RecipeSchmea.pre('save', hooks.idNameHook);

module.exports = mongoose.model('Recipe', RecipeSchmea);
