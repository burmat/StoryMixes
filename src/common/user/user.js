angular.module( 'user', ['ngResource'] )

.factory( 'User', function($resource) {
  var resource = $resource('http://burmat-it.com/story/paul.php');
  return resource;
})


;
