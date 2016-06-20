(function () {
  angular
    .module('recipesBookApp')
    .controller('RecipesController', RecipesController);

  function RecipesController(RecipesService, ngNotify) {
    // --- view-model ---
    var vm = this;
    // --- exposed methods ---
    vm.submit = submit;

    // --- variables initialization ---
    vm.title = 'Recipes';
    vm.previewTitle = 'Preview Recipe';
    vm.model = {};

    // --- angular-formly fields ---
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

    ngNotify.config({
      duration: 2500,
      theme: 'pastel'
    });

    ///////////////////////////

    /**
     * Submit the form
     */
    function submit() {
      RecipesService.create(vm.model)
        .then(function(data) {
          ngNotify.set('Your Recipe was successfully saved!', 'success');
          vm.options.resetModel();
        })
        .catch(function(error) {
          ngNotify.set('There was a problem saving your Recipe... Please try again', 'error');
        });
    }
  }

})();
