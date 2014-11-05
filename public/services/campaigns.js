dsApp.factory('campaigns', function($http){
  return {
    list: function(){
      return $http.get('campaigns');
    },
    add: function(data){
      return $http.post('/admin/campaign/add/new', data);
    },
    userUpdate: function(id, data){
      return $http.put('/campaign/edit/' + id, data);
    },
    getlistByUserId: function(){
      return $http.get('/display/getlistByUserId');
    },
    detail: function(id){
      return $http.get('campaign/view/' + id);
    },
    displayByCampainId: function(campainId){
      return $http.get('/admin/display/view/' + campainId);
    }
  };
});

