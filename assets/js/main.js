/* Portfolio — vanilla JS. No dependencies. */
(function () {
  "use strict";
  var root = document.documentElement;
  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- Footer year ---------- */
  var yr = document.getElementById("year");
  if (yr) yr.textContent = new Date().getFullYear();

  /* ---------- Theme (persisted; honours OS default first load) ---------- */
  var toggle = document.getElementById("theme-toggle");
  function applyTheme(t) {
    root.setAttribute("data-theme", t);
    if (toggle) toggle.setAttribute("aria-pressed", t === "light" ? "true" : "false");
    var meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.setAttribute("content", t === "light" ? "#ffffff" : "#0a0f1a");
  }
  var saved = null;
  try { saved = localStorage.getItem("theme"); } catch (e) {}
  // Default to dark when the visitor has no saved preference; their toggle choice persists.
  applyTheme(saved === "light" || saved === "dark" ? saved : "dark");
  if (toggle) {
    toggle.addEventListener("click", function () {
      var next = root.getAttribute("data-theme") === "light" ? "dark" : "light";
      applyTheme(next);
      try { localStorage.setItem("theme", next); } catch (e) {}
    });
  }

  /* ---------- Mobile menu ---------- */
  var burger = document.getElementById("burger");
  var menu = document.getElementById("menu");
  function closeMenu() {
    if (!menu) return;
    menu.classList.remove("open");
    if (burger) { burger.setAttribute("aria-expanded", "false"); burger.setAttribute("aria-label", "Open menu"); }
  }
  if (burger && menu) {
    burger.addEventListener("click", function () {
      var open = menu.classList.toggle("open");
      burger.setAttribute("aria-expanded", open ? "true" : "false");
      burger.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    });
    menu.addEventListener("click", function (e) { if (e.target.tagName === "A") closeMenu(); });
    document.addEventListener("keydown", function (e) { if (e.key === "Escape") closeMenu(); });
  }

  /* ---------- Reveal on scroll ---------- */
  var revealEls = document.querySelectorAll(".reveal");
  if (reduceMotion || !("IntersectionObserver" in window)) {
    revealEls.forEach(function (el) { el.classList.add("in"); });
  } else {
    var revObs = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add("in"); revObs.unobserve(en.target); }
      });
    }, { rootMargin: "0px 0px -8% 0px", threshold: 0.08 });
    revealEls.forEach(function (el) { revObs.observe(el); });
  }

  /* ---------- Scroll-spy: highlight active nav link ---------- */
  var links = Array.prototype.slice.call(document.querySelectorAll('.nav__links a[href^="#"]'));
  var byId = {};
  links.forEach(function (a) { byId[a.getAttribute("href").slice(1)] = a; });
  function setActive(id) {
    links.forEach(function (a) { a.classList.remove("is-active"); a.removeAttribute("aria-current"); });
    if (byId[id]) { byId[id].classList.add("is-active"); byId[id].setAttribute("aria-current", "true"); }
  }
  // observe real content sections (not the header target #top)
  var sections = links
    .map(function (a) { return a.getAttribute("href").slice(1); })
    .filter(function (id) { return id !== "top"; })
    .map(function (id) { return document.getElementById(id); })
    .filter(Boolean);
  if ("IntersectionObserver" in window && sections.length) {
    var spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) { if (en.isIntersecting) setActive(en.target.id); });
    }, { rootMargin: "-45% 0px -50% 0px", threshold: 0 });
    sections.forEach(function (s) { spy.observe(s); });
  }
  // Near the top, "Home" is active
  function topGuard() { if (window.scrollY < 240) setActive("top"); }
  window.addEventListener("scroll", topGuard, { passive: true });
  topGuard();

  /* ---------- Video: click-to-load (no autoplay until opt-in) ---------- */
  var frame = document.getElementById("video-embed");
  if (frame) {
    var playBtn = frame.querySelector(".video__play");
    if (playBtn) {
      playBtn.addEventListener("click", function () {
        var yt = frame.getAttribute("data-yt");
        var mp4 = frame.getAttribute("data-mp4");
        var title = frame.getAttribute("data-title") || "Introduction video";
        var el;
        if (mp4) {
          el = document.createElement("video");
          el.setAttribute("controls", "");
          el.setAttribute("autoplay", "");
          el.setAttribute("playsinline", "");
          el.setAttribute("preload", "metadata");
          el.src = mp4;
        } else if (yt && yt !== "REPLACE_WITH_YOUTUBE_ID") {
          el = document.createElement("iframe");
          el.src = "https://www.youtube-nocookie.com/embed/" + encodeURIComponent(yt) + "?autoplay=1&rel=0";
          el.title = title;
          el.setAttribute("allow", "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture");
          el.setAttribute("allowfullscreen", "");
          el.setAttribute("loading", "lazy");
        } else {
          playBtn.querySelector(".video__hint").textContent = "Add your video: set data-yt or data-mp4 in index.html";
          return;
        }
        frame.innerHTML = "";
        frame.appendChild(el);
      });
    }
  }
})();
