/**
 * Each section of the site has its own module. It probably also has
 * submodules, though this boilerplate is too simple to demonstrate it. Within
 * `src/app/home`, however, could exist several additional folders representing
 * additional modules that would then be listed as dependencies of this one.
 * For example, a `note` section could have the submodules `note.create`,
 * `note.delete`, `note.edit`, etc.
 *
 * Regardless, so long as dependencies are managed correctly, the build process
 * will automatically take take of the rest.
 *
 * The dependencies block here is also where component dependencies should be
 * specified, as shown below.
 */
angular.module( 'ngBoilerplate.register', [
  'ui.state',
  'plusOne',
  'user'
])

/**
 * Each section or module of the site can also have its own routes. AngularJS
 * will handle ensuring they are all available at run-time, but splitting it
 * this way makes each module more "self-contained".
 */
.config(function config( $stateProvider ) {
  $stateProvider.state( 'register', {
    url: '/register',
    views: {
      "main": {
        controller: 'RegisterCtrl',
        templateUrl: 'register/register.tpl.html'
      }
    },
    data:{ pageTitle: 'Register for StoryMixes' }
  });
})



.factory( 'Register', function($resource) {
  var resource = $resource('http://storymixes.com/api/createuser.php');
  return resource;
})



/**
 * And of course we define a controller for our route.
 */
.controller( 'RegisterCtrl', function RegisterCtrl( $scope, Register, $location ) {
  //var story_id = $stateParams['id'];
  $scope.new_register = new Register();
  
  $scope.send_register = function() {
    $scope.new_register.$save(function(result) {
      $location.path('/login');
    });
  };

})

;

