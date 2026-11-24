/* MONOLITH ARCHITECTURE — demo website by KHOKA TECH
   Blueprint intro, floating nav, GSAP ScrollTrigger storytelling, projects, services, counters.
   Works without GSAP (content stays visible) and respects prefers-reduced-motion.
   Nothing on this page sends data anywhere. */
(function () {
  "use strict";
  const $ = (s, r = document) => r.querySelector(s), $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const root = document.documentElement;
  const RM = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const G = !!(window.gsap && window.ScrollTrigger);
  const toast = m => (window.Kit ? Kit.toast(m, 3600) : alert(m));
  if (G) { gsap.registerPlugin(ScrollTrigger); ScrollTrigger.config({ ignoreMobileResize: true }); }

  /* ---------------- data (fictional projects) ---------------- */
  const PROJECTS = [
    { id: "dusk", name: "Dusk Pavilion", loc: "Gulshan, Dhaka", cat: "Residential", year: 2025, area: "610 m²", status: "Completed", img: "p-pavilion", w: 1400, h: 990,
      alt: "Single-storey concrete house lit warmly at dusk behind a planted forecourt",
      short: "A single-storey family house wrapped around a lantern-lit courtyard.",
      long: "A low concrete pavilion for a family of five. The street side is almost closed; inside, every room opens onto a planted courtyard that glows like a lantern after dark. Cast-in-place concrete, teak doors and a roof garden that keeps the house cool through the summer." },
    { id: "lawn", name: "Lawn House", loc: "Sylhet", cat: "Residential", year: 2024, area: "480 m²", status: "Completed", img: "p-lawn", w: 1400, h: 788,
      alt: "Modern two-storey house with large windows facing a wide green lawn",
      short: "Two cantilevered floors facing an open lawn and the tea hills beyond.",
      long: "Two long floors slide past each other to give every bedroom a view of the hills. The ground floor is fully glazed towards the lawn, with deep overhangs that shade the glass from the afternoon sun." },
    { id: "hill", name: "Hillside Retreat", loc: "Srimangal", cat: "Hospitality", year: 2026, area: "1,250 m²", status: "Under construction", img: "p-hillside", w: 1400, h: 934,
      alt: "Modern building set into a green hillside with flowers in the foreground",
      short: "Twelve guest suites stepping down a tea-estate slope.",
      long: "A small retreat of twelve suites built into the slope, so that the roofs become terraces for the rooms above. Local stone, rammed-earth walls and a rainwater system that supplies the whole property." },
    { id: "stone", name: "Stone Court", loc: "Chattogram", cat: "Renovation", year: 2023, area: "390 m²", status: "Completed", img: "p-stone", w: 1400, h: 933,
      alt: "Contemporary stone-clad house with large windows and a green lawn",
      short: "A 1990s house re-planned around a new stone-clad court.",
      long: "We kept the original structure, removed six internal walls and wrapped the house in locally quarried stone. A new double-height court now brings daylight to the centre of a once-dark plan." },
    { id: "timber", name: "Timber & Stone House", loc: "Purbachal, Dhaka", cat: "Residential", year: 2024, area: "520 m²", status: "Completed", img: "p-timber", w: 1400, h: 600,
      alt: "Modern house with a timber slat facade and stone accents",
      short: "A timber-screened family home with a private walled garden.",
      long: "Vertical timber slats filter light and views on the upper floor, while a heavy stone base anchors the house to its garden. Designed for natural cross-ventilation, with ceiling fans instead of air-conditioning in most rooms." },
    { id: "pergola", name: "Pergola Guest House", loc: "Cox's Bazar", cat: "Hospitality", year: 2022, area: "860 m²", status: "Completed", img: "p-pergola", w: 1400, h: 1103,
      alt: "White modern house shaded by a large slatted pergola roof",
      short: "A boutique guest house shaded by a thirty-metre timber pergola.",
      long: "A white, sea-facing guest house under one generous pergola. The slatted roof throws moving shadows across terraces and pool decks and cuts the heat on the facade by more than a third." }
  ];
  const QUOTE_TYPE = { Residential: "Residential architecture", Hospitality: "Construction", Renovation: "Renovation" };

  /* ---------------- layout: demo bar + floating nav ---------------- */
  let barH = 0;
  const hdr = $("#hdr");
  function measure() {
    const bar = $(".kt-demo-bar");
    barH = bar ? bar.offsetHeight : 0;
    root.style.setProperty("--bar", barH + "px");
    onScroll();
  }
  let ticking = false;
  function onScroll() {
    const y = window.scrollY;
    root.style.setProperty("--nav-top", Math.max(12, barH - y + 12) + "px");
    hdr.classList.toggle("scrolled", y > 40);
    activeSection();
    ticking = false;
  }
  window.addEventListener("scroll", () => { if (!ticking) { ticking = true; requestAnimationFrame(onScroll); } }, { passive: true });
  window.addEventListener("resize", () => { measure(); moveInd(); });

  /* active nav link + sliding indicator */
  const navLinks = $$("#nav a[data-sec]");
  const sections = navLinks.map(a => a.dataset.sec === "top" ? $("#home") : $("#" + a.dataset.sec));
  let current = "";
  function activeSection() {
    const line = innerHeight * 0.4;
    let id = "top";
    sections.forEach((s, i) => { if (s && s.getBoundingClientRect().top <= line) id = navLinks[i].dataset.sec; });
    if (id === current) return;
    current = id;
    navLinks.forEach(a => { const on = a.dataset.sec === id; a.classList.toggle("is-active", on); on ? a.setAttribute("aria-current", "true") : a.removeAttribute("aria-current"); });
    moveInd();
  }
  function moveInd() {
    const ind = $(".nav-ind"), a = $("#nav a.is-active");
    if (!ind) return;
    if (!a || innerWidth <= 980) { ind.style.opacity = 0; return; }
    ind.style.left = a.offsetLeft + "px"; ind.style.width = a.offsetWidth + "px"; ind.style.opacity = 1;
  }

  /* ---------------- quote links: pre-select the project type ---------------- */
  function quoteLinks() {
    document.addEventListener("click", e => {
      const a = e.target.closest("[data-quote]"); if (!a) return;
      const type = a.getAttribute("data-quote");
      const sel = $("#q-type");
      if (type && sel) { sel.value = type; sel.setAttribute("aria-invalid", "false"); const er = sel.closest(".field").querySelector(".f-err"); if (er) er.textContent = ""; }
      setTimeout(() => $("#q-name").focus({ preventScroll: true }), 900);
    });
  }

  /* ---------------- statement: split into words ---------------- */
  function splitWords() {
    $$("[data-words]").forEach(el => {
      const words = el.textContent.trim().split(/\s+/);
      el.innerHTML = words.map(w => `<span class="w">${w.replace(/&/g, "&amp;").replace(/</g, "&lt;")}</span>`).join(" ");
      el.classList.add("split");
      el.setAttribute("aria-label", words.join(" "));
    });
  }

  /* ---------------- projects ---------------- */
  function renderProjects() {
    const grid = $("#proj-grid");
    grid.innerHTML = PROJECTS.map(p => `
      <article class="pcard" data-cat="${p.cat}">
        <div class="ph" data-open="${p.id}"><span class="tag">${p.cat}</span><img src="img/${p.img}.webp" alt="${p.alt}" width="${p.w}" height="${p.h}" loading="lazy"></div>
        <div class="pcard-b">
          <p class="meta">${p.loc} · ${p.year}</p>
          <h3>${p.name}</h3>
          <button class="explore" type="button" data-open="${p.id}" aria-label="Explore project: ${p.name}">Explore project <i aria-hidden="true">→</i></button>
          <p>${p.short}</p>
        </div>
      </article>`).join("");

    $$(".chip").forEach(chip => chip.addEventListener("click", () => {
      const f = chip.dataset.filter;
      $$(".chip").forEach(c => { const on = c === chip; c.classList.toggle("is-on", on); c.setAttribute("aria-pressed", on); });
      let shown = 0;
      $$(".pcard").forEach(card => {
        const show = f === "all" || card.dataset.cat === f;
        card.classList.toggle("is-out", !show);
        if (show) {
          shown++;
          if (G) { gsap.set($(".ph", card), { clipPath: "inset(0% 0% 0% 0%)" }); gsap.set($("img", card), { scale: 1 }); }
          if (G && !RM) gsap.fromTo(card, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: .7, ease: "power3.out", delay: shown * .06, clearProps: "opacity,transform" });
        }
      });
      $("#proj-empty").hidden = shown > 0;
      if (G) ScrollTrigger.refresh();
    }));

    const dlg = $("#pdlg");
    let lastFocus = null;
    grid.addEventListener("click", e => {
      const t = e.target.closest("[data-open]"); if (!t) return;
      const p = PROJECTS.find(x => x.id === t.dataset.open); if (!p) return;
      lastFocus = t.closest(".pcard").querySelector(".explore");
      const img = $("#pdlg-img"); img.src = `img/${p.img}.webp`; img.alt = p.alt; img.width = p.w; img.height = p.h;
      $("#pdlg-k").textContent = `${p.cat} · ${p.loc}`;
      $("#pdlg-h").textContent = p.name;
      $("#pdlg-d").textContent = p.long;
      $("#pdlg-f").innerHTML = [["Location", p.loc], ["Category", p.cat], ["Year", p.year], ["Built area", p.area], ["Status", p.status], ["Scope", p.cat === "Renovation" ? "Design & renovation" : "Design & build"]]
        .map(([k, v]) => `<div><dt>${k}</dt><dd>${v}</dd></div>`).join("");
      const q = $("#pdlg-q"); q.dataset.quote = QUOTE_TYPE[p.cat] || ""; q.dataset.project = p.name;
      if (typeof dlg.showModal === "function") dlg.showModal(); else dlg.setAttribute("open", "");
    });
    const close = () => { if (dlg.open) dlg.close(); };
    dlg.addEventListener("click", e => { if (e.target === dlg || e.target.closest("[data-close]")) close(); });
    dlg.addEventListener("close", () => { if (lastFocus) lastFocus.focus({ preventScroll: true }); });
    $("#pdlg-q").addEventListener("click", e => {
      const msg = $("#q-msg");
      if (msg && !msg.value.trim()) msg.value = `I'd like a project similar to ${e.currentTarget.dataset.project}. `;
      lastFocus = null; close();
    });
  }

  /* ---------------- services accordion + preview ---------------- */
  function services() {
    const items = $$(".svc-item"), imgs = $$("#svc-preview img"), tag = $("#svc-tag");
    let shown = 0;
    function preview(i) {
      if (i === shown) return;
      imgs.forEach((im, k) => { im.classList.toggle("prev", k === shown); im.classList.toggle("on", k === i); });
      shown = i;
      tag.textContent = `${String(i + 1).padStart(2, "0")} — ${$(".svc-t", items[i]).textContent}`;
    }
    imgs[0].classList.add("on");
    function setOpen(item, open) {
      const b = $(".svc-b", item), btn = $(".svc-row", item);
      if (open === item.classList.contains("is-on")) return;
      btn.setAttribute("aria-expanded", open);
      if (RM) { item.classList.toggle("is-on", open); b.style.height = open ? "auto" : ""; return; }
      if (open) {
        item.classList.add("is-on");
        b.style.height = "0px"; b.offsetHeight; b.style.height = b.scrollHeight + "px";
        b.addEventListener("transitionend", function te(ev) { if (ev.propertyName !== "height") return; if (item.classList.contains("is-on")) b.style.height = "auto"; b.removeEventListener("transitionend", te); });
      } else {
        b.style.height = b.scrollHeight + "px"; b.offsetHeight;
        item.classList.remove("is-on"); b.style.height = "0px";
      }
    }
    items.forEach((item, i) => {
      $(".svc-row", item).addEventListener("click", () => {
        const opening = !item.classList.contains("is-on");
        items.forEach(o => setOpen(o, o === item ? opening : false));
        if (opening) preview(i);
        setTimeout(() => G && ScrollTrigger.refresh(), 600);
      });
      item.addEventListener("mouseenter", () => { if (matchMedia("(hover:hover)").matches) preview(i); });
    });
    $("#svc-list").addEventListener("mouseleave", () => { const open = items.findIndex(x => x.classList.contains("is-on")); if (open > -1) preview(open); });
    $(".svc-b", items[0]).style.height = "auto";
  }

  /* ---------------- footer social (demo) ---------------- */
  function social() {
    $$("[data-social]").forEach(b => b.addEventListener("click", () => toast(`Demo website: the ${b.dataset.social} profile is not connected.`)));
  }

  /* ---------------- story rail ---------------- */
  function buildRail() {
    const rail = $("#story-rail");
    rail.innerHTML = $$(".scene").map((s, i) => `<li><button type="button" data-k="${i}" aria-label="Go to space ${i + 1}: ${s.dataset.name}"><span>${s.dataset.name}</span><i></i></button></li>`).join("");
  }

  /* ================= GSAP animations ================= */
  function heroIn(fromIntro) {
    const tl = gsap.timeline({ defaults: { ease: "expo.out" } });
    if (!fromIntro) tl.fromTo(".hero-img", { scale: 1.14 }, { scale: 1, duration: 2.4, ease: "power3.out" }, 0);
    tl.from(".hero-h .ln-in", { yPercent: 112, duration: 1.3, stagger: .1 }, fromIntro ? 0 : .2)
      .from(".hero-k", { y: 16, opacity: 0, duration: 1 }, "<.15")
      .from([".hero-p", ".hero-cta .btn"], { y: 24, opacity: 0, duration: 1, stagger: .08 }, "<.25")
      .from(".hero-meta > *", { y: 12, opacity: 0, duration: .8, stagger: .06 }, "<.2")
      .fromTo(".nav-pill", { y: -24, opacity: 0 }, { y: 0, opacity: 1, duration: 1, clearProps: "transform,opacity" }, fromIntro ? .1 : .4);
    return tl;
  }

  function intro() {
    const el = $("#intro");
    if (!root.classList.contains("is-intro") || !el) { el && el.remove(); if (!RM) heroIn(false); return; }
    // the intro always starts at the top: stop ScrollTrigger/browser from restoring an old scroll position
    ScrollTrigger.clearScrollMemory("manual");
    const toTop = () => { if (window.scrollY) window.scrollTo(0, 0); };
    toTop(); addEventListener("load", toTop);
    const lines = $$(".bp .ln");
    lines.forEach(p => { const L = Math.ceil(p.getTotalLength()) + 2; p.style.strokeDasharray = L + " " + L; p.style.strokeDashoffset = L; p.style.opacity = 1; });
    const count = $("#intro-count"), state = $("#intro-state"), prog = { v: 0 };
    let done = false;
    const finish = () => {
      if (done) return; done = true;
      try { sessionStorage.setItem("mono-intro", "1"); } catch (e) {}
      el.style.display = "block";
      toTop();
      root.classList.remove("is-intro");
      heroIn(true);
      gsap.to(el, { opacity: 0, duration: .7, ease: "power2.out", onComplete: () => { el.remove(); ScrollTrigger.refresh(); } });
      removeEventListener("wheel", skip); removeEventListener("touchmove", skip); removeEventListener("keydown", onKey);
    };
    const tl = gsap.timeline({ defaults: { ease: "power2.inOut" }, onComplete: finish });
    tl.to(".bp-bg", { opacity: 1, duration: .7 }, 0)
      .to(".iu", { opacity: 1, duration: .6, stagger: .07 }, .15)
      .to(prog, { v: 100, duration: 2.5, ease: "power1.inOut", onUpdate: () => { count.textContent = String(Math.round(prog.v)).padStart(3, "0"); } }, 0)
      .to(".bp-main .ln", { strokeDashoffset: 0, duration: 1.15, stagger: .09 }, .25)
      .to(".bp-detail .ln", { strokeDashoffset: 0, duration: 1, stagger: .045, ease: "power1.inOut" }, .75)
      .to(".bp-dim .ln", { strokeDashoffset: 0, duration: .8, stagger: .08 }, 1.2)
      .to(".bp-text", { opacity: 1, duration: .6 }, 1.55)
      .to(".bp-fill", { opacity: .45, duration: .6 }, 1.9)
      .call(() => { state.textContent = "Rendering"; }, null, 2.45)
      .set(".scanline", { opacity: 1, top: "100%" }, 2.5)
      .to(".intro-photo", { clipPath: "inset(0% 0% 0% 0%)", duration: 1.25, ease: "expo.inOut" }, 2.5)
      .to(".scanline", { top: "0%", duration: 1.25, ease: "expo.inOut" }, 2.5)
      .to(".intro-photo", { scale: 1, duration: 1.7, ease: "power3.out" }, 2.6)
      .to([".bp-fill", ".bp-bg"], { opacity: 0, duration: .8 }, 2.7)
      .to([".bp-lines", ".bp-text"], { opacity: .4, duration: .6 }, 2.7)
      .to(".scanline", { opacity: 0, duration: .3 }, 3.6)
      .to([".bp-lines", ".bp-text"], { opacity: 0, duration: .6 }, 3.35)
      .to(".intro-shade", { opacity: 1, duration: .8 }, 3.3)
      .call(() => { state.textContent = "Complete"; }, null, 3.4)
      .to(".iu", { opacity: 0, duration: .4, stagger: .04 }, 3.55);
    function skip() { tl.timeScale(6); }
    function onKey(e) { if (["Escape", " ", "Enter", "ArrowDown", "PageDown"].includes(e.key)) skip(); }
    $("#intro-skip").addEventListener("click", skip);
    setTimeout(() => { addEventListener("wheel", skip, { passive: true }); addEventListener("touchmove", skip, { passive: true }); addEventListener("keydown", onKey); }, 700);
    setTimeout(finish, 9000); // safety net
  }

  function counters() {
    $$("[data-count]").forEach(b => {
      const end = +b.dataset.count, o = { v: 0 };
      gsap.to(o, { v: end, duration: 2, ease: "power3.out", scrollTrigger: { trigger: b, start: "top 88%", once: true }, onUpdate: () => { b.textContent = Math.round(o.v); } });
      b.textContent = "0";
    });
  }

  function storyPinned() {
    const stage = $("#story-stage"), scenes = $$(".scene", stage), n = scenes.length;
    const HOLD = .4, STEP = 1.25;                 // timeline units
    const total = HOLD + (n - 1) * (STEP);
    stage.classList.add("pinned");
    scenes.forEach((s, i) => { s.style.zIndex = i + 1; });
    const img = i => $("img", scenes[i]), copy = i => $$(".scene-copy > *", scenes[i]);
    gsap.set(scenes.slice(1), { clipPath: "inset(100% 0% 0% 0%)" });
    gsap.set(img(0), { scale: 1.08 });
    for (let i = 1; i < n; i++) { gsap.set(img(i), { scale: 1.32 }); gsap.set(copy(i), { opacity: 0, y: 46 }); }

    const now = $("#sc-now"), bar = $("#story-prog"), railBtns = $$("#story-rail button");
    let points = scenes.map((_, k) => k / (n - 1)), snapFn = gsap.utils.snap(points);
    let last = -1;
    const tl = gsap.timeline({
      defaults: { ease: "none" },
      scrollTrigger: {
        trigger: stage, start: "top top", end: () => "+=" + innerHeight * (n - 1) * 1.15,
        pin: true, scrub: .9, anticipatePin: 1, invalidateOnRefresh: true,
        snap: { snapTo: v => snapFn(v), duration: { min: .25, max: .9 }, delay: .12, ease: "power2.inOut" },
        onUpdate: self => {
          let k = 0; points.forEach((pt, j) => { if (Math.abs(self.progress - pt) < Math.abs(self.progress - points[k])) k = j; });
          bar.style.transform = `scaleX(${self.progress})`;
          if (k === last) return; last = k;
          now.textContent = String(k + 1).padStart(2, "0");
          railBtns.forEach((b, j) => { b.classList.toggle("on", j === k); });
        }
      }
    });
    tl.to(img(0), { scale: 1, duration: HOLD + STEP }, 0);
    for (let i = 1; i < n; i++) {
      const at = HOLD + (i - 1) * STEP;
      tl.to(scenes[i], { clipPath: "inset(0% 0% 0% 0%)", duration: 1, ease: "power2.inOut" }, at)
        .to(img(i), { scale: 1, duration: STEP + (i < n - 1 ? HOLD : 0), ease: "power1.out" }, at)
        .to(img(i - 1), { yPercent: -14, duration: 1, ease: "power2.inOut" }, at)
        .to(copy(i - 1), { opacity: 0, y: -40, duration: .4, stagger: .03, ease: "power2.in" }, at)
        .to(copy(i), { opacity: 1, y: 0, duration: .55, stagger: .06, ease: "power3.out" }, at + .5);
    }
    tl.to({}, { duration: HOLD }, total - HOLD + (STEP - 1));
    const D = tl.duration();                      // real length incl. final hold
    points = scenes.map((_, k) => k === 0 ? 0 : k === n - 1 ? 1 : (HOLD + k * STEP - (STEP - 1) / 2) / D);
    snapFn = gsap.utils.snap(points);
    railBtns.forEach((b, k) => b.addEventListener("click", () => {
      const st = tl.scrollTrigger;
      window.scrollTo({ top: st.start + (st.end - st.start) * points[k] + 1, behavior: "smooth" });
    }));
    return () => { stage.classList.remove("pinned"); scenes.forEach(s => { s.style.zIndex = ""; }); };
  }

  function storyStacked() {
    $$(".scene").forEach(s => {
      gsap.fromTo($("img", s), { yPercent: -7 }, { yPercent: 7, ease: "none", scrollTrigger: { trigger: s, start: "top bottom", end: "bottom top", scrub: true } });
      gsap.from($$(".scene-copy > *", s), { opacity: 0, y: 36, duration: 1, stagger: .08, ease: "power3.out", scrollTrigger: { trigger: s, start: "top 65%" } });
    });
  }

  function animations() {
    const mm = gsap.matchMedia();
    mm.add({ motion: "(prefers-reduced-motion: no-preference)", desk: "(min-width: 900px) and (min-height: 560px)" }, ctx => {
      const { motion, desk } = ctx.conditions;
      if (!motion) {
        $$(".statement-t .w").forEach(w => w.classList.add("on"));
        return;
      }
      /* hero parallax */
      gsap.to(".hero-media", { yPercent: 16, scale: 1.08, ease: "none", scrollTrigger: { trigger: ".hero", start: "top top", end: "bottom top", scrub: true } });
      gsap.to(".hero-in", { yPercent: -18, opacity: 0, ease: "none", scrollTrigger: { trigger: ".hero", start: "40% top", end: "bottom top", scrub: true } });

      /* statement words light up */
      const words = $$(".statement-t .w");
      ScrollTrigger.create({ trigger: ".statement-t", start: "top 82%", end: "bottom 45%", scrub: true,
        onUpdate: self => { const k = Math.round(self.progress * words.length); words.forEach((w, i) => w.classList.toggle("on", i < k)); } });

      /* section headings */
      $$(".sec-head").forEach(h => gsap.from(h.children, { y: 44, opacity: 0, duration: 1.1, stagger: .09, ease: "power3.out", scrollTrigger: { trigger: h, start: "top 80%" } }));

      /* story */
      let undo = null;
      if (desk) undo = storyPinned(); else storyStacked();

      /* projects: clip-path reveal */
      $$(".pcard").forEach(card => {
        const ph = $(".ph", card), im = $("img", card);
        gsap.set(ph, { clipPath: "inset(100% 0% 0% 0%)" }); gsap.set(im, { scale: 1.25 });
        ScrollTrigger.create({ trigger: card, start: "top 85%", once: true, onEnter: () => {
          gsap.to(ph, { clipPath: "inset(0% 0% 0% 0%)", duration: 1.3, ease: "expo.inOut" });
          gsap.to(im, { scale: 1, duration: 1.8, ease: "expo.out", clearProps: "transform" });
          gsap.from($$(".pcard-b > *", card), { y: 24, opacity: 0, duration: .9, stagger: .06, ease: "power3.out", delay: .35 });
        } });
      });

      /* services rows */
      gsap.from(".svc-item", { y: 30, opacity: 0, duration: .9, stagger: .07, ease: "power3.out", scrollTrigger: { trigger: ".svc-list", start: "top 80%" } });
      if (desk) gsap.from(".svc-preview", { clipPath: "inset(0% 0% 100% 0%)", duration: 1.4, ease: "expo.inOut", scrollTrigger: { trigger: ".svc", start: "top 75%" } });

      /* about */
      gsap.fromTo(".about-media img", { clipPath: "inset(0% 100% 0% 0%)", scale: 1.2 }, { clipPath: "inset(0% 0% 0% 0%)", scale: 1, duration: 1.6, ease: "expo.inOut", scrollTrigger: { trigger: ".about-media", start: "top 78%" } });
      gsap.from(".principles li", { y: 26, opacity: 0, duration: .9, stagger: .1, ease: "power3.out", scrollTrigger: { trigger: ".principles", start: "top 85%" } });
      gsap.from([".about-lead", ".about-copy > p:not(.kicker):not(.about-lead)"], { y: 30, opacity: 0, duration: 1, stagger: .1, ease: "power3.out", scrollTrigger: { trigger: ".about-lead", start: "top 85%" } });
      counters();

      /* contact + footer */
      gsap.fromTo(".contact-bg img", { yPercent: -8 }, { yPercent: 0, ease: "none", scrollTrigger: { trigger: ".contact", start: "top bottom", end: "bottom top", scrub: true } });
      gsap.from(".form", { y: 50, opacity: 0, duration: 1.2, ease: "power3.out", scrollTrigger: { trigger: ".form", start: "top 85%" } });
      gsap.from(".wordmark", { yPercent: 45, opacity: 0, ease: "none", scrollTrigger: { trigger: ".foot-cols", start: "top 80%", end: "bottom 60%", scrub: true } });

      return () => { if (undo) undo(); };
    });
  }

  /* ---------------- boot ---------------- */
  function init() {
    measure();
    renderProjects();
    services();
    quoteLinks();
    social();
    buildRail();
    if (!G) {                                     // GSAP failed to load: show everything, no intro
      root.classList.remove("is-intro");
      const el = $("#intro"); if (el) el.remove();
      return;
    }
    splitWords();
    try {
      animations();
      intro();
    } catch (err) {
      root.classList.remove("is-intro");
      const el = $("#intro"); if (el) el.remove();
      $$(".statement-t .w").forEach(w => w.classList.add("on"));
      console.warn("Monolith animations disabled:", err);
    }
    window.addEventListener("load", () => { measure(); ScrollTrigger.refresh(); });
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(() => { moveInd(); ScrollTrigger.refresh(); });
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init); else init();
})();
