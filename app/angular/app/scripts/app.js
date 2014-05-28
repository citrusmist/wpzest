'use strict';

angular.module('wpZestApp', ['ngRoute'])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/projects/:projectName', {
        templateUrl: 'views/projects/project.html',
        controller: 'ProjectsProjectCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
