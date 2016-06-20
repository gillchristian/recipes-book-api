(function () {

  angular
  .module('recipesBookApp')
  .controller('LoginController', LoginController);

  LoginController.$inject = ['LoginService', '$state'];

  function LoginController(LoginService, $state) {
    var vm = this;
    vm.title = 'Log In';
    vm.model = {};
    vm.fields = [
      {
        key: 'username',
        type: 'input',
        templateOptions: {
          label: 'User',
          required: true
        }
      },
      {
        key: 'password',
        type: 'input',
        templateOptions: {
          label: 'Password',
          required: true,
          type: 'password',
        }
      },
    ];

    vm.submit = function(model) {
      LoginService.auth(model)
      .then(function(token) {
        localStorage.token = token.data;
        $state.go('recipes');
      });
    }
  }

})();
