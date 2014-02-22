class: center, middle

![Logo](/img/logo.jpeg)

## What do you need to know to get started?

---

# Agenda

1. Why should you care?
1. AngularJS features.
1. Hand-on exercise.

---

class: center, middle
## Why SPA?

# More native-app-like experience

###Gmail, trello, facebook

---

# Challenges

- DOM manipulation
- Events binding
- AJAX / Web Sockets
- History
- Routing
- Caching
- View loading

---

# What is AngularJS

- Client side **framework** baked by Google
- One core library
- Very opinionated - there is typically a "right" way to do it.

## Design goals:
- Decouple DOM manipulation from application logic. This improves the testability of the code.

- Regard application testing as equal in importance to application writing. 

- Decouple the client side of an application from the server side.

- Guide developers through the entire journey of building an application

---

class: center, middle

# Main Features

---

class: center, middle

<h2>
Data binding,
MVC,
Routing,
Testing,
jqLite - mini-me of JQuery,
Templates - partials,
History,
Factories,
Dependeny Injection,
Directives...
</h2>

---

# Two way data binding

User or program modifies model and views update auto-magically to reflect those changes.

Old school way to dynamically update text:
```js
<div id='foo'></div>
$('#foo').text(message)
```

Angular way:
```js
<div id='foo'>{{message}}</div>
```

Updates in the view progpagates to the model
```
<input type='text' ng-model="message" />
```
---
# Directives

It's a way to extend html with new functionalities.

Examples:

- ngClick - http://docs.angularjs.org/api/ng/directive/ngClick
- ngShow - http://docs.angularjs.org/api/ng/directive/ngShow
- ngDblclick - http://docs.angularjs.org/api/ng/directive/ngDblclick
- ngRepeat - http://docs.angularjs.org/api/ng/directive/ngRepeat

```
<div ng-init='foo=false'>
  <a ng-click="foo=true">show</a>

  <div ng-show="foo">
    <p>I'm here</p>
  </div>
</div>
```

---
# How to create a directive

```javascript
 lunchTime.directive('priceTag', function() {
  return {
    restrict: "E",
    scope: { price: "@price" },
    template: "{{dollars()}}",
    replace: true,
    link: function(scope, element, attrs){
      scope.dollars = function(){
        return Array(parseInt(scope.price, 10) + 1).join("$");
      };
    }
  };
});
```

---
# Declarative Behaviour in HTML Views

> Angular is built around the belief that declarative code is better than imperative when it comes to building UIs and wiring software components together... By declaratively describing how the UI should change as your application state changes, you are freed from low level DOM manipulation tasks.

Everything we ever want to create a templates is already in HTML

```html
<div ng-app="Weather" ng-controller="WeatherCtrl">
 <p>{{weather.temperature}}</p>
 <p>{{weather.humidity}}</p>

 <a ng-click="tomorrow()">weather for tomorrw</w>
 <a ng-click="sendByEmail()">Email me</w>
</div>
```

---
# Filters

They help filter or format data for display.

```html
{{value | filter}}
```

### Built-in filters:

json, date, limitTo, lovercase, currency


```
<span class="date">
 {{1288323623006 | date:’medium'}}

 {{1288323623006 | date:'MM/dd/yyyy @ h:mma'}}
</span>

<span class=“name">
  {{ firstname | uppercase }}
</span>
```

---

# Dependency Injection

- provides and wire up objects
- services are not globally available
- when we need something in our object, we can inject it in the constructor. 

Advanatages:

- seperation of concerns
- testing

```javascript
var app = angular.module('MyApp',[]);

app.factory('Weather', function(){
  return {
    get: function(postcode, date){
      ....
    }
  };
});

app.controller('FooCtrl', function($scope, $location, $routeParams, Weather){
  $scope.getWeather = function(){
    $scope.weather = Weather.get($scope.postcode, $scope.day);
  }
  ...
});
```

<span class=hidden>
When the application bootstraps, Angular creates an injector that will be used for all DI stuff in this app. The injector itself doesn't know anything about what $http or $route services do, in fact it doesn't even know about the existence of these services unless it is configured with proper module definitions. The sole responsibilities of the injector are to load specified module definition(s), register all service providers defined in these modules, and when asked, inject a specified function with dependencies (services) that it lazily instantiates via their providers.
</span>
---

# View, Controllers and Scope


![view-scope-controllers](/img/scope.png)


# $scope - viewmodel
---

# How to structure app - MVC

Model - the data
```html
var movies = [
  {name: 'Spirited Away', rank: 1},
  {name: 'Mononoke Hime', rank: 2},
  {name: 'Akira', rank: 3}
];
```

Controller - binds data and behaviour, provides it to the view
```html
app.controller('MoviesCtrl', function($scope) {
  $scope.movies = [...];
  $scope.vote = function(){
  };
});
```

View - complied template
```html
<div ng-controler='MoviesCtrl'>
  <p ng-repeat="movie in movies | orderBy:'rank'">
    <div>{{movie.name}}</div>
    <div>{{movie.rank}}</div>
    <div><a ng-href="" ng-click="vote()">vote</a></div>
  </p>
</div>
```

---

# Modules

Angular app is made of the modules.

The only thing you need to do is to declare the name of the modules.

```javascript
var app = angular.modules('MyAwesomeApp', [])
```

Inside the module we can create:
- controllers
- services
- directives
- filters
- routes


Routes configuration:

```html
var lunchTime = angular.module('lunchTime', [
  'ngRoute'
]);
lunchTime.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/list', {templateUrl: 'partials/list.html', controller: 'PlacesCtrl'});
  $routeProvider.otherwise({redirectTo: '/list'});
}]);
```

Example of modules:

- http://angular-ui.github.io/

---
# Bigger picture

![Bigger picture](/img/big-picture.png)

---

# How this magic works?

```html
<!doctype html>
 <html ng-app>
 <head>
 <script src=”http://code.angularjs.org/angular-1.0.3.min.js”>
</script>
 </head>
 <body>
 <p ng-init=” name=‘World’ “>
Hello {{name}}!</p>
 </body>
 </html>
```

1. Browser loads the HTML and then the angular.js script.
1. Angular waits for **DOMContentLoaded** event and looks for the ng-app directive.
1. The module speciﬁed in ng-app is used to conﬁgure the injector.
1. The injector is used to create the $compile service and $rootScope.
1. $compile compiles the DOM and links it with $rootScope.
1. ng-init assigns World to the name property on the scope.
1. {{name}} is turned into World.

---

# Testing - It's all about NOT mixing concerns

AngularJS was designed with unit testing in mind.
It helps that everything is just pure JavaScript.

Thanks DI we can stub all concerns that we don't want to test.

Example:

```javascript
beforeEach(module('MyApp'));
beforeEach(inject(function(MyService, _$httpBackend_) {
    service = MyService;
    $httpBackend = _$httpBackend_;
}));

it('should invoke service with right paramaeters', function() {
    $httpBackend.expectPOST('/foo/bar', {
        "user": "testUser",
        "action": "testAction",
        "object": {}
    }, function(headers){
        return headers.Authorization === 'Basic YWxhZGRpbjpvcGVuIHNlc2FtZQ==';
    }).respond({});

    service.addStatement('testUser', 'testAction', {});

    $httpBackend.flush();
});
```

## More:
- http://andyshora.com/unit-testing-best-practices-angularjs.html
---

# What else you should know?

### Tools:
- karma - automated test runner (http://karma-runner.github.io/0.10/index.html)
- batarang - chrome plugin

### Documentation
- http://docs.angularjs.org/guide

---

class: center, middle

# Where can we use it?

---

# Hands-on exercise

## lunchtime http://localhost:9292/

#### TODOs:

- Add validation to the form (http://docs.angularjs.org/guide/forms)
- Add new fields: latitude and longitude (JS and server)
- Add google maps support (http://angular-google-maps.org/use)
- Fix place remove link
- Make a new action that will randomly pick a lunch option for you
- Add votes

