'use strict';

angular.module('wpZestApp')
  .factory('cmProjects', function($http, $rootScope, $q) {
    
    // var projects = null;

    var all = function() {

      var projects = $q.defer();

      $http.get('data/projects.json', {cache: true}).success(function(data) {
        projects.resolve(data);
      });
    
      return projects.promise;
    };

    var findByName = function(name) {
      
      var projects = null;
      var project  = $q.defer();

      var lookupProjectByName = function() {
        for (var i = projects.length - 1; i >= 0; i--) {
          if(projects[i].postName === name) {
            project.resolve(projects[i]);
          }
        }
      };

      all().then(function(data) {
        projects = data;
        lookupProjectByName();
      });

      return project.promise;
    };

    // Public API here
    return {
      all: all,
      findByName: findByName
    };
  });
