'use strict';

angular.module('wpZestApp')
  .controller('ProjectsProjectCtrl', ['$scope', '$routeParams', '$sce', 'cmProjects', 
  	function ($scope, $routeParams, $sce, cmProjects) {
			$scope.projectName = $routeParams.projectName;
	  }]);
