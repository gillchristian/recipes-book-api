angular.module('recipesBookApp')
  .config(function($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/login');
    $stateProvider
      .state('recipes', {
        url: '/recipes',
        templateUrl: '../views/genericTemplate.html',
        controller: 'RecipesController as vm'
      })
      .state('login', {
        url: '/login',
        templateUrl: '../views/login.html',
        controller: 'LoginController as vm'
      });
  });
