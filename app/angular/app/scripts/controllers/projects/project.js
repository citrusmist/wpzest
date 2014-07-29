'use strict';

angular.module('wpZestApp')
  .controller('ProjectsProjectCtrl', function ($scope, $routeParams, $sce, cmProjects) {
		$scope.projectName = $routeParams.projectName;
  });
