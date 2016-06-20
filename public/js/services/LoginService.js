'use strict';
(function(){

angular
  .module('recipesBookApp')
  .factory('LoginService', LoginService);

function LoginService($http) {
  return {
      auth: auth
  };

  /**
   * Post the user data to the authentication endpoint
   *
   * @param {Object}  username & password
   * @returns {Promise}  http post request promise
   */
  function auth(userData) {
    return $http.post('/api/authenticate', userData);
  }
};

})();
