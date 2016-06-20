const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RecipeSchmea = new Schema({
  name: {
    type: String,
    unique: true,
    require: true,
  },
  idName: {
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
    this.idName = this.name
      .toLowerCase()
      .replace(/ /g, '-')
      .replace(/\./g, '');
  }
  next();
});

module.exports = mongoose.model('Recipe', RecipeSchmea);
