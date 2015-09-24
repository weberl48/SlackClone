angular.module('angularfireSlackApp')
  // injecting $state, md5, auth, and profile
  .controller('ProfileCtrl', function($state, md5, auth, profile){
    var profileCtrl = this;
    profileCtrl.profile = profile;
    // getting the current user's email from the auth data that was resolved from our router, hashing it and setting to emailHash on profile.
    profileCtrl.updateProfile = function(){
      profileCtrl.profile.emailHash = md5.createHash(auth.password.email);
      profileCtrl.profile.$save();
    };
  });
