var dsApp = angular.module('dsApp', ['ngRoute']);

dsApp.config(function($routeProvider) {
  $routeProvider.
    when('/', {
      templateUrl: 'views/index.html',
      controller: 'indexCtrl'
    }).
    when('/admin/campaigns', {
      templateUrl: 'views/campaign-list.html',
      controller: 'CampaignListCtrl'
    }).
    when('/admin/campaign/add/new', {
      templateUrl: 'views/campaign-add.html',
      controller: 'CampaignCtrl'
    }).
    when('/admin/campaign/view/:campaignId', {
      templateUrl: 'views/campaign-detail.html',
      controller: 'CampaignDetailCtrl'
    }).
    when('/admin/campaign/edit/:campaignId', {
      templateUrl: 'views/campaign-detail.html',
      controller: 'CampaignDetailCtrl'
    }).
    when('/admin/campaign/delete/:campaignId', {
      templateUrl: 'views/campaign-detail.html',
      controller: 'CampaignDetailCtrl'
    }).
    when('/admin/layer/list/:id', {
      templateUrl: 'views/layer-list.html',
      controller: 'layerCtrl'
    }).
    when('/admin/layer/add/:id', {
      templateUrl: 'views/add-layer.html',
      controller: 'layerCtrl'
    }).
    when('/admin/layer/edit/:id', {
      templateUrl: 'views/layer-detail.html',
      controller: 'layerCtrl'
    }).
    when('/admin/layer/delete/:id', {
      templateUrl: 'views/layer-delete.html',
      controller: 'layerCtrl'
    }).
    when('/admin/display/list', {
      templateUrl: 'views/display-list.html',
      controller: 'displayCtrl'
    }).
    when('/admin/display/add', {
      templateUrl: 'views/display-add.html',
      controller: 'displayCtrl'
    }).
    when('/admin/display/view/:id', {
      templateUrl: 'views/display-view.html',
      controller: 'displayCtrl'
    }).
    when('/admin/display/edit/:id', {
      templateUrl: 'views/display-edit.html',
      controller: 'displayCtrl'
    }).
    when('/admin/display/delete/:id', {
      templateUrl: 'views/display-delete.html',
      controller: 'displayCtrl'
    }).
    when('/admin/credit/add/:id', {
      templateUrl: 'views/credit-add.html',
      controller: 'creditCtrl'
    }).
    when('/admin/credit/edit/:id', {
      templateUrl: 'views/credit-edit.html',
      controller: 'creditCtrl'
    }).
    when('/admin/credit/view/:id', {
      templateUrl: 'views/credit-view.html',
      controller: 'creditCtrl'
    }).
    when('/admin/credit/delet/:id', {
      templateUrl: 'views/credit-delete.html',
      controller: 'creditCtrl'
    }).
    when('/admin/display/add/:id', {
      //camoain display add
      templateUrl: 'views/add-display.html',
      controller: 'displayCtrl'
    }).
    when('/admin/users', {
      templateUrl: 'views/users.html',
      controller: 'UserCtrl'
    }).
    when('/admin/profile/edit', {
      templateUrl: 'views/profile.html',
      controller: 'profileCtrl'
    }).
    when('/admin/user/view/:userId', {
      templateUrl: 'views/user-detail.html',
      controller: 'UserCtrl'
    }).
    when('/admin/user/edit/:userId', {
      templateUrl: 'views/user-detail-edit.html',
      controller: 'UserCtrl'
    }).
    when('/admin/user/delete/:userId', {
      templateUrl: 'views/user-detail-delete.html',
      controller: 'UserCtrl'
    }).
    when('/campaign', {
      templateUrl: 'views/user/campaign-list.html',
      controller: 'CampaignListCtrl'
    }).
    when('/campaign/:campaignId', {
      templateUrl: 'views/user/campaign-edit.html',
      controller: 'CampaignCtrl'
    }).
    when('/campaign/:campaignId/layer/:layerId', {
      templateUrl: 'views/user/layer-edit.html',
      controller: 'CampaignCtrl'
    }).
    when('/display', {
      templateUrl: 'views/user/display-list.html',
      controller: 'displayCtrl'
    }).
    when('/display/:id', {
      templateUrl: 'views/user/display-edit.html',
      controller: 'displayCtrl'
    }).
    when('/support/contact', {
      templateUrl: 'views/contact.html',
      controller: 'contactCtrl'
    });
});