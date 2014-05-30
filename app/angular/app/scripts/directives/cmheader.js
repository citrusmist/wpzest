'use strict';

angular.module('wpZestApp')
	.directive('cmHeader', function($route) {
		return {
			scope: {},
			templateUrl: 'views/cmHeader.html',
			replace: true,
			restrict: 'E',
			controller: function($scope, $element, $attrs) {
				this.state    = 'primary';
				this.activate = function() {};
			},
			link: function postLink(scope, element, attrs, controller) {

				var determineState = function(currentRoute) {
					if(currentRoute.$$route.controller === 'MainCtrl') {
						element.removeClass('header--isSecondary');
						controller.state = 'primary';
					} else {
						element.addClass('header--isSecondary');
						controller.state = 'secondary';
					}
				};

				determineState($route.current);

				scope.$on('$routeChangeSuccess', function(event, current) {
					determineState(current);
				});
			}
		};
	})
	.directive('cmHeaderToggle', function($route) {
		return {
			scope: {},
			template: '<div ng-transclude></div>',
			replace: true,
			transclude: true,
			restrict: 'E',
			require: '^cmHeader',
			link: function postLink(scope, element, attrs, controller) {

				element.on('click', function(evt) {
					controller.activate();
				});
				
			}
		};
	});

