dsApp.controller('displayCtrl', function ($scope, $routeParams, display){
  display.list()
    .success(function(response) {
      $scope.displays = response;
    })
    .error(function() {});

  display.getlistByUserId()
    .success(function(response) {
      $scope.displayByUser = response;
    })
    .error(function() {});

  display.userList()
    .success(function(response) {
      $scope.userList = response;
    })
    .error(function(){});

  display.getById($routeParams.id)
    .success(function(details) {
      $scope.credits = details.credits;
      $scope.displayId = details._id,
      $scope.name = details.name,
      $scope.logo = details.logo,
      $scope.code = details.code,
      $scope.scope = details.scope,
      $scope.layout = details.layout,
      $scope.contact = details.contact,
      $scope.address = details.address,
      $scope.postcode = details.postcode,
      $scope.city = details.city,
      $scope.lat = details.lat,
      $scope.lng = details.lng,
      $scope.info = details.info,
      $scope.opening = details.opening,
      $scope.url = details.url
    })
    .error(function(){});


  $scope.tagDisplay = function(displayId) {
    // $scope.loading = true;
    display.tagDisplay($routeParams.id, displayId)
    .success(function(response) {
      alert(response.data);
      // $scope.loading = false;
    });
  };

  $scope.updateByUser = function() {
    $scope.loading = true;
    display.updateByUser($routeParams.id,{
      name: $scope.name,
      logo: $scope.logo,
      code: $scope.code,
      scope: $scope.scope,
      layout: $scope.layout,
      contact: $scope.contact,
      address: $scope.address,
      postcode: $scope.postcode,
      lat: $scope.lat,
      lng: $scope.lng,
      info: $scope.info,
      opening: $scope.opening,
      city: $scope.city,
      url: $scope.url
    }).then(function(response) {
      $scope.loading = false;
      alert(response.data);
    })
  };

  $scope.update = function() {
    $scope.loading = true;
    display.update($routeParams.id,{
      name: $scope.name,
      logo: $scope.logo,
      code: $scope.code,
      scope: $scope.scope,
      layout: $scope.layout,
      contact: $scope.contact,
      address: $scope.address,
      postcode: $scope.postcode,
      lat: $scope.lat,
      lng: $scope.lng,
      info: $scope.info,
      opening: $scope.opening,
      city: $scope.city,
      url: $scope.url,
      user_id: $scope.userId
    }).then(function(response) {
      $scope.loading = false;
      alert(response.data);
    })
  };

  $scope.add = function(){
    $scope.loading = true;
    display.add({
      name: $scope.name,
      logo: $scope.logo,
      code: $scope.code,
      scope: $scope.scope,
      layout: $scope.layout,
      contact: $scope.contact,
      address: $scope.address,
      postcode: $scope.postcode,
      city: $scope.city,
      lat: $scope.lat,
      lng: $scope.lng,
      info: $scope.info,
      opening: $scope.opening,
      url: $scope.url,
      user_id: $scope.userId
    }).then(function(response){
      $scope.loading = false;
      alert("Add successfully");
    })
  };

  $scope.delete = function(){
    $scope.loading = true;
    display.delete($routeParams.id,{
    }).then(function(response){
      $scope.loading = false;
      alert(response.data);
    })
  };

});
