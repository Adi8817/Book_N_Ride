/* =========================================================
   Book N Ride — chat.js
   Chat widget: FAB open/close · message send/receive
   Quick-reply chip handlers
   Loaded: Every page
   ========================================================= */
(function () {
  "use strict";

  var U = window.BNR && window.BNR.Utils;
  if (!U) { return; }

  U.onReady(function () {

    var chatPanel = U.qs("#chatPanel");
    var chatBody  = U.qs("#chatBody");
    var chatInput = U.qs("#chatInput");
    var chatFab   = U.qs("#chatFab");
    var fabLabel  = U.qs("#chatFabLabel");
    var chatClose = U.qs("#chatClose");
    var chatSend  = U.qs("#chatSend");

    /* Widget is optional — exit silently if not on page */
    if (!chatPanel || !chatBody) { return; }

    var AGENT_REPLY =
      "Thanks for reaching out! A live chauffeur-desk agent will be right with you. " +
      "For an instant price, tap \u2018Get a Free Quote\u2019 above or call " +
      "1\u00a0(800)\u00a0475\u20119975 \u2014 we\u2019re available 24/7.";

    /* --------------------------------------------------
       Add a message bubble to the chat body
    -------------------------------------------------- */
    function addMsg(text, who) {
      var row    = document.createElement("div");
      var bubble = document.createElement("div");
      row.className    = "msg-row " + who;
      bubble.className = "bubble " + who;
      bubble.textContent = text;
      row.appendChild(bubble);
      chatBody.appendChild(row);
      chatBody.scrollTop = chatBody.scrollHeight;
    }

    /* Opening greeting */
    addMsg(
      "Hi there! \uD83D\uDC4B Welcome to Book N Ride. How can we help you ride in style today?",
      "agent"
    );

    /* --------------------------------------------------
       Send a user message and trigger agent reply
    -------------------------------------------------- */
    function sendText(text) {
      var t = (text || "").trim();
      if (!t) { return; }
      addMsg(t, "user");
      if (chatInput) { chatInput.value = ""; }
      setTimeout(function () { addMsg(AGENT_REPLY, "agent"); }, 500);
    }

    /* --------------------------------------------------
       Toggle chat panel open / closed
    -------------------------------------------------- */
    function toggleChat() {
      var isOpen = chatPanel.classList.toggle("open");
      if (fabLabel) { fabLabel.textContent = isOpen ? "Close chat" : "Chat with us"; }
      if (chatFab)  { chatFab.setAttribute("aria-expanded", isOpen ? "true" : "false"); }
      if (isOpen && chatInput) { chatInput.focus(); }
    }

    if (chatFab)   { chatFab.addEventListener("click", toggleChat); }
    if (chatClose) { chatClose.addEventListener("click", toggleChat); }

    if (chatSend) {
      chatSend.addEventListener("click", function () {
        if (chatInput) { sendText(chatInput.value); }
      });
    }

    if (chatInput) {
      chatInput.addEventListener("keydown", function (e) {
        if (e.key === "Enter") {
          e.preventDefault();
          sendText(chatInput.value);
        }
      });
    }

    /* Quick-reply chips */
    U.qsa(".chat-chip").forEach(function (chip) {
      chip.addEventListener("click", function () {
        sendText(chip.textContent.trim());
      });
    });

  });

}());
