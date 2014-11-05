dsApp.controller('profileCtrl', function ($scope, profile){

  //Get user's profile information.
  profile.getProfile()
      .success(function(profile) {
        $scope.email = profile.email;
        $scope.name = profile.name;
        $scope.location = profile.profile.location;
        $scope.website = profile.profile.website;
      })
      .error(function() {
        // $alert({
        //   content: 'Unable to get user information',
        //   animation: 'fadeZoomFadeDown',
        //   type: 'material',
        //   duration: 3
        // });
      });

  // Update user's profile information.
  $scope.updateProfile = function() {
    profile.updateProfile({
      email: $scope.email,
      name: $scope.name,
      location: $scope.location,
      website: $scope.website
    }).then(function(profile) {
      // $alert({
      //   content: 'Profile has been updated',
      //   animation: 'fadeZoomFadeDown',
      //   type: 'material',
      //   duration: 3
      // });
    })
  };

  //Update Password
  $scope.updatePassword = function(){
    profile.updatePassword({
      password: $scope.password,
      confirmPassword: $scope.confirmPassword
    }).then(function(){
      alert("Password Update successfully");

    })
  };


});