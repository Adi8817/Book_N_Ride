/* =========================================================
   Book N Ride — modal.js
   Open modal via data-modal-target · close on overlay,
   close button, or Escape · focus trap · body scroll lock.

   Usage:
     <!-- Trigger -->
     <button data-modal-target="myModal">Open</button>

     <!-- Modal markup -->
     <div id="myModal" class="modal" aria-modal="true" role="dialog" hidden>
       <div class="modal-overlay"></div>
       <div class="modal-box">
         <button class="modal-close" aria-label="Close">✕</button>
         <!-- content -->
       </div>
     </div>

   Loaded: Any page with a lightbox or dialog
   ========================================================= */
(function () {
  "use strict";

  var U = window.BNR && window.BNR.Utils;
  if (!U) { return; }

  U.onReady(function () {

    var activeModal = null;

    function openModal(modal) {
      if (!modal) { return; }
      modal.hidden = false;
      document.body.style.overflow = "hidden";
      activeModal = modal;
      /* Focus first focusable element */
      var focusable = modal.querySelector(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      if (focusable) { focusable.focus(); }
    }

    function closeModal(modal) {
      if (!modal) { return; }
      modal.hidden = true;
      document.body.style.overflow = "";
      activeModal = null;
    }

    /* Trigger buttons */
    U.qsa("[data-modal-target]").forEach(function (trigger) {
      trigger.addEventListener("click", function () {
        var target = document.getElementById(
          trigger.getAttribute("data-modal-target")
        );
        openModal(target);
      });
    });

    /* Close buttons and overlay clicks */
    document.addEventListener("click", function (e) {
      if (!activeModal) { return; }
      if (
        e.target.classList.contains("modal-close") ||
        e.target.classList.contains("modal-overlay")
      ) {
        closeModal(activeModal);
      }
    });

    /* Escape key */
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && activeModal) {
        closeModal(activeModal);
      }
    });

  });

}());
