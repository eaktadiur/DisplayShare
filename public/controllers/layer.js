dsApp.controller('layerCtrl', function ($scope, $routeParams, layer){
  layer.list( $routeParams.id).success(function(list) {
    $scope.layerDetail = list;
  });
  layer.getById($routeParams.id)
    .success(function(layerDetail) {
      if(layerDetail[0]){
        $scope.order = layerDetail[0].order;
        $scope.media = layerDetail[0].media;
        $scope.content = layerDetail[0].content;
        $scope.x = layerDetail[0].x;
        $scope.y = layerDetail[0].y;
        $scope.h = layerDetail[0].h;
        $scope.w = layerDetail[0].w;
        $scope.position = layerDetail[0].position;
        $scope.duration = layerDetail[0].duration;
      }
    })
    .error(function() {
    
    });

  $scope.update = function() {
    $scope.loading = true;
    layer.update($routeParams.id,{
      order: $scope.order,
      media: $scope.media,
      content: $scope.content,
      x: $scope.x,
      y: $scope.y,
      h: $scope.h,
      w: $scope.w,
      position: $scope.position,
      duration: $scope.duration
    }).then(function(response) {
      $scope.loading = false;
    })
  };

  $scope.add = function(){
    $scope.loading = true;
    layer.add($routeParams.id, {
      order: $scope.order,
      media: $scope.media,
      content: $scope.content,
      x: $scope.x,
      y: $scope.y,
      h: $scope.h,
      w: $scope.w,
      position: $scope.position,
      duration: $scope.duration
    }).then(function(response){
      $scope.loading = false;
    })
  };

  $scope.delete = function(){
    layer.delete($routeParams.id, {

    }).then(function(response){
      alert(response.data);
    })
  };

});
