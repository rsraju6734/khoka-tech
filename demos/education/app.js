/* LearnSphere — homepage: course catalogue filters, hero search, dashboard tabs, instructors. */
(function () {
  "use strict";
  const { $, $$, money } = Kit, D = window.LS, C = D.courses;
  const esc = s => String(s).replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  const state = { cat: "all", level: "all", q: "" };

  function card(c) {
    const ins = D.instructors[c.instructor], cat = D.categories.find(x => x.id === c.cat).name;
    return `<article class="course rv">
      <a class="ph c-img" href="course.html?id=${c.id}" aria-label="${esc(c.title)}"><img src="img/${c.img}.webp" alt="${esc(c.alt)}" loading="lazy" width="1000" height="667">${c.popular ? '<span class="tag">Popular</span>' : ""}</a>
      <div class="c-b">
        <div class="c-meta"><span class="c-cat">${cat}</span><span>${esc(c.level)}</span></div>
        <h3><a href="course.html?id=${c.id}">${esc(c.title)}</a></h3>
        <p>${esc(c.short)}</p>
        <ul class="c-facts"><li>${c.weeks} weeks</li><li>${c.lessons} lessons</li><li>Starts ${esc(c.start)}</li></ul>
        <div class="c-f"><span class="ins"><span class="av sm">${ins.initials}</span>${esc(ins.name)}</span><b class="fee">${money(c.fee)}</b></div>
        <div class="c-act"><a class="btn btn-soft btn-sm" href="course.html?id=${c.id}">View course</a><button class="btn btn-sm" type="button" data-enroll="${c.id}">Enroll</button></div>
      </div></article>`;
  }
  function render() {
    $("#cat-chips").innerHTML = [{ id: "all", name: "All" }, ...D.categories].map(c => `<button type="button" data-cat="${c.id}" aria-pressed="${state.cat === c.id}">${c.name}</button>`).join("");
    const q = state.q.toLowerCase().trim();
    const list = C.filter(c => (state.cat === "all" || c.cat === state.cat) && (state.level === "all" || c.level === state.level) && (!q || [c.title, c.short, c.cat, ...c.outcomes, D.categories.find(x => x.id === c.cat).name].join(" ").toLowerCase().includes(q)));
    $("#course-grid").innerHTML = list.map(card).join(""); Kit.reveal($("#course-grid"));
    $("#c-none").hidden = list.length > 0;
    $("#c-count").textContent = `${list.length} of ${C.length} courses`;
  }
  $("#cat-chips").addEventListener("click", e => { const b = e.target.closest("[data-cat]"); if (b) { state.cat = b.dataset.cat; render(); } });
  $("#c-level").addEventListener("change", e => { state.level = e.target.value; render(); });
  let t; $("#c-q").addEventListener("input", e => { clearTimeout(t); t = setTimeout(() => { state.q = e.target.value; render(); }, 120); });
  $("#c-clear").addEventListener("click", () => { Object.assign(state, { cat: "all", level: "all", q: "" }); $("#c-q").value = ""; $("#hs-q").value = ""; $("#c-level").value = "all"; render(); });
  const heroSearch = q => { state.q = q; state.cat = "all"; $("#c-q").value = q; render(); $("#courses").scrollIntoView({ behavior: "smooth" }); };
  $("#hero-search").addEventListener("submit", e => { e.preventDefault(); heroSearch($("#hs-q").value); });
  $$("[data-hs]").forEach(b => b.addEventListener("click", () => { $("#hs-q").value = b.textContent; heroSearch(b.dataset.hs); }));
  render();

  /* dashboard preview tabs */
  $(".d-tabs").addEventListener("click", e => {
    const b = e.target.closest("[data-dt]"); if (!b) return;
    $$(".d-tabs [data-dt]").forEach(x => x.setAttribute("aria-selected", x === b));
    $$(".d-panel").forEach(p => p.hidden = p.dataset.panel !== b.dataset.dt);
  });

  /* instructors */
  $("#inst-grid").innerHTML = Object.entries(D.instructors).map(([id, i]) => {
    const course = C.find(c => c.instructor === id);
    return `<div class="inst rv"><span class="av lg">${i.initials}</span><h3>${esc(i.name)}</h3><span class="role">${esc(i.role)}</span><p>${esc(i.bio)}</p>${course ? `<a class="lnk" href="course.html?id=${course.id}">${esc(course.title)} →</a>` : ""}</div>`;
  }).join("");
})();
