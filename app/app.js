'use strict';

var date = new Date();

document.getElementById('current-year').innerHTML = date.getFullYear();

// Declare app level module which depends on views, and components (dependencies)
angular.module('myApp', [
  'ngRoute',
  'myApp.profile',
  'myApp.about',
  'myApp.version',
	'countUpModule',
	'chart.js'
]).
config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {
	
  $routeProvider.otherwise({redirectTo: '/profile'});
}]);

