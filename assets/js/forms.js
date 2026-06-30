/* =========================================================
   Book N Ride — forms.js
   Form validation · field error states · success state
   Data-attribute driven — no hardcoded form IDs.

   Usage on any form:
     <form data-bnr-form>
       <div class="field" data-required data-type="text">…</div>
       <div class="field" data-required data-type="email">…</div>
       <div class="field" data-required data-type="phone">…</div>
     </form>

   Loaded: Contact, Booking, and any page with a form
   ========================================================= */
(function () {
  "use strict";

  var U = window.BNR && window.BNR.Utils;
  if (!U) { return; }

  U.onReady(function () {

    U.qsa("[data-bnr-form]").forEach(function (form) {
      initForm(form);
    });

    function initForm(form) {
      var fields = U.qsa(".field", form);

      /* Clear error state as user edits */
      fields.forEach(function (fieldWrap) {
        var input = fieldWrap.querySelector("input, select, textarea");
        if (!input) { return; }
        input.addEventListener("input", function () {
          fieldWrap.classList.remove("is-invalid");
        });
        input.addEventListener("change", function () {
          fieldWrap.classList.remove("is-invalid");
        });
      });

      form.addEventListener("submit", function (e) {
        e.preventDefault();
        var isValid = validateForm(form);
        if (isValid) { handleSuccess(form); }
      });
    }

    function validateForm(form) {
      var fields   = U.qsa(".field[data-required]", form);
      var allValid = true;
      var firstBad = null;

      fields.forEach(function (fieldWrap) {
        var input  = fieldWrap.querySelector("input, select, textarea");
        if (!input) { return; }
        var value  = (input.value || "").trim();
        var type   = fieldWrap.getAttribute("data-type") || "text";
        var valid  = value.length > 0;

        if (valid && type === "email") {
          valid = /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(value);
        }
        if (valid && type === "phone") {
          valid = value.replace(/\D/g, "").length >= 10;
        }

        if (!valid) {
          fieldWrap.classList.add("is-invalid");
          allValid = false;
          if (!firstBad) { firstBad = input; }
        }
      });

      if (firstBad) { firstBad.focus(); }
      return allValid;
    }

    function handleSuccess(form) {
      var successEl = document.getElementById(
        form.getAttribute("data-success-target")
      );
      if (successEl) {
        form.style.display = "none";
        successEl.classList.add("is-visible");
      }
    }

  });

}());
