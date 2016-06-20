angular
  .module('recipesBookApp')
  .factory('AuthInterceptor', AuthInterceptor);

function AuthInterceptor($injector, $q) {
  return {
    request: request,
    responseError : responseError
  };
  
  /**
   * Set the Authorization token header on every request
   * 
   * @param {Object}  request config object
   * @returns {Object}  request config object
   */
  function request(config) {
    var token = localStorage.token;
    if (token) {
      config.headers['Authorization'] = token;
    }
    return config;
  }
  
  /**
   * On response error go to login state
   * 
   * @param {Object}  response
   * @returns {Promise}  promise rejection when status != 401
   */
  function responseError(response) {
    if (response.status === 401) {
      localStorage.removeItem('token');
      $injector.invoke(function ($state) {
        $state.go('login');
      });
    }
    return $q.reject(response);
  }
}
