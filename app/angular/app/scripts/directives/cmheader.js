'use strict';

angular.module('wpZestApp')
	.directive('cmHeader', function($route, $rootElement) {
		return {
			scope: {},
			templateUrl: 'views/cmHeader.html',
			replace: true,
			restrict: 'E',
			controller: function($scope, $element, $attrs) {
				this.state        = 'primary';
				this.activate     = function() {};
				this.deactivate   = function() {};
				this.isActive     = function() {};
				this.toggleState  = function() {};
			},
			link: function postLink(scope, element, attrs, controller) {

				var determineState = function(currentRoute) {

					var initialState = controller.state;
					var data = '';

					if(currentRoute.$$route.controller === 'MainCtrl') {

						element.removeClass('header--isSecondary');
						element.removeClass('header--isActive');

						controller.state = 'primary';
						data             = '';
					} else {

						element.addClass('header--isSecondary');

						controller.state = 'secondary';
						data             = '.header--isSecondary';

						if(controller.isActive()) {
							controller.deactivate();
						}
					}

					if(initialState !== controller.state) {

						scope.$broadcast('headerStateChange', data);
					}
				};

				var activate = function() {
					element.addClass('header--isActive');
				};

				var deactivate = function() {
					element.removeClass('header--isActive');
				};

				var isActive = function() {
					return element.hasClass('header--isActive');
				};

				var toggleState = function() {
					if( controller.isActive() ) {
						controller.deactivate();
					} else {
						controller.activate();
					}
				};

				controller.activate    = activate;
				controller.deactivate  = deactivate;
				controller.isActive    = isActive;
				controller.toggleState = toggleState;

				scope.$on('$routeChangeSuccess', function(event, current) {
					determineState(current);
				});

				$rootElement.on('click', function(evt) {

					if(!controller.isActive()) {
						return;
					}

					if(angular.element.contains(element[0], evt.target)) {
						return;
					}

					controller.deactivate();
				});

				determineState($route.current);
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

				element.on('click', function() {
					controller.toggleState();
				});
				
			}
		};
	});

