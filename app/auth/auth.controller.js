angular.module('angularfireSlackApp')
  .controller('AuthCtrl', function(Auth, $state) {
    var authCtrl = this;
    //  user object
    authCtrl.user = {
      email: '',
      password: ''
    };

    authCtrl.login = function() {
      Auth.$authWithPassword(authCtrl.user).then(function(auth) {
        // When authentication is successful, we want to send the user to the home state.
        $state.go('home');
      }, function(error) {
        // When authentication fails, we want to set the error on our controller so we can display the error message to our user.
        authCtrl.error = error;
      });
    }

    authCtrl.register = function() {
      Auth.$createUser(authCtrl.user).then(function(user) {
        authCtrl.login();
      }, function(error) {
        authCtrl.error = error;
      })
    }
  })
  // $state service is provided by ui-router to control the state of the application
  // user go() on $state to redirect app to specific state.
  // create a refference to "this" keyword within the controller becaise we are using the "controller as" syntax
  //

//  user object will be used with ng-model directive in form.
// Functions for logining in and Registering are provided by $firebaseAuth
//- $authWithPassword and $createuse
// - both functions take a user object and return a function
// -
//


//include script tag in index.html
// in app.js specify AuthCtrl as our controller for both the login and register states.
// n app/auth/register.html, add ng-submit to the form and specify authCtrl.register() as the submit function.
// Add ng-model="authCtrl.user.email" to the email input.
// Add ng-model="authCtrl.user.password" to the password input.
