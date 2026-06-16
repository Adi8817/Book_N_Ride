/* =========================================================
   Book N Ride Executive Car Service
   js/script.js  —  Vanilla JavaScript
   ========================================================= */
(function () {
  "use strict";

  /* ---------- helpers ---------- */
  var $ = function (sel, ctx) {
    return (ctx || document).querySelector(sel);
  };
  var img = function (id, w) {
    return (
      "https://images.unsplash.com/photo-" +
      id +
      "?auto=format&fit=crop&w=" +
      (w || 800) +
      "&q=72"
    );
  };
  function el(tag, cls, html) {
    var n = document.createElement(tag);
    if (cls) n.className = cls;
    if (html != null) n.innerHTML = html;
    return n;
  }

  /* =======================================================
     1. MOBILE NAV
     ======================================================= */
  var navToggle = $("#navToggle");
  var mainNav = $("#mainNav");
  if (navToggle) {
    navToggle.addEventListener("click", function () {
      mainNav.classList.toggle("open");
    });
  }
  // collapsible sub-menus on small screens
  document.querySelectorAll(".nav-item > .nav-link").forEach(function (link) {
    link.addEventListener("click", function (e) {
      var item = link.parentElement;
      if (window.innerWidth <= 992 && item.querySelector(".dropdown")) {
        e.preventDefault();
        item.classList.toggle("open-sub");
      }
    });
  });
  // close mobile nav after navigating
  document.querySelectorAll('.main-nav a[href^="#"]').forEach(function (a) {
    a.addEventListener("click", function () {
      if (window.innerWidth <= 992) mainNav.classList.remove("open");
    });
  });

  /* =======================================================
     2. TRANSPORTATION SERVICES  (lifestyle images)
     ======================================================= */
  var IC = {
    plane:
      '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M2 16l20-7-6 12-3-4-4-1z"/><path d="M22 2L11 13"/></svg>',
    dice: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><rect x="4" y="4" width="16" height="16" rx="3"/><circle cx="9" cy="9" r="1.3" fill="currentColor"/><circle cx="15" cy="15" r="1.3" fill="currentColor"/><circle cx="12" cy="12" r="1.3" fill="currentColor"/></svg>',
    briefcase:
      '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><rect x="3" y="7" width="18" height="13" rx="2"/><path d="M8 7V5a2 2 0 012-2h4a2 2 0 012 2v2"/></svg>',
    cross:
      '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M12 3v18M3 12h18"/><circle cx="12" cy="12" r="9"/></svg>',
    cap: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M3 9l9-5 9 5-9 5-9-5z"/><path d="M6 11v5c0 1 3 2.5 6 2.5S18 17 18 16v-5"/></svg>',
    star: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M12 3l2.5 5 5.5.8-4 3.9 1 5.5-5-2.7-5 2.7 1-5.5-4-3.9 5.5-.8z"/></svg>',
    bus: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><circle cx="6" cy="18" r="2.4"/><circle cx="18" cy="18" r="2.4"/><path d="M8.4 18h7.2M4 18V8h8l4 4v6"/></svg>',
    sparkle:
      '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M5 13l7-9 7 9M4 13h16l-1.5 7h-13z"/></svg>',
    ship: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M3 16l9-3 9 3-2 4H5z"/><path d="M12 3v10M8 9h8"/></svg>',
    candle:
      '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M12 3v8M8 7h8M5 21V11h14v10z"/></svg>',
    group:
      '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><circle cx="9" cy="8" r="3"/><circle cx="17" cy="9" r="2.3"/><path d="M3 20c0-3 3-5 6-5s6 2 6 5M15 20c0-2 .5-3.5 2-4"/></svg>',
    hotel:
      '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M4 21V4h12v17M16 9h4v12M8 8h2M8 12h2M8 16h2"/></svg>',
  };

  // lifestyle stock imagery (no vehicles) — casino reads as casino, etc.
  var services = [
    {
      num: "01",
      name: "Airport Transportation",
      desc: "On-time pickups & drop-offs to JFK, LGA, EWR, BDL, HPN and beyond.",
      id: "1556388158-158ea5ccacbd",
      icon: IC.plane,
    },
    {
      num: "02",
      name: "Casino Transportation",
      desc: "First-class rides to Foxwoods, Mohegan Sun & the region\u2019s top casinos.",
      id: "1596838132731-3301c3fd4317",
      icon: IC.dice,
    },
    {
      num: "03",
      name: "Corporate Transportation",
      desc: "Punctual executive travel for meetings, clients and conferences.",
      id: "1497366216548-37526070297c",
      icon: IC.briefcase,
    },
    {
      num: "04",
      name: "Medical Transportation",
      desc: "Safe, courteous non-emergency rides to and from appointments.",
      id: "1538108149393-fbbd81895907",
      icon: IC.cross,
    },
    {
      num: "05",
      name: "Private School Transportation",
      desc: "Reliable, vetted chauffeurs for trusted daily student travel.",
      id: "1503676260728-1c00da094a0b",
      icon: IC.cap,
    },
    {
      num: "06",
      name: "Prom Transportation",
      desc: "Make the night unforgettable with a safe, head-turning arrival.",
      id: "1519225421980-715cb0215aed",
      icon: IC.star,
    },
    {
      num: "07",
      name: "Roadshow Transportation",
      desc: "Multi-stop investor roadshows handled seamlessly, city to city.",
      id: "1486406146926-c627a92ad1ab",
      icon: IC.bus,
    },
    {
      num: "08",
      name: "Leisure Transportation",
      desc: "Nights out, tours and special occasions, all in effortless style.",
      id: "1514525253161-7a46d19cd819",
      icon: IC.sparkle,
    },
    {
      num: "09",
      name: "Cruise Ships Terminal",
      desc: "Door-to-pier service to Cape Liberty, Brooklyn & Manhattan.",
      id: "1599640842225-85d111c60e6b",
      icon: IC.ship,
    },
    {
      num: "10",
      name: "Funeral Transportation",
      desc: "Dignified, compassionate group transportation for families.",
      id: "1469371670807-013ccf25f16a",
      icon: IC.candle,
    },
    {
      num: "11",
      name: "Group Transportation",
      desc: "Sprinters and vans for teams, weddings, tours and events.",
      id: "1529156069898-49953e39b3ac",
      icon: IC.group,
    },
    {
      num: "12",
      name: "Hotel Transportation",
      desc: "Seamless hotel transfers and concierge rides across CT, NY & NJ.",
      id: "1566073771259-6a8506099945",
      icon: IC.hotel,
    },
  ];

  console.log("SCRIPT RUNNING");

var servicesGrid = $("#servicesGrid");

if (servicesGrid) {
  services.forEach(function (s) {

    var col = el("div", "col-sm-6 col-lg-3");

    col.innerHTML =
      '<div class="svc-card">' +

        '<div class="svc-media">' +

          '<img src="' +
            img(s.id, 700) +
          '" alt="' +
            s.name +
          '" loading="lazy">' +

          '<span class="svc-num serif">' +
            s.num +
          '</span>' +

          '<span class="svc-icon">' +
            s.icon +
          '</span>' +

        '</div>' +

        '<div class="svc-body">' +

          '<h3>' +
            s.name +
          '</h3>' +

          '<p>' +
            s.desc +
          '</p>' +

          '<div class="svc-actions">' +

            '<a href="#lead" class="svc-btn primary">' +
              'Book Now →' +
            '</a>' +

            '<a href="#fleet" class="svc-btn secondary">' +
              'View Fleet' +
            '</a>' +

          '</div>' +

        '</div>' +

      '</div>';

    // append AFTER innerHTML
    servicesGrid.appendChild(col);

  });
}


  /* =======================================================
     3. ROUND-TRIP ROUTES
     ======================================================= */
  var routes = [
    "Round-Trip Airport Limo Car Service CT to & from BDL and HVN",
    "Round-Trip Airport Limo Car Service to & from TEB and ISP",
    "Round-Trip Airport Limo Car Service to/from Hotels in CT, NY, NJ & PA",
    "Round-Trip Airport Limo Car Service to JFK, LGA, EWR & HPN",
    "Round-Trip Corporate Black Car Chauffeur Service across CT, NY & NJ",
    "Round-Trip Limo Car Service to Concerts \u2014 XFinity Center",
    "Round-Trip Limo Car Service for UBS Arena Events in NY, CT & NJ",
    "Round-Trip Limo Car Service to Cruise Terminals in NY, NJ & MA",
    "Round-Trip Limo Service to/from Country Clubs & Golf Courses in CT, NY & NJ",
    "Round-Trip Wine Tours Limo Car Service to/from CT, NY & NJ",
  ];
  var routesGrid = $("#routesGrid");
  if (routesGrid) {
    routes.forEach(function (r) {
      var col = el("div", "col-md-6");
      col.innerHTML =
        '<a href="#lead" class="route-card"><span class="route-ico">\u21C6</span><span class="route-text">' +
        r +
        "</span></a>";
      routesGrid.appendChild(col);
    });
  }

  /* =======================================================
     4. DIRECTORY — Destinations We Serve
     ======================================================= */
  var dirIcons = {
    plane:
      '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><path d="M2 16l20-7-6 12-3-4-4-1z"/></svg>',
    ship: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><path d="M3 16l9-3 9 3-2 4H5z"/><path d="M12 4v9"/></svg>',
    stadium:
      '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><ellipse cx="12" cy="12" rx="9" ry="5"/><path d="M7 12c0-2 2-3 5-3s5 1 5 3"/></svg>',
    pin: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><path d="M12 21s-7-6-7-11a7 7 0 0114 0c0 5-7 11-7 11z"/><circle cx="12" cy="10" r="2.3"/></svg>',
  };
  var directory = [
    {
      title: "Airports",
      icon: dirIcons.plane,
      items: [
        "JFK International",
        "LaGuardia (LGA)",
        "Newark (EWR)",
        "Westchester (HPN)",
        "Bradley Intl (BDL)",
        "Tweed-New Haven (HVN)",
        "Teterboro (TEB)",
        "Long Island (ISP)",
      ],
    },
    {
      title: "Cruise Terminals",
      icon: dirIcons.ship,
      items: [
        "Cape Liberty, Bayonne NJ",
        "Brooklyn Cruise Terminal",
        "Manhattan Cruise Terminal",
        "Black Falcon, Boston MA",
        "Port of New York/NJ",
        "Cape Cod, MA",
      ],
    },
    {
      title: "Stadiums & Arenas",
      icon: dirIcons.stadium,
      items: [
        "UBS Arena",
        "MetLife Stadium",
        "Yankee Stadium",
        "Citi Field",
        "Madison Square Garden",
        "XFinity Center",
      ],
    },
    {
      title: "Counties",
      icon: dirIcons.pin,
      items: [
        "Fairfield County, CT",
        "New Haven County, CT",
        "Hartford County, CT",
        "Westchester County, NY",
        "Litchfield County, CT",
        "Nassau County, NY",
      ],
    },
  ];
  var directoryGrid = $("#directoryGrid");
  if (directoryGrid) {
    directory.forEach(function (col) {
      var c = el("div", "col-6 col-lg-3");
      var links = col.items
        .map(function (it) {
          return '<a href="#"><span class="bullet">\u25B8</span>' + it + "</a>";
        })
        .join("");
      c.innerHTML =
        '<div class="dir-col">' +
        '<div class="head"><span class="ic">' +
        col.icon +
        "</span><h3>" +
        col.title +
        "</h3></div>" +
        '<div class="dir-links">' +
        links +
        "</div>" +
        "</div>";
      directoryGrid.appendChild(c);
    });
  }

  /* =======================================================
     5. TESTIMONIALS  (marquee, duplicated for seamless loop)
     ======================================================= */
  var testimonials = [
    {
      initial: "D",
      name: "Daniel R.",
      loc: "Greenwich, CT",
      quote:
        "Flawless 4 AM airport pickup \u2014 the chauffeur was waiting, the car was spotless. Book N Ride is the only service I trust for my JFK runs.",
    },
    {
      initial: "P",
      name: "Priya & Marcus",
      loc: "Stamford, CT",
      quote:
        "We booked a Sprinter for our wedding party. On time, immaculate, and the chauffeur went above and beyond for us all night.",
    },
    {
      initial: "K",
      name: "Karen L.",
      loc: "Corporate Travel Manager",
      quote:
        "Our firm uses Book N Ride for every client roadshow. Punctual, professional, and perfectly invisible when it needs to be.",
    },
    {
      initial: "S",
      name: "Sophia M.",
      loc: "Westport, CT",
      quote:
        "Booked a last-minute SUV to LaGuardia and they still arrived 15 minutes early. Absolute lifesavers \u2014 highly recommended.",
    },
    {
      initial: "A",
      name: "The Alvarez Family",
      loc: "Norwalk, CT",
      quote:
        "Our prom night was perfect \u2014 the kids felt like celebrities and we parents felt completely at ease the whole evening.",
    },
    {
      initial: "R",
      name: "Robert & Jean",
      loc: "Danbury, CT",
      quote:
        "Cruise terminal drop-off in Bayonne was smooth and stress-free. We will be booking every single sailing with them.",
    },
    {
      initial: "T",
      name: "Thomas K.",
      loc: "New Haven, CT",
      quote:
        "Monthly casino runs to Mohegan Sun are always comfortable, always on time, and always a fair flat rate. First class.",
    },
    {
      initial: "A",
      name: "Aisha R.",
      loc: "Hartford, CT",
      quote:
        "From Bradley to our hotel the chauffeur was professional and the car immaculate. Easily five stars, every time.",
    },
  ];
  var marquee = $("#marquee");
  if (marquee) {
    testimonials.concat(testimonials).forEach(function (t) {
      var card = el("div", "tcard");
      card.innerHTML =
        '<div class="tstars">\u2605\u2605\u2605\u2605\u2605</div>' +
        '<p class="tquote">' +
        t.quote +
        "</p>" +
        '<div class="tfoot"><div class="tavatar serif">' +
        t.initial +
        "</div>" +
        '<div><div class="tname">' +
        t.name +
        '</div><div class="tloc">' +
        t.loc +
        "</div></div></div>";
      marquee.appendChild(card);
    });
  }

  /* =======================================================
     6. LEAD FORM  — validation, submit, summary, reset
     ======================================================= */
  var form = $("#leadForm");
  var success = $("#leadSuccess");
  var required = [
    "name",
    "phone",
    "email",
    "vehicle",
    "pickup",
    "dropoff",
    "date",
    "time",
    "passengers",
  ];

  function fieldWrap(input) {
    return input.closest(".field");
  }

  if (form) {
    // clear error as the user edits
    form.querySelectorAll("input,select,textarea").forEach(function (inp) {
      inp.addEventListener("input", function () {
        fieldWrap(inp).classList.remove("invalid");
      });
      inp.addEventListener("change", function () {
        fieldWrap(inp).classList.remove("invalid");
      });
    });

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var data = {};
      var ok = true;
      required.forEach(function (name) {
        var inp = form.elements[name];
        data[name] = (inp.value || "").trim();
        var valid = !!data[name];
        if (name === "email" && data[name])
          valid = /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(data[name]);
        if (name === "phone" && data[name])
          valid = data[name].replace(/\D/g, "").length >= 10;
        if (!valid) {
          fieldWrap(inp).classList.add("invalid");
          ok = false;
        }
      });
      data.special = (form.elements["special"].value || "").trim();
      if (!ok) {
        var firstBad = form.querySelector(".field.invalid");
        if (firstBad) firstBad.scrollIntoView ? null : null; // avoid scrollIntoView per guidelines
        return;
      }

      // build summary
      var rows = [
        ["Name", data.name],
        ["Phone", data.phone],
        ["Email", data.email],
        ["Vehicle", data.vehicle],
        [
          "Route",
          (data.pickup || "\u2014") + "  \u2192  " + (data.dropoff || "\u2014"),
        ],
        ["When", [data.date, data.time].filter(Boolean).join("  \u00B7  ")],
        ["Passengers", data.passengers],
      ];
      if (data.special) rows.push(["Special", data.special]);

      $("#successName").textContent = data.name;
      $("#summaryRows").innerHTML = rows
        .map(function (r) {
          return (
            '<div class="summary-row"><span class="k">' +
            r[0] +
            '</span><span class="v">' +
            r[1] +
            "</span></div>"
          );
        })
        .join("");

      form.style.display = "none";
      success.classList.add("show");
      // bring the card into view gently (page scroll, not scrollIntoView)
      window.scrollTo({
        top: Math.max(
          0,
          $("#lead").getBoundingClientRect().top + window.scrollY - 100,
        ),
        behavior: "smooth",
      });
    });

    $("#resetForm").addEventListener("click", function () {
      form.reset();
      form.querySelectorAll(".field.invalid").forEach(function (f) {
        f.classList.remove("invalid");
      });
      success.classList.remove("show");
      form.style.display = "";
    });
  }

  /* =======================================================
     7. CHAT WIDGET
     ======================================================= */
  var chatPanel = $("#chatPanel");
  var chatBody = $("#chatBody");
  var chatInput = $("#chatInput");
  var fabLabel = $("#chatFabLabel");
  var AGENT_REPLY =
    "Thanks for reaching out! A live chauffeur-desk agent will be right with you. For an instant price, tap \u2018Get a Free Quote\u2019 above or call 1 (800) 475-9975 \u2014 we're available 24/7.";

  function addMsg(text, who) {
    var row = el("div", "msg-row " + who);
    row.innerHTML = '<div class="bubble ' + who + '"></div>';
    row.querySelector(".bubble").textContent = text;
    chatBody.appendChild(row);
    chatBody.scrollTop = chatBody.scrollHeight;
  }
  if (chatBody) {
    addMsg(
      "Hi there! \uD83D\uDC4B Welcome to Book N Ride. How can we help you ride in style today?",
      "agent",
    );
  }
  function sendText(text) {
    var t = (text || "").trim();
    if (!t) return;
    addMsg(t, "user");
    chatInput.value = "";
    setTimeout(function () {
      addMsg(AGENT_REPLY, "agent");
    }, 500);
  }
  function toggleChat() {
    var open = chatPanel.classList.toggle("open");
    fabLabel.textContent = open ? "Close chat" : "Chat with us";
  }
  if ($("#chatFab")) $("#chatFab").addEventListener("click", toggleChat);
  if ($("#chatClose")) $("#chatClose").addEventListener("click", toggleChat);
  if ($("#chatSend"))
    $("#chatSend").addEventListener("click", function () {
      sendText(chatInput.value);
    });
  if (chatInput)
    chatInput.addEventListener("keydown", function (e) {
      if (e.key === "Enter") {
        e.preventDefault();
        sendText(chatInput.value);
      }
    });
  document.querySelectorAll(".chat-chip").forEach(function (chip) {
    chip.addEventListener("click", function () {
      sendText(chip.textContent);
    });
  });

  /* =======================================================
     8. IMAGE FALLBACK — degrade gracefully if a stock photo 404s
     ======================================================= */
  document.addEventListener(
    "error",
    function (e) {
      var t = e.target;
      if (t && t.tagName === "IMG") {
        t.style.opacity = "0";
        var media = t.closest(".fleet-media, .svc-media");
        if (media)
          media.style.background =
            "radial-gradient(420px 200px at 50% 130%,rgba(245,197,66,0.16),transparent 70%),#0e0e11";
      }
    },
    true,
  );

  /* =======================================================
     9. MISC
     ======================================================= */
  var yEl = $("#year");
  if (yEl) yEl.textContent = new Date().getFullYear();
})();
