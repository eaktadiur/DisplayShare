dsApp.controller('creditCtrl', function ($scope, $routeParams, credit){

  $scope.update = function() {
    $scope.loading = true;
    credit.update($routeParams.id,{
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
      url: $scope.url
    }).then(function(response) {
      $scope.loading = false;
      alert(response.data);
    })
  };

  $scope.add = function(){
    $scope.loading = true;
    credit.add($routeParams.id, {
      start_date: $scope.start_date,
      end_date: $scope.end_date,
      credits: $scope.credits
    }).then(function(response){
      $scope.loading = false;
      alert("Add successfully");
    })
  };

  $scope.delete = function(){
    $scope.loading = true;
    credit.delete($routeParams.id,{
    }).then(function(response){
      $scope.loading = false;
      alert(response.data);
    })
  };

});
