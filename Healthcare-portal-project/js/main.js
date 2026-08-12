/* ============================================
   MAIN.JS — Shared utilities
   Nav toggle, active links, dark/light theme
   ============================================ */

(function () {
  "use strict";

  /* ── Theme ── */
  const THEME_KEY = "hc-theme";
  const html = document.documentElement;

  function applyTheme(theme) {
    html.setAttribute("data-theme", theme);
    // update toggle icon
    const icon = document.querySelector(".theme-icon");
    if (icon) icon.textContent = theme === "dark" ? "☀️" : "🌙";
  }

  function initTheme() {
    const saved = localStorage.getItem(THEME_KEY);
    const preferred = window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
    applyTheme(saved || preferred);
  }

  function toggleTheme() {
    const current = html.getAttribute("data-theme") || "light";
    const next = current === "dark" ? "light" : "dark";
    localStorage.setItem(THEME_KEY, next);
    applyTheme(next);
  }

  /* ── Nav scroll shadow ── */
  function initNavScroll() {
    const navbar = document.querySelector(".navbar");
    if (!navbar) return;
    const handler = () =>
      navbar.classList.toggle("scrolled", window.scrollY > 10);
    window.addEventListener("scroll", handler, { passive: true });
    handler();
  }

  /* ── Mobile hamburger ── */
  function initHamburger() {
    const btn = document.getElementById("hamburger");
    const mobileNav = document.getElementById("mobileNav");
    if (!btn || !mobileNav) return;

    btn.addEventListener("click", () => {
      const open = btn.classList.toggle("open");
      mobileNav.classList.toggle("open", open);
      btn.setAttribute("aria-expanded", open);
      document.body.style.overflow = open ? "hidden" : "";
    });

    // close on link click
    mobileNav.querySelectorAll("a").forEach((a) =>
      a.addEventListener("click", () => {
        btn.classList.remove("open");
        mobileNav.classList.remove("open");
        btn.setAttribute("aria-expanded", false);
        document.body.style.overflow = "";
      }),
    );

    // close on outside click
    document.addEventListener("click", (e) => {
      if (!btn.contains(e.target) && !mobileNav.contains(e.target)) {
        btn.classList.remove("open");
        mobileNav.classList.remove("open");
        document.body.style.overflow = "";
      }
    });
  }

  /* ── Active nav link ── */
  function initActiveLink() {
    const current = window.location.pathname.split("/").pop() || "index.html";
    document.querySelectorAll(".nav-links a, .mobile-nav a").forEach((a) => {
      const href = a.getAttribute("href");
      if (href === current || (current === "" && href === "index.html")) {
        a.classList.add("active");
      }
    });
  }

  /* ── Scroll reveal ── */
  function initScrollReveal() {
    const els = document.querySelectorAll(".reveal");
    if (!els.length) return;

    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("visible");
            observer.unobserve(e.target);
          }
        }),
      { threshold: 0.12 },
    );
    els.forEach((el) => observer.observe(el));
  }

  /* ── Counter animation ── */
  function animateCounter(el) {
    const target = parseInt(el.dataset.target, 10);
    const duration = 1800;
    const step = 16;
    const increment = target / (duration / step);
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        current = target;
        clearInterval(timer);
      }
      el.textContent = Math.floor(current).toLocaleString();
    }, step);
  }

  function initCounters() {
    const counters = document.querySelectorAll("[data-target]");
    if (!counters.length) return;

    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            animateCounter(e.target);
            observer.unobserve(e.target);
          }
        }),
      { threshold: 0.5 },
    );
    counters.forEach((c) => observer.observe(c));
  }

  /* ── Smooth back-to-top ── */
  function initBackToTop() {
    const btn = document.getElementById("backToTop");
    if (!btn) return;
    window.addEventListener(
      "scroll",
      () => {
        btn.classList.toggle("visible", window.scrollY > 400);
      },
      { passive: true },
    );
    btn.addEventListener("click", () =>
      window.scrollTo({ top: 0, behavior: "smooth" }),
    );
  }

  /* ── Init all ── */
  function init() {
    initTheme();
    initNavScroll();
    initHamburger();
    initActiveLink();
    initScrollReveal();
    initCounters();
    initBackToTop();

    // theme toggle button
    const themeBtn = document.getElementById("themeToggle");
    if (themeBtn) themeBtn.addEventListener("click", toggleTheme);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
