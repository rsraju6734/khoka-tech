/* NOVA STORE — homepage: category tiles, filters, search, sort, product grid. */
(function () {
  "use strict";
  const { $, $$, money } = Kit;
  const { P, esc } = Store, CATS = window.NOVA.categories;
  const state = { cat: "all", q: "", sort: "feat" };

  /* category tiles use the first product photo of each category */
  $("#cat-tiles").innerHTML = CATS.map(c => {
    const items = P.filter(p => p.cat === c.id);
    return `<button class="cat" type="button" data-go="${c.id}"><span class="ph"><img src="img/${items[0].img}.webp" alt="" loading="lazy" width="1000" height="1000"></span><b>${c.name}</b><small>${items.length} products</small></button>`;
  }).join("");

  function card(p, i) {
    const off = p.was ? Math.round((1 - p.price / p.was) * 100) : 0;
    return `<article class="card" style="animation-delay:${i * 35}ms">
      <a class="ph card-img" href="product.html?id=${p.id}" aria-label="${esc(p.name)}"><img src="img/${p.img}.webp" alt="${esc(p.alt)}" loading="lazy" width="1000" height="1000">${p.tag ? `<span class="flag ${p.tag === "Sale" ? "sale" : ""}">${p.tag === "Sale" ? "−" + off + "%" : p.tag}</span>` : ""}</a>
      <button class="heart" type="button" data-wish="${p.id}" aria-pressed="${Store.inWish(p.id)}" aria-label="Save ${esc(p.name)} to wishlist"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 20s-7-4.4-7-10a4 4 0 017-2.6A4 4 0 0119 10c0 5.6-7 10-7 10z"/></svg></button>
      <div class="card-b">
        <span class="muted cat-name">${CATS.find(c => c.id === p.cat).name}</span>
        <h3><a href="product.html?id=${p.id}">${esc(p.name)}</a></h3>
        <p class="muted">${esc(p.short)}</p>
        <div class="card-f"><span class="price">${money(p.price)}${p.was ? ` <s>${money(p.was)}</s>` : ""}</span>
        ${p.sizes ? `<a class="btn btn-sm btn-line" href="product.html?id=${p.id}">Choose size</a>` : `<button class="btn btn-sm" type="button" data-add="${p.id}">Add to bag</button>`}</div>
      </div></article>`;
  }

  function render() {
    $("#chips").innerHTML = [{ id: "all", name: "All" }, ...CATS].map(c => `<button type="button" class="chip" data-chip="${c.id}" aria-pressed="${state.cat === c.id}">${c.name}</button>`).join("");
    const q = state.q.toLowerCase().trim();
    let list = P.filter(p => (state.cat === "all" || p.cat === state.cat) && (!q || [p.name, p.short, p.desc, p.cat, CATS.find(c => c.id === p.cat).name].join(" ").toLowerCase().includes(q)));
    const s = { feat: () => 0, low: (a, b) => a.price - b.price, high: (a, b) => b.price - a.price, new: (a, b) => a.name.localeCompare(b.name) }[state.sort];
    list = list.slice().sort(s);
    $("#grid").innerHTML = list.map(card).join("");
    $("#none").hidden = list.length > 0;
    $("#count").textContent = `${list.length} product${list.length === 1 ? "" : "s"}${q ? ` for “${state.q.trim()}”` : ""}`;
    $("#shop-h").textContent = state.cat === "all" ? "All products" : CATS.find(c => c.id === state.cat).name;
  }

  function go(cat) { state.cat = cat; render(); $("#shop").scrollIntoView({ behavior: "smooth" }); }
  document.addEventListener("click", e => {
    const g = e.target.closest("[data-go]"); if (g) { e.preventDefault(); go(g.dataset.go); return; }
    const c = e.target.closest("[data-chip]"); if (c) { state.cat = c.dataset.chip; render(); }
  });
  let t; $("#q").addEventListener("input", e => { clearTimeout(t); t = setTimeout(() => { state.q = e.target.value; render(); }, 120); });
  $("#q").addEventListener("keydown", e => { if (e.key === "Enter") $("#shop").scrollIntoView({ behavior: "smooth" }); });
  $("#sort").addEventListener("change", e => { state.sort = e.target.value; render(); });
  $("#reset").addEventListener("click", () => { state.q = ""; state.cat = "all"; $("#q").value = ""; render(); $("#q").focus(); });

  /* ?cat=bags from the product page breadcrumb */
  const qs = new URLSearchParams(location.search), pc = qs.get("cat"), pq = qs.get("q");
  if (CATS.some(c => c.id === pc)) state.cat = pc;
  if (pq) { state.q = pq.slice(0, 60); $("#q").value = state.q; }
  render();
  if (pc || pq) setTimeout(() => $("#shop").scrollIntoView(), 50);
})();
