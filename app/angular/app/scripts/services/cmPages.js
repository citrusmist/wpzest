'use strict';

angular.module('wpZestApp')
  .factory('cmPages', function($http, $rootScope, $q) {
    
    // var pages = null;

    var all = function() {

      var pages = $q.defer();

      $http.get('data/pages.json', {cache: true}).success(function(data) {
        pages.resolve(data);
      });
    
      return pages.promise;
    };

    var findByName = function(name) {
      
      var pages = null;
      var page  = $q.defer();

      var lookuppageByName = function() {
        for (var i = pages.length - 1; i >= 0; i--) {
          if(pages[i].postName === name) {
            page.resolve(pages[i]);
          }
        }
      };

      all().then(function(data) {
        pages = data;
        lookuppageByName();
      });

      return page.promise;
    };

    // Public API here
    return {
      all: all,
      findByName: findByName
    };
  });
