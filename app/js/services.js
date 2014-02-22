'use strict';

/* Services */

// Demonstrate how to register services
// In this case it is a simple value service.

lunchTime.value('version', '0.1');

lunchTime.factory('UUID', function(){
  return {
    generate: function (){
      var d = new Date().getTime();
      var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = (d + Math.random()*16)%16 | 0;
        d = Math.floor(d/16);
        return (c=='x' ? r : (r&0x7|0x8)).toString(16);
      });
      return uuid;
    }
  };
});

lunchTime.factory('Places', function($http, $q, UUID){
  var _places = [];

  var _getPlaces = function(){
    $http.get('/places').then(function(results){
      angular.copy(results.data, _places);
    });

    return _places;
  };

  var findById = function(id){
    return _.find(_places, function (item) { return item.id === id; });
  };

  return {
    all: _getPlaces,

    add: function(place){
      place.id = UUID.generate();

      $http.post('/place', {place: place}).success(function(a,b,c){ console.log(a);});

      _places.push(place);
    },

    rm: function(id){
      var index = _.indexOf(_places, findById(id));
      return _places.splice(index, 1);
    },

    findById: findById
  };
});
