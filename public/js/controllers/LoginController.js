(function () {
  angular
    .module('recipesBookApp')
    .controller('LoginController', LoginController);

  function LoginController(LoginService, ngNotify, $state) {
    // --- view-model ---
    var vm = this;
    // --- exposed methods ---
    vm.submit = submit;

    // --- variables initialization ---
    vm.title = 'Log In';
    vm.model = {};

    // --- angular-formly fields ---
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

    ngNotify.config({
      duration: 2500,
      theme: 'pastel'
    });

    ////////////////////////////

    /**
     * Submit the form
     */
    function submit() {
      LoginService.auth(vm.model)
        .then(function(token) {
          localStorage.token = token.data;
          ngNotify.set('Wellcome back ' + vm.model.username + '!', {
            type: 'success',
            duration: 2500
          });
          $state.go('recipes');
        })
        .catch(function(err) {
          ngNotify.set('Wrong username or password!', 'error');
        });
    }
  }

})();
