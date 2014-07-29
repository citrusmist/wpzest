'use strict';

angular.module('wpZestApp')
  .directive('cmProject', function ($timeout, $sce, cmProjects) {
    return {
    	scope: {
    		projectName: '@'
    	},
      templateUrl: 'views/projects/cmProject.html',
      restrict: 'E',
      replace: true,
      link: function postLink(scope, element, attrs) {

        scope.trustAsHtml = function(html) {
					return $sce.trustAsHtml(html);
				};

				var retrieveProject = function() {
					cmProjects.findByName(scope.projectName).then(function(project) {
						scope.project = project;
					});
				};

				$timeout(function() {
					retrieveProject();
				});
      }
    };
  });
