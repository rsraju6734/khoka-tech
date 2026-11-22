/* KHOKA TEMPLATES — shared behaviour for the live demo sites.
   <body data-template="business" data-name="Nexora Business"> drives the KHOKA demo bar.
   Features: demo bar, mobile nav, scroll reveal, filters/tabs, counters, accordions, demo-only forms. */
(function () {
  "use strict";
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const framed = (() => { try { return window.self !== window.top; } catch (e) { return true; } })();
  const reduce = window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches;

  const BAR = {
    en: { live: "Live demo", note: "Sample content for preview", details: "Details", order: "Order this template" },
    bn: { live: "লাইভ ডেমো", note: "প্রিভিউয়ের জন্য নমুনা কনটেন্ট", details: "বিস্তারিত", order: "এই টেমপ্লেট অর্ডার করুন" },
    hi: { live: "लाइव डेमो", note: "प्रीव्यू के लिए नमूना सामग्री", details: "विवरण", order: "यह टेम्पलेट ऑर्डर करें" }
  };
  let lang = "en"; try { lang = localStorage.getItem("lang") || "en"; } catch (e) { /* ignore */ }
  const T = BAR[lang] || BAR.en;

  /* 1. KHOKA demo bar (not shown inside the marketplace preview iframe) */
  const id = document.body.dataset.template, name = document.body.dataset.name || "";
  if (framed) document.documentElement.classList.add("kt-framed");
  else if (id) {
    const bar = document.createElement("div");
    bar.className = "kt-bar"; bar.setAttribute("role", "region"); bar.setAttribute("aria-label", "KHOKA TEMPLATES demo bar");
    bar.innerHTML =
      '<a class="kt-brand" href="../index.html"><i aria-hidden="true">K</i>KHOKA TEMPLATES</a>' +
      '<span class="kt-mid">' + T.live + ": " + name + " · " + T.note + "</span>" +
      '<span class="kt-actions"><a class="kt-back" href="../details.html?id=' + id + '">← <span>' + T.details + "</span></a>" +
      '<a class="kt-buy" href="../details.html?id=' + id + '&amp;order=1">' + T.order + "</a></span>";
    document.body.prepend(bar);
  }

  /* 2. Mobile navigation */
  const toggle = $("[data-nav-toggle]"), links = $("#nav-links");
  if (toggle && links) {
    toggle.addEventListener("click", () => { const o = links.classList.toggle("open"); toggle.setAttribute("aria-expanded", o); });
    links.addEventListener("click", e => { if (e.target.closest("a")) { links.classList.remove("open"); toggle.setAttribute("aria-expanded", "false"); } });
    document.addEventListener("keydown", e => { if (e.key === "Escape" && links.classList.contains("open")) { links.classList.remove("open"); toggle.setAttribute("aria-expanded", "false"); toggle.focus(); } });
  }

  /* 3. Scroll reveal */
  const rev = $$(".reveal");
  if ("IntersectionObserver" in window && !reduce) {
    const io = new IntersectionObserver(es => es.forEach(en => { if (en.isIntersecting) { en.target.classList.add("in"); io.unobserve(en.target); } }), { threshold: .12, rootMargin: "0px 0px -40px 0px" });
    rev.forEach(el => io.observe(el));
  } else rev.forEach(el => el.classList.add("in"));

  /* 4. Filters / tabs: <div data-filters="#target"><button data-filter="all">…</button></div>, items carry data-cat="a b" */
  $$("[data-filters]").forEach(group => {
    const target = $(group.dataset.filters); if (!target) return;
    group.addEventListener("click", e => {
      const b = e.target.closest("[data-filter]"); if (!b) return;
      const f = b.dataset.filter;
      $$("[data-filter]", group).forEach(x => { const on = x === b; x.classList.toggle("active", on); x.setAttribute(x.getAttribute("role") === "tab" ? "aria-selected" : "aria-pressed", on); });
      let shown = 0;
      $$("[data-cat]", target).forEach(it => { const ok = f === "all" || it.dataset.cat.split(" ").includes(f); it.hidden = !ok; if (ok) shown++; });
      const empty = $("[data-empty]", target.parentElement); if (empty) empty.hidden = shown > 0;
    });
  });

  /* 5. Count-up numbers: <span data-count="250" data-suffix="+">0</span> */
  const counters = $$("[data-count]");
  const run = el => {
    const end = +el.dataset.count, suf = el.dataset.suffix || "", dur = 1400, t0 = performance.now();
    const step = now => { const p = Math.min(1, (now - t0) / dur), v = Math.round(end * (1 - Math.pow(1 - p, 3))); el.textContent = v.toLocaleString() + suf; if (p < 1) requestAnimationFrame(step); };
    requestAnimationFrame(step);
  };
  if ("IntersectionObserver" in window && !reduce) {
    const io2 = new IntersectionObserver(es => es.forEach(en => { if (en.isIntersecting) { run(en.target); io2.unobserve(en.target); } }), { threshold: .6 });
    counters.forEach(c => io2.observe(c));
  } else counters.forEach(c => { c.textContent = (+c.dataset.count).toLocaleString() + (c.dataset.suffix || ""); });

  /* 6. Accordions: <button data-acc aria-expanded="false" aria-controls="x"> */
  document.addEventListener("click", e => {
    const b = e.target.closest("[data-acc]"); if (!b) return;
    const open = b.getAttribute("aria-expanded") !== "true";
    b.setAttribute("aria-expanded", open);
    const p = document.getElementById(b.getAttribute("aria-controls")); if (p) p.hidden = !open;
  });

  /* 7. Demo-only forms: validate, then show an honest status message. Nothing is sent. */
  const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
  $$("form[data-demo-form]").forEach(form => {
    form.setAttribute("novalidate", "");
    const status = $(".form-status", form);
    const check = el => {
      const v = (el.type === "checkbox" ? (el.checked ? "1" : "") : el.value.trim());
      if (el.required && !v) return el.dataset.msg || "This field is required.";
      if (v && el.type === "email" && !EMAIL.test(v)) return "Please enter a valid email address.";
      if (v && el.type === "tel" && !/^\+?\d{7,15}$/.test(v.replace(/[\s()-]/g, ""))) return "Please enter a valid phone number.";
      if (v && el.type === "date" && el.min && v < el.min) return "Please choose a future date.";
      if (v && el.type === "number") { const n = +v; if ((el.min && n < +el.min) || (el.max && n > +el.max)) return "Please enter a value between " + el.min + " and " + el.max + "."; }
      return "";
    };
    const mark = (el, m) => { el.setAttribute("aria-invalid", m ? "true" : "false"); const er = el.closest(".field")?.querySelector(".field-error"); if (er) er.textContent = m; };
    form.addEventListener("input", e => { if (e.target.getAttribute("aria-invalid") === "true") mark(e.target, check(e.target)); });
    form.addEventListener("submit", e => {
      e.preventDefault();
      let first = null;
      $$("input,select,textarea", form).forEach(el => { if (el.type === "hidden") return; const m = check(el); mark(el, m); if (m && !first) first = el; });
      if (first) { first.focus(); if (status) status.hidden = true; return; }
      if (status) {
        status.textContent = (form.dataset.success || "Thank you!") + " (Demo template: this form is not connected to a server, so nothing was sent.)";
        status.hidden = false;
      }
      form.reset();
      $$("[aria-invalid]", form).forEach(el => el.setAttribute("aria-invalid", "false"));
    });
  });

  /* 8. Current year */
  $$("[data-year]").forEach(el => { el.textContent = new Date().getFullYear(); });

  /* 9. Placeholder links (#) never jump to top */
  document.addEventListener("click", e => { const a = e.target.closest('a[href="#"]'); if (a) e.preventDefault(); });
})();
