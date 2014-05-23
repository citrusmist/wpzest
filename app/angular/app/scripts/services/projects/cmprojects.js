'use strict';

angular.module('wpZestApp')
  .factory('cmProjects', function($http, $q) {
    
    // var projects = null;

    var all = function() {

      var projects = $q.defer();

      $http.get('data/projects.json').success(function(data) {
        projects.resolve(data);
      });
    
      return projects.promise;
    };

    // Public API here
    return {
      all: all
    };
  });
