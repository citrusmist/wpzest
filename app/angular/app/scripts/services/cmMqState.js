'use strict';

angular.module('wpZestApp')
  .factory('cmMqState', function () {

    var mqState = null;

    var get = function() {

    };

    var set = function(state) {

    };

    // Public API here
    return {
      someMethod: function () {
        return {
          get: get,
          set: set
        };
      }
    };
  });
