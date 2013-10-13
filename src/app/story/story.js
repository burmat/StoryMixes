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
  'user',
  'focus'
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
})


.factory( 'Story', function($resource) {
  var resource = $resource('http://storymixes.com/api/story.php', {
      id: '@id'
    }, {
  } );
  return resource;
})



.factory( 'Page', function($resource) {
  var resource = $resource('http://storymixes.com/api/pages.php', {}, {
    root: {
        method : 'GET'
    },
    children: {
        method : 'GET',
        isArray: true 
    }
  } );
  resource.prototype.teaser = function() {
    return this.text;
  };
  return resource;
})



/**
 * And of course we define a controller for our route.
 */
.controller( 'StoryCtrl', function StoryCtrl( $scope, User, Story, Page, focus ) {
  // $scope.params = $stateParams;
  // console.log($scope.params);
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

  $scope.user = User.get();

  // var children = [
  //   {
  //     id:1,
  //     teaser: 'Follow Little Billy.',
  //     text: "I don't know what you did, Fry, but once again, you screwed up! Now all the planets are gonna start cracking wise about our mamas. It doesn't look so shiny to me. Kids have names? Son, as your lawyer, I declare y'all are in a 12-piece bucket o' trouble. But I done struck you a deal: Five hours of community service cleanin' up that ol' mess you caused. We're rescuing ya. I don't know what you did, Fry, but once again, you screwed up! Now all the planets are gonna start cracking wise about our mamas."
  //   },
  //   {
  //     id:2,
  //     teaser: 'Follow Middle Billy.',
  //     text: "Say what? I barely knew Philip, but as a clergyman I have no problem telling his most intimate friends all about him. But I've never been to the moon! You guys go on without me! I'm going to go… look for more stuff to steal! Why, those are the Grunka-Lunkas! They work here in the Slurm factory. No, I'm Santa Claus!"
  //   },
  //   {
  //     id:3,
  //     teaser: 'Follow Great Big Billy Goat.',
  //     text: "You guys go on without me! I'm going to go… look for more stuff to steal! Yeah, I do that with my stupidness. Son, as your lawyer, I declare y'all are in a 12-piece bucket o' trouble. But I done struck you a deal: Five hours of community service cleanin' up that ol' mess you caused. Oh, I don't have time for this. I have to go and buy a single piece of fruit with a coupon and then return it, making people wait behind me while I complain. All I want is to be a monkey of moderate intelligence who wears a suit… that's why I'm transferring to business school!"
  //   }
  // ];

  // $scope.story = {
  //   author: 'Joe the Plumber',
  //   title: "Joe's Awesome Story"
  // };

  $scope.story = Story.get({id: 1});

  $scope.current_page = Page.root({story_id: 1}, function(root_page) {
    $scope.reload_children();
  });

  $scope.root_page = $scope.current_page;

  $scope.breadcrumb_trail = [
    $scope.current_page
  ];

  $scope.reload_children = function() {
    $scope.current_page_children = [];
    $scope.current_page_children = Page.children({story_id: 1, page_id: $scope.current_page.id});
  };
  
  $scope.push_child = function(child) {
    $scope.breadcrumb_trail.push(child);
    $scope.current_page = child;
    $scope.reload_children();
  };

  $scope.is_editing_mode = false;

  $scope.rewind = function(page) {
    var breadcrumb_trail = $scope.breadcrumb_trail;
    var index = $scope.breadcrumb_trail.indexOf(page);
    if (index === -1) {
      return false;
    }
    $scope.breadcrumb_trail = breadcrumb_trail.slice(0, index + 1);
    $scope.current_page = page;
    $scope.reload_children();
    return true;
  };

  $scope.mix = function(page) {
    // if a page is specified, rewind until we reaach it
    if (page) {
      if (! $scope.rewind(page)) {
        return;
      }
    }
    $scope.is_editing_mode = true;
    var new_page = new Page();
    new_page.id_story = $scope.story.id;
    new_page.id_parent = $scope.current_page.id;
    new_page.author = 1;
    new_page.title = "heyo";
    $scope.new_page = new_page;
    focus('focusMe');
  };

  $scope.mix_finished = function() {
    $scope.new_page.$save(function(new_page) {
      $scope.is_editing_mode = false;
      $scope.push_child(new_page);
    });
  };

  $scope.mix_canceled = function() {
    $scope.is_editing_mode = false;
  }

})

;

