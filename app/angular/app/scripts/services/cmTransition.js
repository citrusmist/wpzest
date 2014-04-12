'use strict';

angular.module('wpZest')
  .factory('cmTransition', function () {

    var whichTransitionEvent = function() {

      var t;
      var el = document.createElement('fakeelement');
      var transitions = {
        'transition':'transitionend',
        'MSTransition':'msTransitionEnd',
        'MozTransition':'transitionend',
        'WebkitTransition':'webkitTransitionEnd'
      };
   
      for(t in transitions){
        if( el.style[t] !== undefined ){
          return transitions[t];
        }
      }
    };

    var transitionend = whichTransitionEvent();

    var getPrefixed = function(prop, val) {

      var rules = {};

      rules['-webkit-'+prop] = val;
      rules['-moz-'+prop]    = val;
      rules['-ms-'+prop]     = val;
      rules['-o-'+prop]      = val;
      rules[prop]            = val;

      return rules;
    };

    // Public API here
    return {
      getPrefixed: getPrefixed,
      transitionEvent: transitionend
    };
  });