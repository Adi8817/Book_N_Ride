/* =========================================================
   Book N Ride — fallback.js
   Broken image recovery — global error listener.
   Replaces any failed <img> with a styled placeholder.
   Loaded: Every page
   ========================================================= */
(function () {
  "use strict";

  document.addEventListener("error", function (e) {
    var target = e.target;
    if (!target || target.tagName !== "IMG") { return; }

    /* Hide the broken image icon */
    target.style.opacity = "0";

    /* Replace the card media background with a gold gradient */
    var media = target.closest(".fleet-media, .svc-media");
    if (media) {
      media.style.background =
        "radial-gradient(420px 200px at 50% 130%, rgba(245,197,66,0.16), transparent 70%), #0e0e11";
    }
  }, true);

}());
