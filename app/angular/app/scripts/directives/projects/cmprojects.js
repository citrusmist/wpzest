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
				var leaveTimeout  = false;
				var enterTimeout  = false;

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

					enterTimeout = $timeout(function () {

						if(leaveTimeout !== false) {
							console.log('cancel timeout');
							$timeout.cancel(leaveTimeout);
							leaveTimeout = false;
						}

						if(first === true) {
							console.log('showing preview');
							element.addClass('projects--isActive');
							elPreviewWrap.css(cmTransition.getPrefixed('transition-duration', '0s'));

							elPreviewWrap.on(cmTransition.transitionEvent, function(evt) {
								evt.stopPropagation();
							} );

							elPreview.one(cmTransition.transitionEvent, function(evt) {
								console.log(evt);
								//If the mouse hasn't moved from the title before the transition finished
								if(element.hasClass('projects--isActive')) {
									slideIntoView(elThumb);
									elPreviewWrap[0].offsetTop;
									elPreviewWrap.css(cmTransition.getPrefixed('transition-duration', ''));

									elPreview.addClass('projects-preview--isActive');
									first = false;
								}
							});
						} else {
							slideIntoView(elThumb);
						}
					}, 200);
					
				});

				elTitles.on('mouseleave', function() {
					
					if(enterTimeout !== false) {
						$timeout.cancel(enterTimeout);
						enterTimeout = false;
					}

					//TODO: check if the prjocects preview is active before setting hte timeoue
					leaveTimeout = $timeout(function(){

						first = true;
						leaveTimeout = false;

						element.removeClass('projects--isActive');
						elPreview.removeClass('projects-preview--isActive');
						elPreviewWrap.css(cmTransition.getPrefixed('transition-duration', ''));
					}, 400);
				});
			}
		};
	});
