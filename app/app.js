'use strict';

/**
 * @ngdoc overview
 * @name angularfireSlackApp
 * @description
 * # angularfireSlackApp
 *
 * Main module of the application.
 */
angular
  .module('angularfireSlackApp', [
    'firebase',
    'angular-md5',
    'ui.router'
  ])
  .config(function($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('home', {
        url: '/',
        templateUrl: 'home/home.html',
        resolve: {
          requireNoAuth: function($state, Auth) {
            return Auth.$requireAuth().then(function(auth) {
              $state.go('channels');
            }, function(error) {
              return;
            });
          }
        }
      })
      .state('login', {
        url: '/login',
        controller: 'AuthCtrl as authCtrl',
        templateUrl: 'auth/login.html',
        resolve: {
          requireNoAuth: function($state, Auth) {
            return Auth.$requireAuth().then(function(auth) {
              $state.go('home');
            }, function(error) {
              return;
            });
          }
        }
      })
      .state('register', {
        url: '/register',
        controller: 'AuthCtrl as authCtrl',
        templateUrl: 'auth/register.html',
        resolve: {
          // $firebaseAuth service provides us with a $requireAuth function which returns a promise.
          requireNoAuth: function($state, Auth) {
            return Auth.$requireAuth().then(function(auth) {
              // promise will get resolved with an auth object if the user is logged in.
              // if the user is not authenticated, the promise gets rejected.
              // requireNoAuth dependency, if the User is logged in we want to send them back to the home state, otherwise, we need to catch the error that gets thrown and handle it gracefully by returning nothing, allowing the promise to be resolved instead of rejected.
              $state.go('home');
            }, function(error) {
              return;
            });
          }
        }
      })
      .state('profile', {
        url: '/profile',
        controller: 'ProfileCtrl as profileCtrl',
        templateUrl: 'users/profile.html',
        resolve: {
          // user is redirected to the home state if they're not authenticated
          auth: function($state, Users, Auth) {
            return Auth.$requireAuth().catch(function() {
              console.log("asfasfasdfsadfFFFFFFFFFF$$$$");
              // .catch function is a shorthand for handling promises if we don't want to provide a success handle
              $state.go('home');
            });
          },

          // ensures authentication,
          profile: function(Users, Auth) {
            return Auth.$requireAuth().then(function(auth) {
              console.log("SFDGSGSDGSDFGSDFGSD");
              // resolves to the user's profile using the getProfile function created in our Users service.
              return Users.getProfile(auth.uid).$loaded();
              // $loaded is a function provided by both $firebaseObject and $firebaseArray that returns a promise that gets resolved when the data from Firebase is available locally.
            });
          }
        }
      })
      // resolving two dependencies here: channels, which is promising our $firebaseArray of channels, and profile
      .state('channels', {
        url: '/channels',
        controller: 'ChannelsCtrl as channelsCtrl',
        templateUrl: 'channels/index.html',
        resolve: {
          channels: function(Channels) {
            return Channels.$loaded();
          },
          // ensuring that the user already a displayName set, otherwise they're taken to the profile state, and if they're not authenticated, they get sent to the home state.
          profile: function($state, Auth, Users) {
            return Auth.$requireAuth().then(function(auth) {
              return Users.getProfile(auth.uid).$loaded().then(function(profile) {
                if (profile.displayName) {
                  return profile;
                } else {
                  $state.go('profile');
                }
              });
            }, function(error) {
              $state.go('home');
            });
          }
        }
      })
      // child state of the channels controller (the dot notation in the state name specifies parentState.childState
      .state('channels.create', {
        url: '/create',
        templateUrl: 'channels/create.html',
        controller: 'ChannelsCtrl as channelsCtrl'
      })
    $urlRouterProvider.otherwise('/');
  })
  .constant('FirebaseUrl', 'https://slack-firebase-clone.firebaseio.com/');
