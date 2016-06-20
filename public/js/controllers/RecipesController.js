(function () {

  angular
    .module('recipesBookApp')
    .controller('RecipesController', RecipesController);

  RecipesController.$inject = ['RecipesService', 'ngNotify'];

  function RecipesController(RecipesService, ngNotify) {
    var vm = this;
    vm.title = 'Recipes';
    vm.previewTitle = 'Preview Recipes';
    vm.model = {};
    vm.fields = [
      {
        key: 'name',
        type: 'input',
        templateOptions: {
          label: 'Recipe name',
          required: true,
          placeholder: 'Appel pie'
        }
      },
      {
        key: 'ingredients',
        type: 'input',
        templateOptions: {
          label: 'ingredients',
          required: true,
          placeholder: '1 cup of suggar'
        }
      },
      {
        key: 'instructions',
        type: 'textarea',
        templateOptions: {
          label: 'Instructions',
          required: true,
          placeholder: 'Lorem ipsum dolor sit amet...'
        }
      },
      {
        key: 'imageUrl',
        type: 'input',
        templateOptions: {
          label: 'Recipe image url',
          required: false,
          placeholder: 'http://some-site-url/appel-pie.png'
        }
      },
    ];

    vm.originalFields = angular.copy(vm.fields);

    vm.submit = function(model) {
      RecipesService.create(model)
      .then(function(data) {
        ngNotify.set('Your Player was successfully saved!', 'success');
        vm.options.resetModel();
      })
      .catch(function(error) {
        ngNotify.set('There was a problem saving your Player... ', 'error');
      });
    }
  }

})();
