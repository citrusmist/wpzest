'use strict';

angular.module('wpZestApp', ['ngRoute', 'ngSanitize', 'ngAnimate'])
	.config(function ($routeProvider, $locationProvider) {

		$routeProvider
			.when('/', {
				templateUrl: 'views/main.html',
				controller: 'MainCtrl'
			})
			.when('/project/:projectName', {
				templateUrl: 'views/projects/project.html',
				controller: 'ProjectsProjectCtrl'
			})
			.when('/:pageName', {
				templateUrl: 'views/page.html',
				controller: 'PageCtrl'
			})
			.otherwise({
				redirectTo: '/'
			});

		$locationProvider.html5Mode(true).hashPrefix('!');
	});
