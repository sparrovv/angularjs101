'use strict';

/* Controllers */

lunchTime.controller('PlacesCtrl', function($scope, Places) {
  $scope.places = Places.all();

  $scope.remove = function(id){
    Places.rm(id);
  };
});

lunchTime.controller('PlaceCtrl', function($scope, Places, $routeParams) {
  $scope.place = Places.findById($routeParams.id);
  $scope.map = {
    center: {
      latitude: $scope.place.lat,
      longitude: $scope.place.long
    },
    zoom: 8
  };
});

lunchTime.controller('NewCtrl', function($scope, $location, Places) {
  $scope.save = function(){
    Places.add($scope.place);
    $location.path('/');
  };
});
