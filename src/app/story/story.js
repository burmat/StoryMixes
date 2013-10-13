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
    url: '/story/:id',
    views: {
      "main": {
        controller: 'StoryCtrl',
        templateUrl: 'story/story.tpl.html'
      }
    },
    data:{ pageTitle: 'Create Story' }
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


.factory( 'Love', function($resource) {
  var resource = $resource('http://storymixes.com/api/pageloves.php');
  return resource;
})


/**
 * And of course we define a controller for our route.
 */
.controller( 'StoryCtrl', function StoryCtrl( $scope, $rootScope, User, Story, Page, Love, focus, $stateParams, $location ) {

  var story_id = $stateParams['id'];
  if (story_id) {
    $scope.story = Story.get({id: story_id});
    $scope.current_page = Page.root({story_id: story_id}, function(root_page) {
      $scope.reload_children();
    });
    $scope.root_page = $scope.current_page;
    $scope.breadcrumb_trail = [
      $scope.current_page
    ];
    $rootScope.title = $scope.story.title;
  } else {
    $scope.new_story = new Story();
    $scope.new_page = new Page(); 
  }
  
  $scope.finish_create_story = function() {
    $scope.new_story.$save(function(result) {
      $scope.new_page.id_parent = 0;
      $scope.new_page.id_story = result.story_id;
      $scope.new_page.$save(function() {
        $location.path('/story/'+result.story_id);
      });
    });
  };

  $scope.reload_children = function() {
    $scope.current_page_children = [];
    $scope.current_page_children = Page.children({story_id: story_id, page_id: $scope.current_page.id});
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
  

  $scope.mix_cancel = function() {
    $scope.is_editing_mode = false;
  };
  
  $scope.love = function(page, bool){
    var love = new Love();
    love.section_id = page.id;
    love.loved = bool;
    love.$save(function (result){
      page.loved = bool;
    });
  };

})

;

