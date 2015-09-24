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
          templateUrl: 'home/home.html'
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
    });

    $urlRouterProvider.otherwise('/');
  })
.constant('FirebaseUrl', 'https://slack-firebase-clone.firebaseio.com/');
