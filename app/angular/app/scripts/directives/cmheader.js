'use strict';

angular.module('wpZestApp')
  .directive('cmHeader', function () {
    return {
      templateUrl: 'views/cmHeader.html',
      replace: true,
      restrict: 'E',
      link: function postLink(scope, element, attrs) {
      }
    };
  });

