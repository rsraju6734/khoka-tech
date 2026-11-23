/* KHOKA TECH demo kit — shared behaviour for the five demo websites.
   <body data-demo="Restaurant · The Urban Plate"> shows the KHOKA demo bar.
   Provides: Kit.toast(), mobile navigation, scroll reveal, demo forms, current year.
   Nothing here sends data anywhere. */
window.Kit = (function () {
  "use strict";
  const $ = (s, r = document) => r.querySelector(s), $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const framed = (() => { try { return window.self !== window.top; } catch (e) { return true; } })();
  if (framed) document.documentElement.classList.add("kt-framed");

  /* toast */
  let toastEl;
  function toast(msg, ms = 2800) {
    if (!toastEl) { toastEl = document.createElement("div"); toastEl.className = "kit-toast"; toastEl.setAttribute("role", "status"); toastEl.setAttribute("aria-live", "polite"); document.body.appendChild(toastEl); }
    toastEl.textContent = msg; toastEl.classList.add("show");
    clearTimeout(toast.t); toast.t = setTimeout(() => toastEl.classList.remove("show"), ms);
  }

  /* KHOKA demo bar — links back to the KHOKA TECH website (two folders up) */
  function demoBar() {
    const label = document.body.dataset.demo; if (!label || framed) return;
    const root = document.body.dataset.root || "../../";
    const bar = document.createElement("div");
    bar.className = "kt-demo-bar"; bar.setAttribute("role", "region"); bar.setAttribute("aria-label", "KHOKA TECH demo notice");
    bar.innerHTML = `<a class="l" href="${root}index.html#work"><i aria-hidden="true">K</i>KHOKA TECH demo</a>
      <span class="m">${label} — a sample website with fictional business details. Forms and checkout run in demo mode.</span>
      <span class="r"><a class="hide-sm" href="${root}index.html#work">All projects</a><a class="cta" href="${root}index.html#contact">Build one like this</a></span>`;
    document.body.prepend(bar);
  }

  /* mobile navigation: [data-nav-toggle] controls #nav (class .open) */
  function nav() {
    const btn = $("[data-nav-toggle]"), menu = $("#nav"); if (!btn || !menu) return;
    const set = o => { menu.classList.toggle("open", o); btn.setAttribute("aria-expanded", o); document.body.classList.toggle("nav-open", o); };
    btn.addEventListener("click", () => set(!menu.classList.contains("open")));
    menu.addEventListener("click", e => { if (e.target.closest("a")) set(false); });
    document.addEventListener("keydown", e => { if (e.key === "Escape" && menu.classList.contains("open")) { set(false); btn.focus(); } });
    window.addEventListener("resize", () => { if (innerWidth > 980) set(false); });
  }

  /* scroll reveal */
  function reveal(root = document) {
    const els = $$(".rv:not(.in)", root);
    if (!("IntersectionObserver" in window) || matchMedia("(prefers-reduced-motion: reduce)").matches) { els.forEach(e => e.classList.add("in")); return; }
    const io = new IntersectionObserver(es => es.forEach(x => { if (x.isIntersecting) { x.target.classList.add("in"); io.unobserve(x.target); } }), { rootMargin: "0px 0px -40px 0px" });
    els.forEach(e => io.observe(e));
  }

  /* demo forms: <form data-demo-form data-success="…">, fields wrapped in .field with a .f-err */
  const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
  function check(el) {
    if (el.type === "checkbox") return el.required && !el.checked ? (el.dataset.msg || "Please tick this box.") : "";
    const v = el.value.trim();
    if (el.required && !v) return el.dataset.msg || "This field is required.";
    if (!v) return "";
    if (el.type === "email" && !EMAIL.test(v)) return "Enter a valid email address.";
    if (el.type === "tel" && !/^\+?\d{7,15}$/.test(v.replace(/[\s()-]/g, ""))) return "Enter a valid phone number.";
    if (el.type === "date" && el.min && v < el.min) return "Please choose a date from today onwards.";
    if (el.type === "number") { const n = +v; if ((el.min !== "" && n < +el.min) || (el.max !== "" && n > +el.max)) return `Enter a number between ${el.min} and ${el.max}.`; }
    if (el.minLength > 0 && v.length < el.minLength) return `Please write at least ${el.minLength} characters.`;
    return "";
  }
  function mark(el, m) { el.setAttribute("aria-invalid", m ? "true" : "false"); const e = el.closest(".field")?.querySelector(".f-err"); if (e) e.textContent = m; }
  function validate(form) {
    let first = null;
    $$("input,select,textarea", form).forEach(el => { if (el.type === "hidden" || el.disabled) return; const m = check(el); mark(el, m); if (m && !first) first = el; });
    if (first) first.focus();
    return !first;
  }
  function forms() {
    $$("form[data-demo-form]").forEach(form => {
      form.setAttribute("novalidate", "");
      form.addEventListener("input", e => { if (e.target.getAttribute("aria-invalid") === "true") mark(e.target, check(e.target)); });
      form.addEventListener("submit", e => {
        e.preventDefault();
        const st = $(".f-status", form);
        if (!validate(form)) { if (st) st.hidden = true; return; }
        const msg = (form.dataset.success || "Thank you.") + " (Demo website: nothing was sent.)";
        if (st) { st.textContent = msg; st.hidden = false; } else toast(msg);
        form.reset(); $$("[aria-invalid]", form).forEach(el => el.setAttribute("aria-invalid", "false"));
        form.dispatchEvent(new CustomEvent("demo:submitted"));
      });
    });
  }

  /* placeholders: minimum date for date inputs, current year */
  function misc() {
    const t = new Date(); t.setMinutes(t.getMinutes() - t.getTimezoneOffset());
    $$('input[type="date"][data-min-today]').forEach(i => { i.min = t.toISOString().slice(0, 10); });
    $$("[data-year]").forEach(e => { e.textContent = new Date().getFullYear(); });
  }

  const money = n => "৳" + Number(n).toLocaleString("en-IN");
  function init() { demoBar(); nav(); reveal(); forms(); misc(); }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init); else init();
  return { toast, reveal, validate, check, mark, money, $, $$ };
})();
