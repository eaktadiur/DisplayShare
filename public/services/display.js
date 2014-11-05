dsApp.factory('display', function($http){
  return {
    list: function(){
      return $http.get('/admin/display/list/');
    },
    getlistByUserId: function(){
      return $http.get('/display/getlistByUserId');
    },
    userList: function(){
      return $http.get('/admin/users');
    },
    add: function(data){
      return $http.post('/admin/display/add', data);
    },
    tagDisplay: function(campainId, displayId){
      return $http.post('/admin/display/add/' + campainId + '/' + displayId);
    },
    getById: function(id) {
        return $http.get('/admin/display/view/' + id);
      },
    update: function(id, data){
      return $http.put('/admin/display/edit/' + id, data).success(function(newData){
      });
    },
    updateByUser: function(id, data){
      return $http.put('/display/edit/' + id, data).success(function(newData){
      });
    },
    delete : function(id) {
        return $http.delete('/admin/display/delete/' + id);
      }
    };
});