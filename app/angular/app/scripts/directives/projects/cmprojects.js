'use strict';

angular.module('wpZest')
	.directive('cmProjects', function($timeout, cmTransition) {

		return {
			template: '<div ng-transclude></div>',
			restrict: 'E',
			controller: function($scope, $element, $attrs) {
				this.first         = true;
				this.slideIntoView = false;
				this.showPreview   = false;
				this.hidePreview   = false;
			},
			transclude: true,
			replace: true,
			link: function postLink(scope, element, attrs, controller) {
				
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

					if(leaveTimeout !== false) {
						console.log('cancel timeout');
						$timeout.cancel(leaveTimeout);
						leaveTimeout = false;
					}

					enterTimeout = $timeout(function () {
						
						if(controller.first === true) {
							console.log('showing preview');
							element.addClass('projects--isActive');
							
							controller.showPreview(elThumb);
						} else {
							controller.slideIntoView(elThumb);
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

						controller.first = true;
						leaveTimeout = false;

						element.removeClass('projects--isActive');
						
					}, 400);
				});
			}
		};
	})
	.directive('cmProjectsPreview', ['$timeout', 'cmTransition', function($timeout, cmTransition){
		// Runs during compile
		return {
			// terminal: true,s
			// scope: {}, // {} = isolate, true = child, false/undefined = no change
			// controller: function($scope, $element, $attrs, $transclude) {},
			require: '^cmProjects', // Array = multiple requires, ? = optional, ^ = check parent elements
			restrict: 'E', // E = Element, A = Attribute, C = Class, M = Comment
			template: '<div ng-transclude></div>',
			transclude: true,
			link: function(scope, element, attrs, controller) {

				var elPreviewWrap = angular.element(element[0].querySelectorAll('.projects-preview-wrap'));

				var slideIntoView = function(elThumb) {
					var distanceY = elThumb[0].offsetTop;

					elPreviewWrap.css(
						cmTransition.getPrefixed('transform', 'translateY(-' + distanceY + 'px)')
					);
				};

				var showPreview = function(elThumb) {
					elPreviewWrap.css(cmTransition.getPrefixed('transition-duration', '0s'));

					element.one(cmTransition.transitionEvent, function(evt) {
						console.log(evt);
						//If the mouse hasn't moved from the title before the transition finished
						controller.slideIntoView(elThumb);
						elPreviewWrap[0].offsetTop;
						elPreviewWrap.css(cmTransition.getPrefixed('transition-duration', ''));

						element.addClass('projects-preview--isActive');
						controller.first = false;
					});
				};

				var hidePreview = function() {
					element.removeClass('projects-preview--isActive');
					elPreviewWrap.css(cmTransition.getPrefixed('transition-duration', ''));
				};

				controller.slideIntoView = slideIntoView;
				controller.showPreview = showPreview;
				controller.hidePreview = hidePreview;

				elPreviewWrap.on(cmTransition.transitionEvent, function(evt) {
					evt.stopPropagation();
				} );
			}
		};
	}]);
