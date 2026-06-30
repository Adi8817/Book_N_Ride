/* =========================================================
   Book N Ride — slider.js
   Touch/swipe carousel · prev/next buttons
   Dot indicator sync · auto-play with hover pause
   Fully data-attribute driven.

   Usage:
     <div data-slider data-autoplay="4000">
       <div class="slider-track">
         <div class="slide">…</div>
         <div class="slide">…</div>
       </div>
       <button class="slider-prev" aria-label="Previous">‹</button>
       <button class="slider-next" aria-label="Next">›</button>
       <div class="slider-dots"></div>
     </div>

   Loaded: Fleet, Gallery, any page with a carousel
   ========================================================= */
(function () {
  "use strict";

  var U = window.BNR && window.BNR.Utils;
  if (!U) { return; }

  U.onReady(function () {

    U.qsa("[data-slider]").forEach(function (wrapper) {
      var track    = U.qs(".slider-track", wrapper);
      var slides   = track ? U.qsa(".slide", track) : [];
      var prevBtn  = U.qs(".slider-prev", wrapper);
      var nextBtn  = U.qs(".slider-next", wrapper);
      var dotsWrap = U.qs(".slider-dots", wrapper);
      var autoplay = parseInt(wrapper.getAttribute("data-autoplay") || "0", 10);
      var current  = 0;
      var timer    = null;

      if (!slides.length) { return; }

      /* Build dot indicators */
      var dots = [];
      if (dotsWrap) {
        slides.forEach(function (_, i) {
          var dot = document.createElement("button");
          dot.setAttribute("aria-label", "Go to slide " + (i + 1));
          dot.addEventListener("click", function () { goTo(i); });
          dotsWrap.appendChild(dot);
          dots.push(dot);
        });
      }

      function goTo(index) {
        current = (index + slides.length) % slides.length;
        track.style.transform = "translateX(-" + (current * 100) + "%)";
        dots.forEach(function (d, i) {
          d.classList.toggle("is-active", i === current);
        });
      }

      if (prevBtn) { prevBtn.addEventListener("click", function () { goTo(current - 1); }); }
      if (nextBtn) { nextBtn.addEventListener("click", function () { goTo(current + 1); }); }

      /* Auto-play */
      if (autoplay > 0) {
        function start() { timer = setInterval(function () { goTo(current + 1); }, autoplay); }
        function stop()  { clearInterval(timer); }
        wrapper.addEventListener("mouseenter", stop);
        wrapper.addEventListener("mouseleave", start);
        start();
      }

      /* Touch / swipe */
      var startX = 0;
      track.addEventListener("touchstart", function (e) {
        startX = e.touches[0].clientX;
      }, { passive: true });
      track.addEventListener("touchend", function (e) {
        var diff = startX - e.changedTouches[0].clientX;
        if (Math.abs(diff) > 40) { goTo(current + (diff > 0 ? 1 : -1)); }
      });

      goTo(0);
    });

  });

}());
