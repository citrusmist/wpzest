'use strict';

angular.module('wpZestApp')
	.controller('PageCtrl', ['$scope', '$routeParams', '$sce', 'cmPages', function ($scope, $routeParams, $sce, cmPages) {
			
		$scope.page = null;

		$scope.trustAsHtml = function(html) {
			return $sce.trustAsHtml(html);
		};

		cmPages.findByName($routeParams.pageName).then(function(page) {
			$scope.page = page;
		});
	}]);
