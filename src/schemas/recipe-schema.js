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

RecipeSchmea.pre('save', function idNameHook(next) {
  if (!this.idName) {
    this.idName = JSON.parse(JSON.stringify(this.name.toLowerCase()));
    this.idName = this.idName.replace(/ /g, '-');
    this.idName = this.idName.replace(/\./g, '');
  }
  next();
});

module.exports = mongoose.model('Recipe', RecipeSchmea);
