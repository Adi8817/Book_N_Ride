/* =========================================================
   Book N Ride — navigation.js
   Mobile nav toggle · dropdown touch support
   Active link state · sticky header (.is-scrolled)
   Close nav on anchor click / outside click / Escape
   Loaded: Every page
   ========================================================= */
(function () {
  "use strict";

  var U = window.BNR && window.BNR.Utils;
  if (!U) { return; }

  U.onReady(function () {

    var navToggle = U.qs("#navToggle");
    var mainNav   = U.qs("#mainNav");
    var header    = U.qs(".site-header");

    /* --------------------------------------------------
       Mobile hamburger toggle
    -------------------------------------------------- */
    if (navToggle && mainNav) {
      navToggle.addEventListener("click", function () {
        var isOpen = mainNav.classList.toggle("open");
        navToggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
      });
    }

    /* --------------------------------------------------
       Tap-to-expand dropdowns on small screens
    -------------------------------------------------- */
    U.qsa(".nav-item > .nav-link").forEach(function (link) {
      link.addEventListener("click", function (e) {
        var item = link.parentElement;
        if (window.innerWidth <= 992 && item.querySelector(".dropdown")) {
          e.preventDefault();
          item.classList.toggle("open-sub");
        }
      });
    });

    /* --------------------------------------------------
       Close mobile nav after tapping an anchor link
    -------------------------------------------------- */
    U.qsa(".main-nav a").forEach(function (a) {
      a.addEventListener("click", function () {
        if (window.innerWidth <= 992 && mainNav) {
          mainNav.classList.remove("open");
          if (navToggle) {
            navToggle.setAttribute("aria-expanded", "false");
          }
        }
      });
    });

    /* --------------------------------------------------
       Close on click outside the nav
    -------------------------------------------------- */
    document.addEventListener("click", function (e) {
      if (!mainNav || !navToggle) { return; }
      if (!mainNav.contains(e.target) && !navToggle.contains(e.target)) {
        mainNav.classList.remove("open");
        navToggle.setAttribute("aria-expanded", "false");
      }
    });

    /* --------------------------------------------------
       Escape key closes nav and open dropdowns
    -------------------------------------------------- */
    document.addEventListener("keydown", function (e) {
      if (e.key !== "Escape") { return; }
      if (mainNav) {
        mainNav.classList.remove("open");
        if (navToggle) { navToggle.setAttribute("aria-expanded", "false"); }
      }
      U.qsa(".nav-item.open-sub").forEach(function (item) {
        item.classList.remove("open-sub");
      });
    });

    /* --------------------------------------------------
       Sticky header — adds .is-scrolled after 60 px
    -------------------------------------------------- */
    if (header) {
      var onScroll = U.debounce(function () {
        header.classList.toggle("is-scrolled", window.scrollY > 60);
      }, 40);
      window.addEventListener("scroll", onScroll, { passive: true });
    }

    /* --------------------------------------------------
       Active link — highlight nav item matching current URL
    -------------------------------------------------- */
    var currentHash = window.location.hash;
    if (currentHash) {
      U.qsa(".main-nav .nav-link").forEach(function (link) {
        if (link.getAttribute("href") === currentHash) {
          link.style.color = "var(--gold)";
        }
      });
    }

  });

}());
