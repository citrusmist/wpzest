'use strict';

angular.module('wpZestApp')
	.directive('cmProject', function ($timeout, $sce, $q, cmProjects) {
		return {
			scope: {
				projectName: '@'
			},
			templateUrl: 'views/projects/cmProject.html',
			restrict: 'E',
			controller: function() {

				this.project = $q.defer();

				this.getProject = function() {
					return this.project.promise;
				};
			},
			replace: true,
			link: function postLink(scope, element, attrs, controller) {

				var elTitleDecoration = angular.element(element[0].querySelectorAll('.project-title-wrap'));

				var generateWebsiteLink = function() {
					var markup = '<span class="project-title-decoration caption">' +
						'<a class="project-title-link" href="' + scope.project.website + '">Visit Website</a>' +
						'</span>';

					elTitleDecoration.prepend(markup);
				};

				scope.trustAsHtml = function(html) {
					return $sce.trustAsHtml(html);
				};

				$timeout(function() {
					cmProjects.findByName(scope.projectName).then(function(project) {
						controller.project.resolve(project);
					});
				});

				controller.getProject().then(function(project) {
					scope.project = project;

					if(project.website !== '') {
						generateWebsiteLink();
					}
				});
			}
		};
	})
	.directive('cmProjectCredits', [function(){
		// Runs during compile
		return {
			scope: {},
			// controller: function($scope, $element, $attrs, $transclude) {},
			require: '^cmProject', // Array = multiple requires, ? = optional, ^ = check parent elements
			restrict: 'E', // E = Element, A = Attribute, C = Class, M = Comment
			template: '<dl class="project-credits"></dl>',
			// templateUrl: '',
			replace: true,
			// transclude: true,
			link: function(scope, element, iAttrs, controller) {

				var generateCredits = function() {
					
					var markup = '';

					for (var i = 0; i < scope.project.credits.length; i++) {

						console.log(scope.project.credits[i]);

						markup += '<dt>' + scope.project.credits[i].label + '</dt>';
						markup += '<dd>';

						if(scope.project.credits[i].url === '') {
							markup += scope.project.credits[i].text;
						} else {
							markup += '<a href="' + scope.project.credits.url + '">' + scope.project.credits[i].text + '</a>';
						}

						markup += '</dd>';
					}

					markup += '<dt>Studio Role</dt><dd>' + scope.project.discipline + '</dd>';
					element.append(markup);
				};

				controller.getProject().then(function(project) {
					scope.project = project;
					generateCredits();
				});
			}
		};
	}]);
