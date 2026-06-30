/* =========================================================
   Book N Ride — utilities.js
   Shared helper functions used by all other JS files.
   Must be loaded FIRST — exposes window.BNR.Utils.
   Loaded: Every page
   ========================================================= */
(function (window) {
  "use strict";

  var Utils = {

    /* Safe querySelector */
    qs: function (selector, ctx) {
      return (ctx || document).querySelector(selector);
    },

    /* Safe querySelectorAll — returns a plain Array */
    qsa: function (selector, ctx) {
      return Array.prototype.slice.call(
        (ctx || document).querySelectorAll(selector)
      );
    },

    /* Run fn when DOM is ready */
    onReady: function (fn) {
      if (document.readyState !== "loading") {
        fn();
      } else {
        document.addEventListener("DOMContentLoaded", fn);
      }
    },

    /* Limit how often a scroll/resize handler fires */
    debounce: function (fn, ms) {
      var timer;
      return function () {
        clearTimeout(timer);
        timer = setTimeout(fn, ms || 200);
      };
    }

  };

  /* Expose on global BNR namespace */
  window.BNR = window.BNR || {};
  window.BNR.Utils = Utils;

}(window));
