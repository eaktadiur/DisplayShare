dsApp.factory('credit', function($http){
  return {
    list: function(){
      return $http.get('/admin/credit/list/');
    },
    add: function(id, data){
      return $http.post('/admin/credit/add/' + id, data);
    },
    getById: function(id) {
        return $http.get('/admin/credit/view/' + id);
      },
    update: function(id, data){
      return $http.put('/admin/credit/edit/' + id, data).success(function(newData){
      });
    },
    delete : function(id) {
        return $http.delete('/admin/credit/delete/' + id);
      }

    };
});