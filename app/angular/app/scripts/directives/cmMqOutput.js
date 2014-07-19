'use strict';

angular.module('wpZestApp')
	.directive('cmMqOutput', function ($timeout, cmUtil, cmMqState) {
		return {
			template: '<div class="mq-output" id="mqOutput"></div>',
			restrict: 'E',
			replace: true,
			link: function postLink(scope, element, attrs) {

				var pseudo = false;

				var retrieveState = function() {

					if (!window.getComputedStyle) { 
						return;
					}

					//FIXME: this only retrieves pseudo value once, even thoug the method is called
					//on every resize
					pseudo = pseudo || window.getComputedStyle(element[0], ':after').getPropertyValue('content');

					if (pseudo) {
						console.log(pseudo);
					}
				}
				
				$timeout(function(){
					retrieveState()
				});

				angular.element(window).on('resize', cmUtil.debounce(retrieveState, 100));
			}
		};
	});
