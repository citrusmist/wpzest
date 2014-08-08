'use strict';

angular.module('wpZestApp')
	.directive('cmHeader', function($route, $rootElement, $rootScope, $timeout, cmTransition, cmMqState, cmUtil) {
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
				
				var elBody          = angular.element(document.querySelectorAll('body'));
				var elToggle        = angular.element(element[0].querySelectorAll('.header-wrap'));
				var needsStateClass = false;
				var prevScrollY     = window.scrollY;
				

				var handleRouteChange = function(currentRoute) {

					var initialState  = controller.state;

					determineState(currentRoute);

					if( initialState !== controller.state ) {
						changeState(initialState);
					}

					if(controller.state === 'secondary') {
						controller.deactivate();
					}
				};

				var determineState = function(currentRoute) {

					if(currentRoute.$$route.controller === 'MainCtrl') {
						controller.state = 'primary';
						// $animate.removeClass(element, controller.getStateClass('secondary'));
					} else {
						controller.state = 'secondary';
						// $animate.addClass(element, controller.getStateClass('secondary'));
					}
				};

				var changeState = function(oldState) {

					var callbackDelay = (controller.state === 'primary') ? 0 : 1500;

					needsStateClass = true;

					element.removeClass(controller.getStateClass(oldState));

					$timeout(function() {
						if(needsStateClass) {
							assignStateClass();
						}
					}, callbackDelay);
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
					element.removeClass('header--isHidden'); //just in case
					needsStateClass = false;

					scope.$broadcast('headerStateChange', controller.state);
				};

				var showHide = function() {

					//console.log('showHide');

					if(!cmMqState.is('narrow') ||
						controller.state !== 'secondary' ||
						controller.isActive()) {
						return;
					}

					if(window.scrollY > prevScrollY) {
						element.addClass('header--isHidden');
					} else if (prevScrollY > window.scrollY) {
						element.removeClass('header--isHidden');
					}

					prevScrollY = window.scrollY;
				};

				//Controller API
				controller.activate      = activate;
				controller.deactivate    = deactivate;
				controller.showHide      = showHide;
				controller.isActive      = isActive;
				controller.toggleState   = toggleState;
				controller.getStateClass = getStateClass;

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

					//console.log(evt);
					assignStateClass();
				});

				// angular.element(window).on('scroll', cmUtil.throttle(controller.showHide, 200));
				angular.element(window).on('touchmove', cmUtil.throttle(controller.showHide, 200));

				scope.$on('$routeChangeSuccess', function(event, current) {
					handleRouteChange(current);
				});

				$rootScope.$on('$viewContentLoaded', function() {
					window.scrollTo(0,0);
					prevScrollY = 0;
				});

				handleRouteChange($route.current);
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

