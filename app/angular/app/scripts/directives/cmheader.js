'use strict';

angular.module('wpZestApp')
	.directive('cmHeader', function($route, $rootElement, $timeout, cmTransition, cmMqState, cmUtil) {
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
				
				var elBody   = angular.element(document.querySelectorAll('body'));
				var elToggle = angular.element(element[0].querySelectorAll('.header-wrap'));
				var needsStateClass = false;

				var determineState = function(currentRoute) {

					var initialState = controller.state;

					if(currentRoute.$$route.controller === 'MainCtrl') {
						
						controller.state = 'primary';
						
						element.removeClass(controller.getStateClass('secondary'));
						assignStateClass(); //needs to be called after controller.state has been assigned 
						// $animate.removeClass(element, controller.getStateClass('secondary'));
					} else {

						controller.state = 'secondary';
						
						element.removeClass(controller.getStateClass('primary'));
						needsStateClass = true;
						
						$timeout(function() {
							if(needsStateClass) {
								assignStateClass();
							}
						}, 1500);
						// $animate.addClass(element, controller.getStateClass('secondary'));
					}

					if(controller.isActive()) {
						controller.deactivate();
					}

					if(initialState !== controller.state) {
						scope.$broadcast('headerStateChange', controller.state);
					}
				};

				var activate = function() {
					element.addClass('header--isActive');
					// $animate.addClass(element, 'header--isActive');
				};

				var deactivate = function() {
					element.removeClass('header--isActive');
					// $animate.removeClass(element, 'header--isActive');
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

					if(state === 'secondary') {
						return 'header--isSecondary';
					} else if (state === 'primary') {
						return 'header--isPrimary';
					}
				};

				var assignStateClass = function() {
					element.addClass(controller.getStateClass());
					needsStateClass = false;
				};

				//Controller API
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

				element.on(cmTransition.transitionEvent, function(evt) {

					var elTest      = null;
					

					//only execute if event has been triggered by header itself
					//or if the viewport is narrow the header-wrap
					if(cmMqState.is('narrow')) {
						elTest = elToggle[0];
					} else {
						elTest = element[0];
					}

					if(evt.target !== elTest) {
						return true;
					}

					console.log(evt);
					assignStateClass();
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

