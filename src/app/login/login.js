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
angular.module( 'ngBoilerplate.story', [
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
  $stateProvider.state( 'login', {
    url: '/login',
    views: {
      "main": {
        controller: 'LoginCtrl',
        templateUrl: 'login/login.tpl.html'
      }
    },
    data:{ pageTitle: 'Login to StoryMixes' }
  });
})

.factory( 'Login', function($resource) {
  var resource = $resource('http://storymixes.com/api/login.php');
  return resource;
})


/**
 * And of course we define a controller for our route.
 */
.controller( 'LoginCtrl', function LoginCtrl( $scope, Login, $location ) {
  //var story_id = $stateParams['id'];
  $scope.login = new Login();
  $scope.login = function() {
    $scope.login.$save(function(result) {
      //$location.path('/story/'+result.story_id);
    });
  };

})

;

