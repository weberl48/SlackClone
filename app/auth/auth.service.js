// factory called Auth
// authentication service
angular.module('angularfireSlackApp')
  .factory('Auth', function($firebaseAuth, FirebaseUrl) {
    var ref = new Firebase(FirebaseUrl);
    var auth = $firebaseAuth(ref)
    return auth
  });


// injecting $firebaseAuth(AngularFire service) and FirebaseUrl(Constant)
// ref: a firebase reference to my firebase

//include script tag in index.html
