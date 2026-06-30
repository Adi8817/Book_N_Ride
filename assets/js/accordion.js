/* =========================================================
   Book N Ride — accordion.js
   Expand / collapse accordion panels.
   Data-attribute driven — works on any page.

   Usage:
     <div data-accordion>                        <!-- wrapper -->
       <div class="accordion-item">
         <button class="accordion-trigger">FAQ question</button>
         <div class="accordion-panel">Answer…</div>
       </div>
     </div>

   Options (on data-accordion wrapper):
     data-accordion="one-open"  — only one panel open at a time (default)
     data-accordion="multi"     — panels open independently

   Loaded: FAQ, Services, Service Detail pages
   ========================================================= */
(function () {
  "use strict";

  var U = window.BNR && window.BNR.Utils;
  if (!U) { return; }

  U.onReady(function () {

    U.qsa("[data-accordion]").forEach(function (wrapper) {
      var mode     = wrapper.getAttribute("data-accordion") || "one-open";
      var triggers = U.qsa(".accordion-trigger", wrapper);

      triggers.forEach(function (trigger) {
        var panel = trigger.nextElementSibling;
        trigger.setAttribute("aria-expanded", "false");
        if (panel) {
          panel.style.display = "none";
          trigger.setAttribute("aria-controls", panel.id || "");
        }

        trigger.addEventListener("click", function () {
          var isOpen = trigger.getAttribute("aria-expanded") === "true";

          /* Close all others in one-open mode */
          if (mode === "one-open" && !isOpen) {
            triggers.forEach(function (t) {
              if (t !== trigger) {
                t.setAttribute("aria-expanded", "false");
                if (t.nextElementSibling) {
                  t.nextElementSibling.style.display = "none";
                }
              }
            });
          }

          /* Toggle this panel */
          trigger.setAttribute("aria-expanded", isOpen ? "false" : "true");
          if (panel) {
            panel.style.display = isOpen ? "none" : "block";
          }
        });
      });
    });

  });

}());
