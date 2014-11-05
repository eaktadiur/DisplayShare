dsApp.controller('UserCtrl', function ($scope, $routeParams, users){

  //Get user's  information.
  users.list()
    .success(function(users) {
      $scope.users = users;
    })
    .error(function() {
      // $alert({
      //   content: 'Unable to get user information',
      //   animation: 'fadeZoomFadeDown',
      //   type: 'material',
      //   duration: 3
      // });
    });

  //Get user's Details information.
  users.getByUserId($routeParams.userId)
    .success(function(userDetail) {
      $scope.userDetail = userDetail;
      $scope.email = userDetail.email;
    })
    .error(function() {
      // $alert({
      //   content: 'Unable to get user information',
      //   animation: 'fadeZoomFadeDown',
      //   type: 'material',
      //   duration: 3
      // });
    });
  $scope.updateProfile = function() {
    $scope.loading = true;
    users.updateProfile($routeParams.userId,{
      email: $scope.email,
      password: $scope.password,
      confirmPassword: $scope.confirmPassword
    }).then(function(response) {
      $scope.loading = false;
      alert(response.data);
      // $alert({
      //   content: 'You have successfully logged in',
      //   animation: 'fadeZoomFadeDown',
      //   type: 'material',
      //   duration: 3
      // });

      // for(var i=0; i<response.data.length; i++){ 
      //   alert(response.data[i].msg);
      // } 
    })
  };

  $scope.deleteUser = function(){
    users.deleteUser($routeParams.userId, {

    }).then(function(response){
      alert(response.data);
    })
  };


});
