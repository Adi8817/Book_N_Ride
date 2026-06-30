/* =========================================================
   Book N Ride — tabs.js
   Tab click activates content panel.
   Keyboard left/right arrow navigation.
   ARIA aria-selected updated on change.

   Usage:
     <div data-tabs>
       <div role="tablist">
         <button role="tab" aria-controls="panel-1">Tab 1</button>
         <button role="tab" aria-controls="panel-2">Tab 2</button>
       </div>
       <div id="panel-1" role="tabpanel">Content 1</div>
       <div id="panel-2" role="tabpanel">Content 2</div>
     </div>

   Loaded: Services, Fleet, Service Detail pages
   ========================================================= */
(function () {
  "use strict";

  var U = window.BNR && window.BNR.Utils;
  if (!U) { return; }

  U.onReady(function () {

    U.qsa("[data-tabs]").forEach(function (wrapper) {
      var tabs   = U.qsa('[role="tab"]', wrapper);
      var panels = U.qsa('[role="tabpanel"]', wrapper);

      function activate(tab) {
        tabs.forEach(function (t) {
          t.setAttribute("aria-selected", "false");
          t.removeAttribute("tabindex");
        });
        panels.forEach(function (p) {
          p.hidden = true;
        });
        tab.setAttribute("aria-selected", "true");
        var target = document.getElementById(tab.getAttribute("aria-controls"));
        if (target) { target.hidden = false; }
        tab.focus();
      }

      tabs.forEach(function (tab, i) {
        tab.setAttribute("aria-selected", i === 0 ? "true" : "false");
        if (i !== 0) { tab.setAttribute("tabindex", "-1"); }

        tab.addEventListener("click", function () { activate(tab); });

        tab.addEventListener("keydown", function (e) {
          var idx = tabs.indexOf(tab);
          if (e.key === "ArrowRight" && idx < tabs.length - 1) {
            activate(tabs[idx + 1]);
          } else if (e.key === "ArrowLeft" && idx > 0) {
            activate(tabs[idx - 1]);
          }
        });
      });

      panels.forEach(function (p, i) {
        if (i !== 0) { p.hidden = true; }
      });
    });

  });

}());
