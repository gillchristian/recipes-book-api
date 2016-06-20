angular
  .module('recipesBookApp')
  .factory('RecipesService', RecipesService); 

function RecipesService($http) {
  return {
    get: get,
    create: create,
    delete: deleteRecipe
  };
  
  /**
   * Get recipes
   * 
   * @returns {Promise}  http get request promise
   */
  function get() {
    return $http.get('/api/recipes');
  }
  
  /**
   * Create a recipe
   * 
   * @returns {Object}  recipe data
   * @returns {Promise}  http get request promise
   */
  function create(recipeData) {
    recipeData.ingredients = recipeData.ingredients.split(',');
    recipeData.ingredients = recipeData.ingredients
      .map(function (item) {
        if (item[0] === ' ') {
          return item.slice(1);
        }
        return item;
      });
    return $http.post('/api/recipes', recipeData);
  }

  /**
   * Delete a recipe
   * 
   * @returns {Number}  recipe id
   * @returns {Promise}  http delete request promise
   */
  function deleteRecipe(id) {
    return $http.delete('/api/recipes/' + id);
  }
}
