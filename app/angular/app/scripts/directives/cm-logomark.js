'use strict';

angular.module('wpZestApp')
	.directive('cmLogomark', function ($location, $timeout) {
		return {
			templateUrl: 'views/cmLogomark.html',
			restrict: 'E',
			replace: true,
			link: function postLink(scope, element, attrs) {

				var attachHandlers  = function() {
					element.on('click', function() {
						scope.$apply(function() {
							$location.path(attrs.href);
						});
					});
				};

				$timeout(function () {
					if(attrs.href !== undefined) {
						attrs.$addClass('logomark--link');
						attachHandlers();
					}
				});
			}
		};
	});
