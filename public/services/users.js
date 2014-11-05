dsApp.factory('users', function($http){
  return {
    list: function() {
        return $http.get('/admin/users', {cache: true});
      },
    getByUserId: function(userId, callback) {
        return $http.get('/admin/user/view/' + userId, {cache: true});
      },
    updateProfile: function(userId, data){
      return $http.put('/account/password/' + userId, data).success(function(newData){
      });
    },
    deleteUser : function(userId) {
        return $http.delete('/admin/user/delete/' + userId);
      }

    };
});