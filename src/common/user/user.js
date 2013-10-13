angular.module( 'user', ['ngResource'] )


.factory( 'User', function($resource) {
    var resource = $resource('http://storymixes.com/paul.php');
    return resource;
})


.factory( 'authenticationService', function($q, $resource, User) {

    var service_with_initial_user = function(initial_user) {
        var current_user = initial_user;
        return {
            sign_in: function(login) {
                login.$save(function(result) {
                    User.get({}, function(user) {
                        current_user = user;
                        $location.path('/home');
                    });
                });
            },
            // check password on server, get user data, unique token, etc.
            sign_out: function() {
                // clear current_user data, unset logged in status, etc.
                var Resource = $resource('http://storymixes.com/logout.php');
                var logout = new Resource();
                logout.$save(function() {
                    current_user = {};
                });
            },
            is_signed_in: function() {
                console.log('is_signed_in');
                // logic to check if current user has signed in
                if (current_user) {
                    console.log(true);
                    return true;
                } else {
                    console.log(false);
                    return false;
                }
            },
            current_user: function() {
                // return the current_user object, or handle if the user is not signed in
                return current_user;
            }
        };
    };

    var deferred = $q.defer();

    User.get({}, function(user) {
        var service = service_with_initial_user(user);
        deferred.resolve(service);
    }, function() {
        var service = service_with_initial_user({});
        deferred.resolve(service);
    });

    return deferred.promise;
})


.controller( 'RootCtrl', function RootCtrl( $scope, authenticationService, User ) {
    $scope.authenticationService = authenticationService;

})


;
