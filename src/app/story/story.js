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
  'plusOne'
])

/**
 * Each section or module of the site can also have its own routes. AngularJS
 * will handle ensuring they are all available at run-time, but splitting it
 * this way makes each module more "self-contained".
 */
.config(function config( $stateProvider ) {
  $stateProvider.state( 'story', {
    url: '/story',
    views: {
      "main": {
        controller: 'StoryCtrl',
        templateUrl: 'story/story.tpl.html'
      }
    },
    data:{ pageTitle: 'This here. My Story' }
  });
  $stateProvider.state( 'story.detail', {
    url: '/story/:id',
    views: {
      "main": {
        controller: 'StoryCtrl',
        templateUrl: 'story/story.tpl.html'
      }
    },
    data:{ pageTitle: 'This here. My Story' }
  });
})

/**
 * And of course we define a controller for our route.
 */
.controller( 'StoryCtrl', function StoryCtrl( $scope, $stateParams ) {
  $scope.params = $stateParams;
  console.log($scope.params);
  var children = [
    {
      id:1,
      teaser: 'Follow Little Billy.',
      text: "I don't know what you did, Fry, but once again, you screwed up! Now all the planets are gonna start cracking wise about our mamas. It doesn't look so shiny to me. Kids have names? Son, as your lawyer, I declare y'all are in a 12-piece bucket o' trouble. But I done struck you a deal: Five hours of community service cleanin' up that ol' mess you caused. We're rescuing ya. I don't know what you did, Fry, but once again, you screwed up! Now all the planets are gonna start cracking wise about our mamas."
    },
    {
      id:2,
      teaser: 'Follow Middle Billy.',
      text: "Say what? I barely knew Philip, but as a clergyman I have no problem telling his most intimate friends all about him. But I've never been to the moon! You guys go on without me! I'm going to go… look for more stuff to steal! Why, those are the Grunka-Lunkas! They work here in the Slurm factory. No, I'm Santa Claus!"
    },
    {
      id:3,
      teaser: 'Follow Great Big Billy Goat.',
      text: "You guys go on without me! I'm going to go… look for more stuff to steal! Yeah, I do that with my stupidness. Son, as your lawyer, I declare y'all are in a 12-piece bucket o' trouble. But I done struck you a deal: Five hours of community service cleanin' up that ol' mess you caused. Oh, I don't have time for this. I have to go and buy a single piece of fruit with a coupon and then return it, making people wait behind me while I complain. All I want is to be a monkey of moderate intelligence who wears a suit… that's why I'm transferring to business school!"
    }
  ];

  $scope.story = {
    author: 'Joe the Plumber',
    title: "Joe's Awesome Story"
  };

  $scope.root_page = {
      text: 'Once upon a time there were three billy goats. Gruff.',
      children: children
  };

  $scope.current_page = $scope.root_page;

  $scope.breadcrumb_trail = [
    $scope.root_page
  ];
  $scope.goto_child = function(child){
    //Go to the child page.
    console.log(child);
  };
  
  $scope.add_to = function(child){
    
  };

})

;

