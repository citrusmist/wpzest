'use strict';

angular.module('wpZestApp')
  .controller('ProjectsProjectCtrl', function ($scope, $routeParams, cmProjects) {
		$scope.projectName = $routeParams.projectName;    
  });
