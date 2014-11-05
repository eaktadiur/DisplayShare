dsApp.factory('profile', function($http){
  return {
    getProfile: function() {
        return $http.get('admin/user/profile');
      },
    updateProfile: function(profileData) {
      return $http.put('/account/profile', profileData).success(function(data) {
          // $auth.updateToken(data.token);
        });
    },
    updatePassword: function(data){
      return $http.put('/account/password', data).success(function(newData){
        
      });
    }
  };
});