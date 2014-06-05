'use strict';

angular.module('wpZestApp')
  .controller('ProjectsProjectCtrl', function ($scope, $routeParams, $sce, cmProjects) {

		$scope.trustAsHtml = function(html) {
			return $sce.trustAsHtml(html);
		};
		
		cmProjects.findByName($routeParams.projectName).then(function(project) {
			$scope.project = project;
		});

  });
