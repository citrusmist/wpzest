'use strict';

angular.module('wpZestApp')
	.directive('cmProjects', ['$timeout', 'cmUtil', 'cmProjects' , function($timeout, cmUtil, cmProjects) {
	
			return {
				scope: {},
				templateUrl: 'views/cmProjects.html',
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
				transclude: false,
				replace: true,
				link: function postLink(scope, element, attrs, controller) {

					console.log(scope);
					scope.projects = {};

					var elPreview     = false;
					var elTitles      = false;
					var leaveTimeout  = false;
					var enterTimeout  = false;

					var attachHandlers = function() {

						elTitles.on('mouseenter', function() {

							var elTitle = angular.element(this);
							var elThumb = angular.element(
								elPreview[0].querySelectorAll('.projects-thumb--' + elTitle.attr('href').replace('#/projects/', ''))
							);

							if(leaveTimeout !== false) {
								// console.log('cancel leave timeout');
								$timeout.cancel(leaveTimeout);
								leaveTimeout = false;
							}
		
							enterTimeout = $timeout(function () {
								
								enterTimeout = false;

								if(controller.isPreviewActive === false) {
									element.addClass('projects--isActive');
									controller.showPreview(elThumb);
								} else {
									controller.slideIntoView(elThumb);
								}
							}, 200);
						});
		
						elTitles.on('mouseleave', function() {
							
							if(enterTimeout !== false) {
								// console.log('cancel enter timeout');
								$timeout.cancel(enterTimeout);
								enterTimeout = false;
							}
		
							leaveTimeout = $timeout(function(){
		
								leaveTimeout = false;
		
								element.removeClass('projects--isActive');
								controller.hidePreview();
							}, 400);
						});
		
						element.imagesLoaded()
							.progress(function(instance,image){

								var dim = null;
		
								if(controller.thumbRatio !== false) {
									return;
								}

								dim = cmUtil.getNaturalImageDimensions(image.img);
		
								controller.thumbRatio = dim.width / dim.height;
								console.log(controller.thumbRatio);
								controller.setupPreview();
							});

						angular.element(window).on('resize', cmUtil.debounce(controller.setupPreview, 100));
					};

					cmProjects.all().then(function(projects) {
						scope.projects = projects;
						console.log(scope.projects);

						$timeout(function() {
							elPreview     = angular.element(element[0].querySelectorAll('.projects-preview'));
							elTitles      = angular.element(element[0].querySelectorAll('.projects-link'));
							attachHandlers();
						});
					});
				}
			};
		}])
	.directive('cmProjectsPreview', ['$timeout', 'cmTransition', 'cmUtil', function($timeout, cmTransition, cmUtil){
		// Runs during compile
		return {
			scope: false,
			require: '^cmProjects', // Array = multiple requires, ? = optional, ^ = check parent elements
			restrict: 'E', // E = Element, A = Attribute, C = Class, M = Comment
			template: '<div><div class="projects-preview-wrap">' +
				'<div ng-repeat="project in projects" class="projects-preview-{{post_name}}">' +
					'<img class="projects-preview-thumb projects-thumb--{{project.post_name}}" ng-src="{{project.thumbnail}}" alt="">' +
				'</div>' +
			'</div></div>',
			transclude: true,
			replace: true,
			link: function(scope, element, attrs, controller) {

				console.log('cmProjectsPreview');
				console.log(scope);

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
					controller.isPreviewActive = true;
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
					controller.isPreviewActive = false;
					element.removeClass('projects-preview--isActive');
				};

				var calcHeight = function() {

					styleRules  = cmUtil.getStyleRules('.projects--isActive .projects-preview');

					if(styleRules === null) {
						return '';
					}

					//README: assuming that widht is a percentage value
					var previewWidth   = parseInt(styleRules.style.width, 10);
					var viewportWidth  = angular.element(window).width();

					var previewHeight = (viewportWidth * (previewWidth/100)) / controller.thumbRatio;

					return previewHeight;
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
