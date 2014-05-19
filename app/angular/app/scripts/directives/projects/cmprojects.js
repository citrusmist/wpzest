'use strict';

angular.module('wpZest')
	.directive('cmProjects', function($timeout, cmTransition) {

		return {
			template: '<div ng-transclude></div>',
			restrict: 'E',
			controller: function($scope, $element, $attrs) {
				this.first         = true;
				this.thumbRatio    = false;
				this.slideIntoView = false;
				this.showPreview   = false;
				this.hidePreview   = false;
				this.calcHeight    = false;
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

				/*var slideIntoView = function(elThumb) {
					var distanceY = elThumb[0].offsetTop;

					elPreviewWrap.css(
						cmTransition.getPrefixed('transform', 'translateY(-' + distanceY + 'px)')
					);
				};*/

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

					//TODO: check if the projects preview is active before setting hte timeoue
					leaveTimeout = $timeout(function(){

						controller.first = true;
						leaveTimeout = false;

						element.removeClass('projects--isActive');
						controller.hidePreview();
					}, 400);
				});

				element.imagesLoaded()
					.progress(function(instance,image){
						
						var dummyImg = new Image();

						if(controller.thumbRatio !== false) {
							return;
						}

						dummyImg.src = image.img.src;
						controller.thumbRatio = dummyImg.width / dummyImg.height;
						console.log(controller.thumbRatio);
						controller.calcHeight();
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
				// var elThumbs      = angular.element(element[0].querySelectorAll('.projects-preview.thumb'));

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
					// elPreviewWrap.css(cmTransition.getPrefixed('transition-duration', ''));
				};

				var calcHeight = function() {

					var defo = getRuleDefinition('.projects--isActive .projects-preview');
					console.log(defo);
				};

				var getRuleDefinition = function(className) {

					var styleSheet = null;

					for (var i = 0; i < document.styleSheets.length; i++) {


						if(document.styleSheets[i].hasOwnProperty('href') === false || 
								document.styleSheets[i].href === null ) {
							continue;
						}

						console.log(document.styleSheets[i]);

						if( document.styleSheets[i].href.indexOf('main.css') !== -1 ) {
							styleSheet = document.styleSheets[i];
							break;
						}
					}

					var classes = styleSheet.rules || styleSheet.cssRules;
			    for(var x=0;x<classes.length;x++) {
		        if(classes[x].selectorText===className) {
              (classes[x].cssText) ? console.log(classes[x].cssText) : console.log(classes[x].style.cssText);
		        }
			    }
				};

				controller.slideIntoView = slideIntoView;
				controller.showPreview   = showPreview;
				controller.hidePreview   = hidePreview;
				controller.calcHeight    = calcHeight;

				elPreviewWrap.on(cmTransition.transitionEvent, function(evt) {
					evt.stopPropagation();
				});
			}
		};
	}]);
