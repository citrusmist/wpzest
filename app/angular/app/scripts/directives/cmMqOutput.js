'use strict';

angular.module('wpZestApp')
	.directive('cmMqOutput', ['$timeout', 'cmUtil', 'cmMqState', function ($timeout, cmUtil, cmMqState) {
			return {
				template: '<div class="mq-output" id="mqOutput"></div>',
				restrict: 'E',
				replace: true,
				link: function postLink(scope, element, attrs) {
	
					var retrieveState = function() {
	
						var pseudo = false;
	
						if (!window.getComputedStyle) { 
							return;
						}
	
						pseudo = window.getComputedStyle(element[0], ':after').getPropertyValue('content');
	
						if (pseudo) {
							pseudo = pseudo.replace('\'', '').replace('"', '');;
							cmMqState.set(pseudo);
						}
					}
					
					$timeout(function(){
						retrieveState()
					});
	
					angular.element(window).on('resize', cmUtil.debounce(retrieveState, 100));
				}
			};
		}]);
