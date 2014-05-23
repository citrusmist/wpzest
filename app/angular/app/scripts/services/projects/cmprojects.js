'use strict';

angular.module('wpZestApp')
  .factory('cmProjects', function ($http) {
    
    var all = function() {
      $http.get('data/projects.json').success(function(data) {
        return data;
      });
    };

    // Public API here
    return {
      all: all
    };
  });
