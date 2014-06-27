'use strict';

angular.module('wpZestApp')
	.directive('cmHeader', function($route, $rootElement) {
		return {
			scope: {},
			templateUrl: 'views/cmHeader.html',
			replace: true,
			restrict: 'E',
			controller: function($scope, $element, $attrs) {
				this.state         = null;
				this.activate      = function() {};
				this.deactivate    = function() {};
				this.isActive      = function() {};
				this.toggleState   = function() {};
				this.getStateClass = function() {};
			},
			link: function postLink(scope, element, attrs, controller) {

				var determineState = function(currentRoute) {

					var initialState = controller.state;

					if(currentRoute.$$route.controller === 'MainCtrl') {
						element.removeClass(controller.getStateClass('secondary'));
						controller.state = 'primary';
					} else {
						element.addClass(controller.getStateClass('secondary'));
						controller.state = 'secondary';
					}

					if(controller.isActive()) {
						controller.deactivate();
					}

					if(initialState !== controller.state) {
						console.log('broadcasting');
						scope.$broadcast('headerStateChange', controller.state);
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

				var getStateClass = function(state) {
					
					state = state || controller.state;

					if(state == 'secondary') {
						return 'header--isSecondary';
					} else {
						return '';
					}
				};

				controller.activate      = activate;
				controller.deactivate    = deactivate;
				controller.isActive      = isActive;
				controller.toggleState   = toggleState;
				controller.getStateClass = getStateClass;

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

