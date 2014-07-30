'use strict';

angular.module('wpZestApp')
	.directive('cmProjects', ['$timeout', '$route', 'cmUtil', 'cmProjects' , function($timeout, $route, cmUtil, cmProjects) {
	
			return {
				scope: {},
				templateUrl: 'views/cmProjects.html',
				restrict: 'E',
				controller: function($scope, $element, $attrs) {
	
					this.first             = true;
					this.isPreviewActive   = false;
					this.isPreviewDisabled = false;
					this.thumbRatio        = false;
					this.slideIntoView     = false;
					this.showPreview       = false;
					this.hidePreview       = false;
					this.calcHeight        = false;
					this.setupPreview      = false;
					this.elCurrentThumb    = false;
				},
				transclude: false,
				replace: true,
				link: function postLink(scope, element, attrs, controller) {

					console.log(scope);
					scope.projects = {};
					scope.currentProjectName = '';

					var elPreview     = false;
					var elTitles      = false;
					var leaveTimeout  = false;
					var enterTimeout  = false;

					var showProject = function(elTitle) {

						controller.elCurrentThumb = angular.element(
							elPreview[0].querySelectorAll('.projects-thumb--' + elTitle.attr('href').replace('#/project/', ''))
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
								controller.showPreview();
							} else {
								controller.slideIntoView();
							}
						}, 200);
					};

					var hideProject = function() {
													
						if(enterTimeout !== false) {
							// console.log('cancel enter timeout');
							$timeout.cancel(enterTimeout);
							enterTimeout = false;
						}
	
						leaveTimeout = $timeout(function(){
	
							leaveTimeout = false;
	
							element.removeClass('projects--isActive');
							controller.hidePreview();
							controller.elCurrentThumb = false;
						}, 400);
					};

					var handleRouteChange = function(currentRoute) {
						console.log(currentRoute);
						scope.currentProjectName = currentRoute.params.projectName;
					};

					var attachHandlers = function() {

						elTitles.on('mouseenter', function() {
							
							if(controller.isPreviewDisabled === true ) {
								return;
							}

							showProject(angular.element(this));
						});
		
						elTitles.on('mouseleave', function() {
							
							if(controller.isPreviewDisabled === true ) {
								return;
							}

							hideProject();
						});

						elTitles.on('click',function(evt) {
							
							if(controller.isPreviewDisabled === true ) {
								return;
							}

							element.removeClass('projects--isActive');
							controller.hidePreview();
						});
						
						$timeout(function(){
							element.imagesLoaded()
								.progress(function(instance, image) {

									var dim = null;
			
									if(controller.thumbRatio !== false) {
										return;
									}

									dim = cmUtil.getNaturalImageDimensions(image.img);
									controller.thumbRatio = dim.width / dim.height;
									console.log(controller.thumbRatio);
									controller.setupPreview();
								});
						});

						angular.element(window).on('resize', cmUtil.debounce(controller.setupPreview, 100));
						
						scope.$on('$routeChangeSuccess', function(event, current) {
							handleRouteChange(current);
						});
					};

					cmProjects.all().then(function(projects) {
						scope.projects = projects;
						console.log(scope.projects);

						$timeout(function() {
							elPreview     = angular.element(element[0].querySelectorAll('.projects-preview'));
							elTitles      = angular.element(element[0].querySelectorAll('.projects-link'));

							attachHandlers();
							handleRouteChange($route.current);
						});
					});
				}
			};
		}])
	.directive('cmProjectsPreview', ['$timeout', 'cmTransition', 'cmUtil', 'cmMqState', function($timeout, cmTransition, cmUtil, cmMqState){
		// Runs during compile
		return {
			scope: false,
			require: ['^cmProjects','^cmHeader'], // Array = multiple requires, ? = optional, ^ = check parent elements
			restrict: 'E', // E = Element, A = Attribute, C = Class, M = Comment
			template: '<div><div class="projects-preview-wrap">' +
					'<div ng-repeat="project in projects">' +
						'<img class="projects-preview-thumb projects-thumb--{{project.postName}}" ng-src="{{project.thumbnail.medium}}" alt="">' +
					'</div>' +
				'</div></div>',
			transclude: true,
			replace: true,
			link: function(scope, element, attrs, controllers) {

				var controller       = controllers[0];
				var headerController = controllers[1];

				console.log(controllers);

				var elHeader      = angular.element(document.querySelectorAll('.header'));
				var elPreviewWrap = angular.element(element[0].querySelectorAll('.projects-preview-wrap'));
				// var elThumbs      = angular.element(element[0].querySelectorAll('.projects-preview.thumb'));
				var styleRules    = null;


				var slideIntoView = function() {

					var distanceY = controller.elCurrentThumb[0].offsetTop;

					elPreviewWrap.css(
						cmTransition.getPrefixed('transform', 'translateY(-' + distanceY + 'px)')
					);
				};

				var showPreview = function() {

					controller.isPreviewActive = true;

					elPreviewWrap.css(cmTransition.getPrefixed('transition-duration', '0s'));

					element.one(cmTransition.transitionEvent, function(evt) {

						//in case this event handler got triggered by hiding transition
						if(controller.isPreviewActive === false) {
							return true;
						}

						// console.log(evt);

						//If the mouse hasn't moved from the title before the transition finished
						controller.slideIntoView(controller.elCurrentThumb);
						cmUtil.forceElRedraw(elPreviewWrap);
						elPreviewWrap.css(cmTransition.getPrefixed('transition-duration', ''));

						element.addClass('projects-preview--isActive');
						// controller.first = false;
					});
				};

				var hidePreview = function() {

					controller.isPreviewActive = false;
					element.removeClass('projects-preview--isActive');
				};

				var calcHeight = function(prefix) {

					var selector = '.projects--isActive .projects-preview';

					prefix     = headerController.getStateClass();
					console.log(prefix);
					selector   = (prefix === '') ? selector : '.' + prefix + ' ' + selector;
					styleRules = cmUtil.getStyleRules(selector);

					if(styleRules === null) {
						return '';
					}

					//README: assuming that width is a percentage value
					var previewWidth  = parseInt(styleRules.style.width, 10);
					var viewportWidth = elHeader.width();
					var previewHeight = (viewportWidth * (previewWidth / 100)) / controller.thumbRatio;

					return previewHeight;
				};

				var setupPreview = function() {

					if(cmMqState.is('narrow')) {
						controller.isPreviewDisabled = true;
						return;
					}

					controller.isPreviewDisabled = false;

					// headerState = headerState || '';
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

				scope.$on('headerStateChange', function(evt, data) {
					controller.setupPreview();
				});
			}
		};
	}]);
