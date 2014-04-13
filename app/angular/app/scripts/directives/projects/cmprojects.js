'use strict';

angular.module('wpZest')
	.directive('cmProjects', function($timeout, cmTransition) {

		return {
			template: '<div ng-transclude></div>',
			restrict: 'E',
			transclude: true,
			replace: true,
			link: function postLink(scope, element, attrs) {
				
				var first         = true;
				var elPreview     = angular.element(element[0].querySelectorAll('.projects-preview'));
				var elPreviewWrap = angular.element(element[0].querySelectorAll('.projects-preview-wrap'));
				var elList        = angular.element(element[0].querySelectorAll('.projects-list'));
				var elTitles      = angular.element(element[0].querySelectorAll('.project-link'));
				var timeout       = false;

				var slideIntoView = function(elThumb) {
					var distanceY = elThumb[0].offsetTop;

					elPreviewWrap.css(
						cmTransition.getPrefixed('transform', 'translateY(-' + distanceY + 'px)')
					);
				};

				elTitles.on('mouseenter', function() {

					var elTitle = angular.element(this);
					var elThumb = angular.element(
						elPreview[0].querySelectorAll(elTitle.data('thumb'))
					);

					if(timeout !== false) {
						$timeout.cancel(timeout);
					}

					if(first === true) {

						element.addClass('projects--isActive');
						elPreviewWrap.css(cmTransition.getPrefixed('transition-duration', '0s'));

						elPreview.one(cmTransition.transitionEvent, function() {

							slideIntoView(elThumb);

							elPreviewWrap[0].offsetTop;
							elPreviewWrap.css(cmTransition.getPrefixed('transition-duration', ''));

							elPreview.addClass('projects-preview--isActive');
							first = false;
						});
					} else {
						slideIntoView(elThumb);
					}
				});

				elTitles.on('mouseleave', function() {

					timeout = $timeout(function(){
						element.removeClass('projects--isActive');
						elPreview.removeClass('projects-preview--isActive');
						first = true;
					}, 400, false);
				});
			}
		};
	});
