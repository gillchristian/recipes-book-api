angular.module('recipesBookApp').factory('RecipesService', function($http) {

    return {
        get : function() {
            return $http.get('/api/recipes');
        },

        create : function(playerData) {
            return $http.post('/api/recipes', playerData);
        },

        delete : function(id) {
            return $http.delete('/api/recipes/' + id);
        }
    }

});
