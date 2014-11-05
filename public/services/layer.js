dsApp.factory('layer', function($http){
  return {
    list: function(id){
      return $http.get('campaign/view/' + id);
    },
    add: function(id, data){
      return $http.post('/admin/layer/add/' + id, data);
    },
    getById: function(id) {
        return $http.get('/admin/layer/view/' + id);
      },
    update: function(id, data){
      return $http.put('/admin/layer/edit/' + id, data).success(function(newData){
      });
    },
    delete : function(id) {
        return $http.delete('/admin/layer/delete/' + id);
      }

    };
});