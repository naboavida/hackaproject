'use strict';

// Declare app level module which depends on filters, and services
angular.module('myApp', ['myApp.filters', 'myApp.services', 'myApp.directives', 'nvd3ChartDirectives', 'leaflet-directive', 'ui.calendar']).
  config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
    $routeProvider.
      when('/', {
        templateUrl: 'partials/index',
        controller: IndexCtrl
      }).
      when('/projects', {
        templateUrl: 'partials/projects',
        controller: ProjectsCtrl
      }).
      when('/addProject', {
        templateUrl: 'addProject',
        controller: ProjectsCtrl
      }).
      when('/addWidget/:pid/:pointid', {
        templateUrl: 'partials/addPointWidget',
        controller: DashboardPointCtrl
      }).
      when('/addWidget/:pid', {
        templateUrl: 'partials/addWidget',
        controller: DashboardCtrl
      }).
      when('/dashboard/:pid/:pointid', {
        templateUrl: 'partials/dashboardPoint',
        controller: DashboardPointCtrl
      }).
      when('/dashboard/:pid', {
        templateUrl: 'partials/dashboard',
        controller: DashboardCtrl
      }).
      when('/indicator/:pid/:iid', {
        templateUrl: 'partials/indicator',
        controller: IndicatorCtrl
      }).
      when('/parameter/:pid/:iid/:parmid', {
        templateUrl: 'partials/parameter',
        controller: ParameterCtrl
      }).
      when('/parameterHistory/:pid/:iid/:parmid', {
        templateUrl: 'partials/parameterHistory',
        controller: ParameterCtrl
      }).
      when('/addParameter/:pid/:iid', {
        templateUrl: 'partials/addParameter',
        controller: ParameterCtrl
      }).
      when('/calendar/:pid', {
        templateUrl: 'partials/calendar',
        controller: CalendarCtrl
      }).
      when('/addPost', {
        templateUrl: 'partials/addPost',
        controller: AddPostCtrl
      }).
      when('/readPost/:id', {
        templateUrl: 'partials/readPost',
        controller: ReadPostCtrl
      }).
      when('/editPost/:id', {
        templateUrl: 'partials/editPost',
        controller: EditPostCtrl
      }).
      when('/deletePost/:id', {
        templateUrl: 'partials/deletePost',
        controller: DeletePostCtrl
      }).
      otherwise({
        redirectTo: '/'
      });
    $locationProvider.html5Mode(true);
  }]);