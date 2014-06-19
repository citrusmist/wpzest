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
						element.removeClass('header--isActive');
						controller.state = 'primary';
					} else {
						element.addClass('header--isSecondary');
						controller.state = 'secondary';
					}
				};

				var activate = function() {
					element.addClass('header--isActive');
				};

				scope.$on('$routeChangeSuccess', function(event, current) {
					determineState(current);
				});

				determineState($route.current);
				controller.activate = activate;
			}
		};
	})
	.directive('cmHeaderToggle', function($route) {
		return {
			scope: {},
			template: '<div>menu</div>',
			replace: true,
			// transclude: true,
			restrict: 'E',
			require: '^cmHeader',
			link: function postLink(scope, element, attrs, controller) {

				element.on('click', function(evt) {
					controller.activate();
				});
				
			}
		};
	});

