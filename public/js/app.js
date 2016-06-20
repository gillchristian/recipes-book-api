angular
  .module('recipesBookApp', [
    'ui.router',
    'formly',
    'formlyBootstrap',
    'ngNotify'
  ])
  .config(function ($httpProvider) {
    $httpProvider.interceptors.push('AuthInterceptor');
  });
