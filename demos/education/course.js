/* LearnSphere — course detail page (course.html?id=…). */
(function () {
  "use strict";
  const { $, money } = Kit, D = window.LS, C = D.courses;
  const esc = s => String(s).replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  const c = C.find(x => x.id === new URLSearchParams(location.search).get("id"));

  if (!c) {
    document.title = "Course not found — LearnSphere Academy";
    $("#c-hero").innerHTML = `<nav class="crumbs"><a href="index.html">Home</a><span>/</span><span>Not found</span></nav><h1>We couldn't find that course</h1><p class="lede">It may have been renamed. Browse all courses instead.</p><a class="btn" href="index.html#courses">All courses</a>`;
  } else {
    const ins = D.instructors[c.instructor], cat = D.categories.find(x => x.id === c.cat).name;
    document.title = `${c.title} — LearnSphere Academy | Demo by KHOKA TECH`;
    $('meta[name="description"]').setAttribute("content", `${c.title}: ${c.short} Sample course at LearnSphere Academy, a KHOKA TECH demo.`);
    $("#c-hero").innerHTML = `
      <nav class="crumbs" aria-label="Breadcrumb"><a href="index.html">Home</a><span>/</span><a href="index.html#courses">Courses</a><span>/</span><span aria-current="page">${esc(c.title)}</span></nav>
      <div class="ch-grid">
        <div><span class="badge">${cat} · ${esc(c.level)}</span><h1>${esc(c.title)}</h1><p class="lede">${esc(c.short)}</p>
          <ul class="ch-facts"><li><b>${c.weeks}</b> weeks</li><li><b>${c.lessons}</b> lessons</li><li><b>${c.hours}</b> hours</li><li>Starts <b>${esc(c.start)}</b></li></ul>
          <span class="ins"><span class="av sm">${ins.initials}</span>Taught by <b>${esc(ins.name)}</b></span></div>
        <div class="ph ch-img"><img src="img/${c.img}.webp" alt="${esc(c.alt)}" width="1000" height="667" fetchpriority="high"></div>
      </div>`;
    $("#c-body").innerHTML = `
      <div class="cb-main">
        <section><h2>What you'll learn</h2><ul class="outcomes">${c.outcomes.map(o => `<li>${esc(o)}</li>`).join("")}</ul></section>
        <section><h2>Curriculum</h2><p class="muted">${c.modules.length} modules · ${c.lessons} lessons · ${c.hours} hours of live teaching and practice</p>
          <div class="faq modules">${c.modules.map((m, i) => `<details${i === 0 ? " open" : ""}><summary><span class="mn">Module ${i + 1}</span>${esc(m[0])}</summary><p>${esc(m[1])}</p></details>`).join("")}</div></section>
        <section><h2>Your instructor</h2><div class="inst row"><span class="av lg">${ins.initials}</span><div><h3>${esc(ins.name)}</h3><span class="role">${esc(ins.role)}</span><p>${esc(ins.bio)}</p></div></div><p class="note">Sample instructor profile (fictional).</p></section>
      </div>
      <aside class="cb-side"><div class="price-card">
        <span class="muted">Course fee</span><b class="fee-lg">${money(c.fee)}</b><small class="muted">Instalments available</small>
        <button class="btn btn-full" type="button" data-enroll="${c.id}">Enroll in this course</button>
        <ul class="pc-list"><li><span>Format</span><b>${esc(c.mode)}</b></li><li><span>Next batch</span><b>${esc(c.start)}</b></li><li><span>Duration</span><b>${c.weeks} weeks</b></li><li><span>Certificate</span><b>Included</b></li></ul>
        <p class="demo-note">Demo academy — no payment is taken.</p></div></aside>`;
  }
  const more = C.filter(x => !c || x.id !== c.id).slice(0, 3);
  $("#more").innerHTML = more.map(x => `<article class="course"><a class="ph c-img" href="course.html?id=${x.id}" aria-label="${esc(x.title)}"><img src="img/${x.img}.webp" alt="${esc(x.alt)}" loading="lazy" width="1000" height="667"></a>
    <div class="c-b"><div class="c-meta"><span class="c-cat">${D.categories.find(k => k.id === x.cat).name}</span><span>${esc(x.level)}</span></div><h3><a href="course.html?id=${x.id}">${esc(x.title)}</a></h3>
    <div class="c-f"><span class="muted">${x.weeks} weeks</span><b class="fee">${money(x.fee)}</b></div></div></article>`).join("");
})();
