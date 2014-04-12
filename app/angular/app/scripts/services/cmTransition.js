'use strict';

angular.module('wpZest')
  .factory('cmTransition', function () {
    // Service logic
    // ...

    var transitionend = '';

    var getPrefixed = function(prop, val) {

      var rules = {
        prop: val
      };

      rules['-webkit-'+prop] = val;
      rules['-moz-'+prop]    = val;
      rules['-ms-'+prop]     = val;
      rules['-o-'+prop]      = val;

      return rules;
    };

    // Public API here
    return {
      getPrefixed: getPrefixed
    };
  });
