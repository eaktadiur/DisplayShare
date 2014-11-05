dsApp.controller('CampaignCtrl', function ($scope, $routeParams, $filter, campaigns, layer){
  layer.getById($routeParams.layerId)
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
    }).error(function() {});


  campaigns.getlistByUserId()
    .success(function(response) {
      $scope.displayByUser = response;
    })
    .error(function() {});

  campaigns.detail($routeParams.campaignId)
    .success(function(detail) {
      $scope.campaignId = detail._id;
      $scope.layers = detail.layer;
      $scope.campaignDetail = detail;
      $scope.name = detail.name;
      $scope.duration = detail.duration;
      $scope.start_date = $filter('date')(detail.start_date,'yyyy-MM-dd');
      $scope.end_date = $filter('date')(detail.end_date,'yyyy-MM-dd');
    }).error(function() {});

  $scope.userUpdate = function(){
    $scope.loading = true;
    campaigns.userUpdate($routeParams.campaignId, {
      name: $scope.name,
      duration: $scope.duration,
      start_date: $scope.start_date,
      end_date: $scope.end_date,
      draft: true
    }).then(function(response){
      alert(response.data);
      $scope.loading = false;
    })
  };

  $scope.add = function(){
    $scope.loading = true;
    campaigns.add({
      name: $scope.name,
      duration: $scope.duration,
      start_date: $scope.start_date,
      end_date: $scope.end_date,
      draft: $scope.draft
    }).then(function(response){
      alert(response.data);
      $scope.loading = false;
    })
  };

});

dsApp.controller('CampaignListCtrl', function ($scope, $routeParams, campaigns){
  campaigns.list()
    .success(function(campaigns) {
      $scope.campaigns = campaigns;
    })
    .error(function() {
    
    });

});

dsApp.controller('CampaignDetailCtrl', function ($scope, $routeParams, campaigns){
  campaigns.detail($routeParams.campaignId)
    .success(function(detail) {
      $scope.campaignDetail = detail;

      //Campaign Display Detail
      campaigns.displayByCampainId(detail)
        .success(function(detail) {
          $scope.campaignSubDetail = detail;
        })
        .error(function() {
        
        });


      campaigns.detail($routeParams.campaignId)
        .success(function(detail) {
          $scope.campaignDetail = detail;
        })
        .error(function() {
        
        });
    }).error(function() {
    
    });

});

//displayByCampainId


