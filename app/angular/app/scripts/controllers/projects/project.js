'use strict';

angular.module('wpZestApp')
  .controller('ProjectsProjectCtrl', function ($scope, $routeParams, cmProjects) {
		
		cmProjects.findByName($routeParams.projectName).then(function(project) {
			$scope.project = project;
		});
  });
