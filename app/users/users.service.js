// purpose of this factory is to provide us with the ability to get either a specific user's data, or to get a list of all of our users.

angular.module('angularfireSlackApp')
.factory('Users', function($firebaseArray, $firebaseObject, FirebaseUrl){
var usersRef = new Firebase(FirebaseUrl+'users');  // Data in Firebase is stored in a tree structure and child nodes can be referenced by adding a path to our FirebaseUrl
  var users = $firebaseArray(usersRef)
  // $firebaseArray will return pseudo array, meaning it will act a lot like an array in javascript, however, methods like splice(), push(), pop() will only affect data locally and not on the Firebase.
  // $firebaseArray provides methods named $add and $remove to provide similar functionality
  var Users = {
    // getProfile(uid) allows us to get a $firebaseObject of a specific user's profile
  getProfile: function(uid){
    return $firebaseObject(usersRef.child(uid));
  },
  // a helper function that returns a user's displayName when given a uid
  getDisplayName: function(uid){
    return users.$getRecord(uid).displayName;
    },
  // return the url to a user's gravatar image when provided a uid.
  getGravatar: function(uid){
  return '//www.gravatar.com/avatar/' + users.$getRecord(uid).emailHash;
},
  // all returns a $firebaseArray of all the users.
  all: users
};

  return Users;
})
