'use strict';

/* Directives */

lunchTime.directive('appVersion', function(version) {
  return function(scope, elm, attrs) {
    elm.text(version);
  };
});

lunchTime.directive('priceTag', function() {
  return {
    restrict: "E",
    scope: { price: "@price" },
    template: "<span>{{dollars()}}</span>",
    replace: true,
    link: function(scope, element, attrs){
      scope.dollars = function(){
        return Array(parseInt(scope.price, 10) + 1).join("$");
      };
    }
  };
});
