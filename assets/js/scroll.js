/* =========================================================
   Book N Ride — scroll.js
   Scroll-triggered reveal (IntersectionObserver)
   Back-to-top button · smooth anchor scroll with header offset
   Loaded: Every page
   ========================================================= */
(function () {
  "use strict";

  var U = window.BNR && window.BNR.Utils;
  if (!U) { return; }

  U.onReady(function () {

    /* --------------------------------------------------
       Scroll-triggered reveal
       Add  data-reveal  to any element to opt in.
       JS adds .is-visible when the element enters viewport.
       CSS transitions handle the actual animation.
    -------------------------------------------------- */
    if ("IntersectionObserver" in window) {
      var revealObserver = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            revealObserver.unobserve(entry.target);
          }
        });
      }, { threshold: 0.1, rootMargin: "0px 0px -40px 0px" });

      U.qsa("[data-reveal]").forEach(function (el) {
        revealObserver.observe(el);
      });
    }

    /* --------------------------------------------------
       Back-to-top button
       HTML: <button id="backToTop" aria-label="Back to top">↑</button>
       CSS:  #backToTop { display:none } #backToTop.is-visible { display:flex }
    -------------------------------------------------- */
    var btt = U.qs("#backToTop");
    if (btt) {
      window.addEventListener("scroll", U.debounce(function () {
        btt.classList.toggle("is-visible", window.scrollY > 500);
      }, 100), { passive: true });

      btt.addEventListener("click", function () {
        window.scrollTo({ top: 0, behavior: "smooth" });
      });
    }

    /* --------------------------------------------------
       Smooth anchor scroll with sticky-header offset
       Overrides the native jump to account for the
       fixed header height.
    -------------------------------------------------- */
    U.qsa('a[href^="#"]').forEach(function (anchor) {
      anchor.addEventListener("click", function (e) {
        var id = (anchor.getAttribute("href") || "").slice(1);
        if (!id) { return; }
        var target = document.getElementById(id);
        if (!target) { return; }
        e.preventDefault();
        var headerEl = U.qs(".site-header");
        var offset   = headerEl ? headerEl.offsetHeight : 0;
        var top      = target.getBoundingClientRect().top + window.scrollY - offset - 16;
        window.scrollTo({ top: Math.max(0, top), behavior: "smooth" });
      });
    });

  });

}());
