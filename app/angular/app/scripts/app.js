'use strict';

angular.module('wpZestApp', ['ngRoute','ngSanitize'])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/project/:projectName', {
        templateUrl: 'views/projects/project.html',
        controller: 'ProjectsProjectCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
