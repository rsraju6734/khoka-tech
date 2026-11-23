/* NOVA STORE — product detail page (product.html?id=…). */
(function () {
  "use strict";
  const { $, $$, money } = Kit;
  const { P, byId, esc } = Store, CATS = window.NOVA.categories;
  const id = new URLSearchParams(location.search).get("id");
  const p = byId(id);
  const catName = c => (CATS.find(x => x.id === c) || {}).name || c;

  /* search box on this page sends you to the shop results */
  $("#q").addEventListener("keydown", e => { if (e.key === "Enter" && e.target.value.trim()) location.href = "index.html?q=" + encodeURIComponent(e.target.value.trim()) + "#shop"; });

  if (!p) {
    document.title = "Product not found — NOVA STORE";
    $("#crumbs").innerHTML = `<a href="index.html">Home</a><span>/</span><span>Not found</span>`;
    $("#pdp").innerHTML = `<div class="none"><b>We couldn't find that product</b><p class="muted">It may have sold out or the link is incorrect.</p><a class="btn btn-sm" href="index.html#shop">Back to the shop</a></div>`;
  } else {
    document.title = `${p.name} — NOVA STORE | Demo by KHOKA TECH`;
    $('meta[name="description"]').setAttribute("content", `${p.name}: ${p.short} Sample product at NOVA STORE, a demo store by KHOKA TECH.`);
    $("#crumbs").innerHTML = `<a href="index.html">Home</a><span>/</span><a href="index.html?cat=${p.cat}#shop">${catName(p.cat)}</a><span>/</span><span aria-current="page">${esc(p.name)}</span>`;
    // three views of the same photo: full, detail and close-up crop
    const views = [{ cls: "v-full", label: "Full view" }, { cls: "v-detail", label: "Detail" }, { cls: "v-close", label: "Close-up" }];
    $("#pdp").innerHTML = `<div class="pdp">
      <div class="gallery">
        <div class="ph g-main" id="g-main"><img class="v-full" src="img/${p.img}.webp" alt="${esc(p.alt)}" width="1000" height="1000"></div>
        <div class="g-thumbs" role="group" aria-label="Product photos">${views.map((v, i) => `<button type="button" class="ph g-thumb" data-view="${v.cls}" aria-pressed="${i === 0}" aria-label="${v.label}"><img class="${v.cls}" src="img/${p.img}.webp" alt="" width="1000" height="1000"></button>`).join("")}</div>
      </div>
      <div class="info">
        <span class="muted cat-name">${catName(p.cat)}</span>
        <h1>${esc(p.name)}</h1>
        <div class="pdp-price"><span class="price">${money(p.price)}</span>${p.was ? `<s>${money(p.was)}</s><span class="flag sale static">Save ${money(p.was - p.price)}</span>` : ""}</div>
        <p class="lede">${esc(p.desc)}</p>
        ${p.sizes ? `<fieldset class="sizes"><legend>Size <span class="muted" id="size-sel">— choose one</span></legend><div>${p.sizes.map(s => `<label><input type="radio" name="size" value="${s}"><span>${s}</span></label>`).join("")}</div></fieldset>` : ""}
        <div class="buy">
          <div class="qty big" role="group" aria-label="Quantity"><button type="button" id="qm" aria-label="Decrease quantity">−</button><span id="qv" aria-live="polite">1</span><button type="button" id="qp" aria-label="Increase quantity">+</button></div>
          <button class="btn grow" type="button" id="add">Add to bag — <span id="add-price">${money(p.price)}</span></button>
          <button class="icon-btn heart-lg" type="button" data-wish="${p.id}" aria-pressed="${Store.inWish(p.id)}" aria-label="Save to wishlist"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 20s-7-4.4-7-10a4 4 0 017-2.6A4 4 0 0119 10c0 5.6-7 10-7 10z"/></svg></button>
        </div>
        <ul class="assure"><li>Free delivery in Dhaka over ৳5,000</li><li>7-day returns on unused items</li><li>Cash on delivery available</li></ul>
        <div class="acc">
          <details open><summary>Details</summary><ul class="specs">${p.specs.map(s => `<li>${esc(s)}</li>`).join("")}</ul></details>
          <details id="delivery"><summary>Delivery &amp; returns</summary><p>Dhaka: 1–2 working days. Outside Dhaka: 3–5 working days. Delivery is ৳120, free on orders over ৳5,000 in Dhaka. Unused items can be returned within 7 days in their original packaging.</p></details>
          <details><summary>Care</summary><p>Keep away from direct heat and moisture when not in use. Wipe clean with a soft, dry cloth.</p></details>
        </div>
        <p class="demo-note">Sample product for a demo store. Prices and availability are illustrative.</p>
      </div></div>`;

    /* gallery views */
    $(".g-thumbs").addEventListener("click", e => {
      const b = e.target.closest("[data-view]"); if (!b) return;
      $("#g-main img").className = b.dataset.view;
      $$(".g-thumb").forEach(x => x.setAttribute("aria-pressed", x === b));
    });
    /* quantity + size + add */
    let qty = 1, size = null;
    const upd = () => { $("#qv").textContent = qty; $("#add-price").textContent = money(p.price * qty); };
    $("#qm").addEventListener("click", () => { qty = Math.max(1, qty - 1); upd(); });
    $("#qp").addEventListener("click", () => { qty = Math.min(10, qty + 1); upd(); });
    $$('input[name="size"]').forEach(r => r.addEventListener("change", () => { size = r.value; $("#size-sel").textContent = "— " + size; $(".sizes").classList.remove("need"); }));
    $("#add").addEventListener("click", () => {
      if (p.sizes && !size) { $(".sizes").classList.add("need"); $("#size-sel").textContent = "— please choose a size"; $('input[name="size"]').focus(); return; }
      if (Store.add(p.id, qty, size)) { qty = 1; upd(); Store.openDrawer("cart"); }
    });
  }

  /* related: same category first, then others */
  const rel = P.filter(x => !p || x.id !== p.id).sort((a, b) => (p && b.cat === p.cat) - (p && a.cat === p.cat)).slice(0, 4);
  $("#related").innerHTML = rel.map(x => `<article class="card">
    <a class="ph card-img" href="product.html?id=${x.id}" aria-label="${esc(x.name)}"><img src="img/${x.img}.webp" alt="${esc(x.alt)}" loading="lazy" width="1000" height="1000"></a>
    <button class="heart" type="button" data-wish="${x.id}" aria-pressed="${Store.inWish(x.id)}" aria-label="Save ${esc(x.name)} to wishlist"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 20s-7-4.4-7-10a4 4 0 017-2.6A4 4 0 0119 10c0 5.6-7 10-7 10z"/></svg></button>
    <div class="card-b"><span class="muted cat-name">${catName(x.cat)}</span><h3><a href="product.html?id=${x.id}">${esc(x.name)}</a></h3><div class="card-f"><span class="price">${money(x.price)}</span><a class="btn btn-sm btn-line" href="product.html?id=${x.id}">View</a></div></div></article>`).join("");
})();
