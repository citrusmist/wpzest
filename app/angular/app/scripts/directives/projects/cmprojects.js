'use strict';

angular.module('wpZest')
	.directive('cmProjects', function () {

		return {
			template: '<div ng-transclude></div>',
			restrict: 'E',
			transclude: true,
			replace: true,
			link: function postLink(scope, element, attrs) {
				
				var elPreview = angular.element(element[0].querySelectorAll('.projects-preview'));
				var elList    = angular.element(element[0].querySelectorAll('.projects-list'));
				var elTitles  = angular.element(element[0].querySelectorAll('.projects-title'));

				elList.bind('mouseenter', function() {
					element.addClass('projects--isActive');
				});

				elList.bind('mouseleave', function() {
					element.removeClass('projects--isActive');
				});
			}
		};
	});
