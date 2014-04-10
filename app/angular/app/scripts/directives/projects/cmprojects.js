'use strict';

angular.module('wpZest')
	.directive('cmProjects', function () {

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

				elList.on('mouseenter', function() {
					element.addClass('projects--isActive');
					if(first === true) {
						elPreviewWrap.css({
							'-webkit-transition-duration': '0s',
					    '-moz-transition-duration': '0s',
					    '-o-transition-duration': '0s',
					    'transition-duration': '0s'
						});
						console.log(elPreviewWrap.attr('style'));
					}
				});

				elList.on('mouseleave', function() {
					element.removeClass('projects--isActive');
					elPreview.removeClass('projects-preview--isActive');
					first = true;
				});

				elTitles.on('mouseenter', function() {

					var elTitle = angular.element(this);
					var elThumb = angular.element(
						elPreview[0].querySelectorAll(elTitle.data('thumb'))
					);
					var distanceY = elThumb[0].offsetTop;
					console.log(elThumb[0].offsetTop);

					elPreviewWrap.css({
						'-webkit-transform': 'translateY(-' + distanceY + 'px)',
						'-moz-transform': 'translateY(-' +  distanceY + 'px)',
						'-ms-transform': 'translateY(-' + distanceY + 'px)',
						'-o-transform': 'translateY(-' + distanceY + 'px)',
						'transform': 'translateY(-' + distanceY + 'px)',
					});

					if(first === true) {
						elPreviewWrap.css({
							'-webkit-transition-duration': '',
					    '-moz-transition-duration': '',
					    '-o-transition-duration': '',
					    'transition-duration': ''
						});

						first = false;
					}

					elPreview.addClass('projects-preview--isActive');

				});
			}
		};
	});
