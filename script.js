/* ==========================================================================
   script.js
   Small, dependency-free helpers for the site.
   - Mobile navigation toggle (accessible)
   - Auto-close nav on link click, Escape, or outside click
   - Contact form: client-side validation + graceful fallback
   - Auto-update footer year
   ========================================================================== */

(function () {
  "use strict";

  /* ----------------------------------------------------------------------
     1. Mobile navigation
     ---------------------------------------------------------------------- */

  var navToggle = document.querySelector(".nav-toggle");
  var nav = document.querySelector("#primary-nav");

  function openNav() {
    if (!nav || !navToggle) return;
    nav.classList.add("is-open");
    navToggle.setAttribute("aria-expanded", "true");
  }

  function closeNav() {
    if (!nav || !navToggle) return;
    nav.classList.remove("is-open");
    navToggle.setAttribute("aria-expanded", "false");
  }

  function toggleNav() {
    if (!nav) return;
    if (nav.classList.contains("is-open")) {
      closeNav();
    } else {
      openNav();
    }
  }

  if (navToggle && nav) {
    navToggle.addEventListener("click", function (event) {
      event.stopPropagation();
      toggleNav();
    });

    // Close when a nav link is clicked (so the menu doesn't stay open
    // after navigating to a new page).
    nav.addEventListener("click", function (event) {
      var target = event.target;
      if (target && target.tagName === "A") {
        closeNav();
      }
    });

    // Close on Escape key.
    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape" && nav.classList.contains("is-open")) {
        closeNav();
        navToggle.focus();
      }
    });

    // Close when clicking outside the nav.
    document.addEventListener("click", function (event) {
      if (!nav.classList.contains("is-open")) return;
      if (nav.contains(event.target) || navToggle.contains(event.target)) return;
      closeNav();
    });

    // Reset state if the viewport is resized above the mobile breakpoint.
    var mobileQuery = window.matchMedia("(min-width: 721px)");
    var handleResize = function (event) {
      if (event.matches) closeNav();
    };
    if (mobileQuery.addEventListener) {
      mobileQuery.addEventListener("change", handleResize);
    } else if (mobileQuery.addListener) {
      // Safari < 14 fallback
      mobileQuery.addListener(handleResize);
    }
  }

  /* ----------------------------------------------------------------------
     2. Contact form
     ---------------------------------------------------------------------- */

  var form = document.querySelector(".form");

  if (form) {
    form.addEventListener("submit", function (event) {
      var name = form.querySelector("#name");
      var email = form.querySelector("#email");
      var message = form.querySelector("#message");
      var status = form.querySelector(".form-status");

      var errors = [];

      if (name && name.value.trim().length < 2) {
        errors.push("Please enter your name.");
      }

      if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim())) {
        errors.push("Please enter a valid email address.");
      }

      if (message && message.value.trim().length < 10) {
        errors.push("Please write a message of at least 10 characters.");
      }

      if (errors.length > 0) {
        event.preventDefault();
        if (status) {
          status.textContent = errors.join(" ");
          status.hidden = false;
          status.style.color = "#b42318";
        }
        return;
      }

      // If the form has no real action (static hosting), fall back to mailto.
      var action = form.getAttribute("action");
      if (!action || action === "#" || action === "") {
        event.preventDefault();
        var to = form.getAttribute("data-mailto") || "hello@example.com";
        var subject = encodeURIComponent("Website enquiry from " + (name ? name.value : ""));
        var body = encodeURIComponent(
          "Name: " + (name ? name.value : "") + "\n" +
          "Email: " + (email ? email.value : "") + "\n\n" +
          (message ? message.value : "")
        );
        window.location.href = "mailto:" + to + "?subject=" + subject + "&body=" + body;
        if (status) {
          status.textContent = "Opening your email client…";
          status.hidden = false;
          status.style.color = "#2f5d50";
        }
      }
    });
  }

  /* ----------------------------------------------------------------------
     3. Footer year
     ---------------------------------------------------------------------- */

  var yearEls = document.querySelectorAll("[data-year]");
  if (yearEls.length) {
    var year = new Date().getFullYear();
    yearEls.forEach(function (el) {
      el.textContent = year;
    });
  }
})();
function openContactModal() {
    document.getElementById('contactModal').style.display = 'flex';
}

function closeContactModal() {
    document.getElementById('contactModal').style.display = 'none';
}

// إغلاق النافذة عند الضغط خارج المربع
window.addEventListener('click', function(e) {
    const contactModal = document.getElementById('contactModal');
    if (e.target === contactModal) {
        closeContactModal();
    }
});

