'use strict';

angular.module('wpZestApp')
  .factory('cmUtil', function ($timeout) {

    var now = Date.now || function() {
      return new Date().getTime();
    };

    var debounce = function(func, wait, immediate) {

      var timeout, args, context, timestamp, result;

      var later = function() {
        var last = now() - timestamp;

        if (last < wait && last > 0) {
          timeout = setTimeout(later, wait - last);
        } else {

          timeout = null;

          if (!immediate) {
            result = func.apply(context, args);
            
            if (!timeout) {
              context = args = null;
            }
          }
        }
      };

      return function() {

        context = this;
        args = arguments;
        timestamp = now();
        var callNow = immediate && !timeout;

        if (!timeout) {
          timeout = setTimeout(later, wait);
        }

        if (callNow) {
          result = func.apply(context, args);
          context = args = null;
        }

        return result;
      };
    };

    var getStyleRules = function(className) {

      var styleSheet     = null;
      var ruleDefinition = null;

      for (var i = 0; i < document.styleSheets.length; i++) {

        if( document.styleSheets[i].href === null ) {
          continue;
        }

        if(document.styleSheets[i].href.indexOf('main.css') !== -1) {
          styleSheet = document.styleSheets[i];
          break;
        }
      }

      var classes = styleSheet.rules || styleSheet.cssRules;

      for(var x=0; x < classes.length; x++) {
        if(classes[x].selectorText === className) {
          // ruleDefinition = classes[x].cssText || classes[x].style.cssText;
          ruleDefinition = classes[x];
        }
      }

      return ruleDefinition;
    };

    var forceElRedraw = function(element, webkit, sledgehammer) {

      var prevValue;

      webkit       = webkit || false;
      sledgehammer = sledgehammer || false;

      if(element.hasOwnProperty('scope')) {
        element = element[0];
      }

      //Force element redraw browser doesn't overoptimise and bundle transitions together
      element.offsetTop; 

      if(webkit) {
        prevValue = element.style.webkitTransform;

        //README seems to cause problems with absolutely positioned elements
        element.style.webkitTransform = 'scale(1)';
        element.style.webkitTransform = prevValue;
      }

      if(sledgehammer) {
        console.log('forcing redraw');
        var n = document.createTextNode(' ');
        element.appendChild(n);
        $timeout(function(){n.parentNode.removeChild(n);});
      }
    };

    var getNaturalImageDimensions = function(image) {

      var width  = null;
      var height = null;

      if (typeof image.naturalWidth === undefined) {

        // IE 6/7/8
        var i = new Image();
        i.src = image.src;

        width  = i.width;
        height = i.height;
      } else {
        // HTML5 browsers
        width  = image.naturalWidth;
        height = image.naturalHeight;
        console.log(image.naturalHeight);
      }

      return {

        width:  width,
        height: height
      };
    };

    // Public API here
    return {
      now: now,
      debounce: debounce,
      getStyleRules: getStyleRules,
      forceElRedraw: forceElRedraw,
      getNaturalImageDimensions: getNaturalImageDimensions,
    };
  });
