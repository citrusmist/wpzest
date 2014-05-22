'use strict';

angular.module('wpZest')
	.directive('cmProjects', ['$timeout', 'cmUtil' , function($timeout, cmUtil) {
	
			return {
				template: '<div ng-transclude></div>',
				restrict: 'E',
				controller: function($scope, $element, $attrs) {
	
					this.first           = true;
					this.isPreviewActive = false;
					this.thumbRatio      = false;
					this.slideIntoView   = false;
					this.showPreview     = false;
					this.hidePreview     = false;
					this.calcHeight      = false;
					this.setupPreview    = false;
	
				},
				transclude: true,
				replace: true,
				link: function postLink(scope, element, attrs, controller) {
					
					var elPreview     = angular.element(element[0].querySelectorAll('.projects-preview'));
					// var elPreviewWrap = angular.element(element[0].querySelectorAll('.projects-preview-wrap'));
					// var elList        = angular.element(element[0].querySelectorAll('.projects-list'));
					var elTitles      = angular.element(element[0].querySelectorAll('.project-link'));
					var leaveTimeout  = false;
					var enterTimeout  = false;
	
					elTitles.on('mouseenter', function() {
	
						var elTitle = angular.element(this);
						var elThumb = angular.element(
							elPreview[0].querySelectorAll(elTitle.data('thumb'))
						);
	
						if(leaveTimeout !== false) {
							console.log('cancel leave timeout');
							$timeout.cancel(leaveTimeout);
							leaveTimeout = false;
						}
	
						enterTimeout = $timeout(function () {
							
							enterTimeout = false;

							if(controller.isPreviewActive === false) {
								console.log('showing preview');
								controller.isPreviewActive = true;
								element.addClass('projects--isActive');
								
								controller.showPreview(elThumb);
							} else {
								controller.slideIntoView(elThumb);
							}
						}, 200);
					});
	
					elTitles.on('mouseleave', function() {
						
						if(enterTimeout !== false) {
							console.log('cancel enter timeout');
							$timeout.cancel(enterTimeout);
							enterTimeout = false;
						}
	
						//TODO: check if the projects preview is active before setting hte timeoue
						leaveTimeout = $timeout(function(){
	
							controller.isPreviewActive = false;
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
							controller.setupPreview();
						});

					angular.element(window).on('resize', cmUtil.debounce(controller.setupPreview, 100));
				}
			};
		}])
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
				var styleRules    = null;


				var slideIntoView = function(elThumb) {
					var distanceY = elThumb[0].offsetTop;

					elPreviewWrap.css(
						cmTransition.getPrefixed('transform', 'translateY(-' + distanceY + 'px)')
					);
				};

				var showPreview = function(elThumb) {
					elPreviewWrap.css(cmTransition.getPrefixed('transition-duration', '0s'));

					element.one(cmTransition.transitionEvent, function(evt) {

						//in case this event handler got triggered by hiding transition
						if(controller.isPreviewActive === false) {
							return true;
						}

						// console.log(evt);

						//If the mouse hasn't moved from the title before the transition finished
						controller.slideIntoView(elThumb);
						elPreviewWrap[0].offsetTop;
						elPreviewWrap.css(cmTransition.getPrefixed('transition-duration', ''));

						element.addClass('projects-preview--isActive');
						// controller.first = false;
					});
				};

				var hidePreview = function() {
					element.removeClass('projects-preview--isActive');
					// elPreviewWrap.css(cmTransition.getPrefixed('transition-duration', ''));
				};

				var calcHeight = function() {

					styleRules  = getStyleRules('.projects--isActive .projects-preview');

					if( styleRules === null ) {
						return '';
					}

					var previewWidth   = parseInt(styleRules.style.width, 10);
					var viewportWidth  = angular.element(window).width();

					var previewHeight = (viewportWidth * (previewWidth/100)) / controller.thumbRatio;

					return previewHeight;
				};

				var getStyleRules = function(className) {

					var styleSheet     = null;
					var ruleDefinition = null;

					for (var i = 0; i < document.styleSheets.length; i++) {

						if( document.styleSheets[i].href === null ) {
							continue;
						}

						if(document.styleSheets[i].href.indexOf('main.css') !== -1) {
							styleSheet = document.styleSheets[i];
							break;
						}
					}

					var classes = styleSheet.rules || styleSheet.cssRules;

			    for(var x=0; x < classes.length; x++) {
		        if(classes[x].selectorText === className) {
              // ruleDefinition = classes[x].cssText || classes[x].style.cssText;
              ruleDefinition = classes[x];
		        }
			    }

			    return ruleDefinition;
				};

				var setupPreview = function() {
					console.log('setting up preview');
					// element.css('height', controller.calcHeight());
					var height = controller.calcHeight();
					styleRules.style.height = height + 'px';
				};

				controller.slideIntoView = slideIntoView;
				controller.showPreview   = showPreview;
				controller.hidePreview   = hidePreview;
				controller.calcHeight    = calcHeight;
				controller.setupPreview  = setupPreview;

				elPreviewWrap.on(cmTransition.transitionEvent, function(evt) {
					//Stop propagation so we dont get a false positive in showPreview()
					//@TODO : consider an alternative approach

					evt.stopPropagation();
				});
			}
		};
	}]);
