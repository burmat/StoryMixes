angular.module( 'user', ['ngResource'] )

.factory( 'User', function($resource) {
  var resource = $resource('http://storymixes.com/paul.php');
  return resource;
})


;
