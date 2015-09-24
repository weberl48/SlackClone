angular.module('angularfireSlackApp')
  .controller('ChannelsCtrl', function($state, Auth, Users, profile, channels) {
    var channelsCtrl = this;
    channelsCtrl.profile = profile;
    channelsCtrl.channels = channels;
    channelsCtrl.getDisplayName = Users.getDisplayName; // functions on the Users service.
    channelsCtrl.getGravatar = Users.getGravatar; // functions on the Users service.
    channelsCtrl.logout = function(){
    Auth.$unauth();
    $state.go('home');
  };
  channelsCtrl.newChannel = {
  name: ''
};
channelsCtrl.createChannel = function(){
  // $add function on the channels $firebaseArray provides similar functionality to the .push()
  channelsCtrl.channels.$add(channelsCtrl.newChannel).then(function(){
    // Once the new channel is created we'll need to clear out the newChannel object.
    channelsCtrl.newChannel = {
      name: ''
    };
  });
};
  });
