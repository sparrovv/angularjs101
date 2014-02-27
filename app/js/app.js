'use strict';

// Declare app level module
var lunchTime = angular.module('lunchTime', [
  'ngRoute',
  'google-maps'
]);

lunchTime.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/list', {templateUrl: 'partials/list.html', controller: 'PlacesCtrl'});
  $routeProvider.when('/add', {templateUrl: 'partials/add_place.html', controller: 'NewCtrl'});
  $routeProvider.when('/place/:id', {templateUrl: 'partials/place.html', controller: 'PlaceCtrl'});
  $routeProvider.otherwise({redirectTo: '/list'});
}]);
