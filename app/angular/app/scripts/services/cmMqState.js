'use strict';

angular.module('wpZestApp')
  .factory('cmMqState', function ($q) {


    //README: mqState should be a deferred which gets resolved
    //when state is set from the directive
    //How do we handle resize?
    var mqState = null;
    var mqStateDeferred = $q.defer();

    var get = function() {
      //Does this need to be a promise, since CSS must be loaded and parsed
      //in order for subsequent scritps to be loaded and parsed
      // return mqStateDeferred.promise();
      return mqState;
    };

    var set = function(state) {
      mqState = state;
      // mqStateDeferred.resolve(mqState);
    };

    // Public API here
    return {
      get: get,
      set: set
    };
  });
