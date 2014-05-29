'use strict';

angular.module('wpZestApp')
	.directive('cmHeader', function($route) {
		return {
			scope: {},
			templateUrl: 'views/cmHeader.html',
			replace: true,
			restrict: 'E',
			link: function postLink(scope, element, attrs) {

				var determineState = function(currentRoute) {
					if(currentRoute.$$route.controller === 'MainCtrl') {
						element.removeClass('header--isSecondary');
					} else {
						element.addClass('header--isSecondary');
					}
				};

				determineState($route.current);

				scope.$on('$routeChangeSuccess', function(event, current) {
					determineState(current);
				});
			}
		};
	});

