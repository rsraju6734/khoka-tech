/* NOVA STORE — shared store logic for index.html and product.html:
   cart + wishlist (kept in this browser tab with sessionStorage; no personal data),
   cart drawer, wishlist drawer, checkout preview (demo — no order, no payment). */
window.Store = (function () {
  "use strict";
  const { $, $$, money, toast } = Kit;
  const P = window.NOVA.products, byId = id => P.find(p => p.id === id);
  const FREE_SHIP = 5000, SHIP = 120;
  const esc = s => String(s).replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  const load = k => { try { return JSON.parse(sessionStorage.getItem(k)) || []; } catch (e) { return []; } };
  const save = (k, v) => { try { sessionStorage.setItem(k, JSON.stringify(v)); } catch (e) { /* private mode */ } };

  let cart = load("nova-cart");          // [{ id, size, qty }]
  let wish = load("nova-wish");          // [id]
  const listeners = [];

  const key = l => l.id + "|" + (l.size || "");
  const count = () => cart.reduce((a, l) => a + l.qty, 0);
  const subtotal = () => cart.reduce((a, l) => a + byId(l.id).price * l.qty, 0);
  function changed() { save("nova-cart", cart); save("nova-wish", wish); renderBadges(); renderCart(); renderWish(); listeners.forEach(f => f()); }

  function add(id, qty = 1, size = null) {
    const p = byId(id); if (!p) return;
    if (p.sizes && !size) { toast("Please choose a size first."); return false; }
    const ex = cart.find(l => l.id === id && (l.size || null) === size);
    if (ex) ex.qty = Math.min(10, ex.qty + qty); else cart.push({ id, size, qty: Math.min(10, qty) });
    changed(); toast(`${p.name}${size ? " (" + size + ")" : ""} added to your bag`); bump();
    return true;
  }
  function setQty(k, q) { const l = cart.find(x => key(x) === k); if (!l) return; if (q <= 0) cart = cart.filter(x => key(x) !== k); else l.qty = Math.min(10, q); changed(); }
  function toggleWish(id) { const on = wish.includes(id); wish = on ? wish.filter(x => x !== id) : [...wish, id]; changed(); toast(on ? "Removed from wishlist" : "Saved to wishlist"); return !on; }
  const inWish = id => wish.includes(id);

  /* header badges */
  function renderBadges() {
    $$("[data-cart-count]").forEach(e => { e.textContent = count(); e.hidden = !count(); });
    $$("[data-wish-count]").forEach(e => { e.textContent = wish.length; e.hidden = !wish.length; });
    $$("[data-wish]").forEach(b => { const on = inWish(b.dataset.wish); b.setAttribute("aria-pressed", on); b.classList.toggle("on", on); });
  }
  function bump() { $$(".icon-btn.cart").forEach(b => { b.classList.remove("bump"); void b.offsetWidth; b.classList.add("bump"); }); }

  /* drawers */
  let lastFocus = null;
  function openDrawer(id) { lastFocus = document.activeElement; $$(".drawer").forEach(d => d.classList.toggle("on", d.id === id)); $$(".drawer").forEach(d => d.setAttribute("aria-hidden", d.id !== id)); $("#scrim").classList.add("on"); document.body.classList.add("locked"); const f = $("#" + id + " .dr-x"); if (f) f.focus(); }
  function closeDrawers() { $$(".drawer").forEach(d => { d.classList.remove("on"); d.setAttribute("aria-hidden", "true"); }); $("#scrim").classList.remove("on"); document.body.classList.remove("locked"); if (lastFocus) lastFocus.focus(); }

  function lineHtml(l) {
    const p = byId(l.id), k = key(l);
    return `<li class="line"><a class="ph line-img" href="product.html?id=${p.id}"><img src="img/${p.img}.webp" alt="${esc(p.alt)}" width="1000" height="1000" loading="lazy"></a>
      <div class="line-b"><a href="product.html?id=${p.id}"><b>${esc(p.name)}</b></a>${l.size ? `<span class="muted">Size ${esc(l.size)}</span>` : ""}
      <div class="qty" role="group" aria-label="Quantity for ${esc(p.name)}"><button type="button" data-q="${k}" data-d="-1" aria-label="Decrease">−</button><span aria-live="polite">${l.qty}</span><button type="button" data-q="${k}" data-d="1" aria-label="Increase">+</button></div></div>
      <div class="line-r"><b>${money(p.price * l.qty)}</b><button class="lnk-btn" type="button" data-rm="${k}">Remove</button></div></li>`;
  }
  function renderCart() {
    const box = $("#cart-lines"); if (!box) return;
    const sub = subtotal(), ship = sub === 0 || sub >= FREE_SHIP ? 0 : SHIP;
    box.innerHTML = cart.length ? cart.map(lineHtml).join("") : `<li class="empty"><b>Your bag is empty</b><span class="muted">Add something you love — it will stay here while you browse.</span><button class="btn btn-sm" type="button" data-close>Continue shopping</button></li>`;
    $("#ship-bar").innerHTML = sub >= FREE_SHIP ? "You've unlocked <b>free delivery</b> in Dhaka." : `Add <b>${money(FREE_SHIP - sub)}</b> more for free delivery in Dhaka.`;
    $("#ship-track").style.width = Math.min(100, sub / FREE_SHIP * 100) + "%";
    $("#c-sub").textContent = money(sub); $("#c-ship").textContent = sub === 0 ? "—" : ship ? money(ship) : "Free"; $("#c-total").textContent = money(sub + ship);
    $("#to-checkout").disabled = !cart.length;
  }
  function renderWish() {
    const box = $("#wish-lines"); if (!box) return;
    box.innerHTML = wish.length ? wish.map(id => { const p = byId(id); return `<li class="line"><a class="ph line-img" href="product.html?id=${p.id}"><img src="img/${p.img}.webp" alt="${esc(p.alt)}" width="1000" height="1000" loading="lazy"></a>
      <div class="line-b"><a href="product.html?id=${p.id}"><b>${esc(p.name)}</b></a><span class="muted">${money(p.price)}</span></div>
      <div class="line-r">${p.sizes ? `<a class="btn btn-sm" href="product.html?id=${p.id}">Choose size</a>` : `<button class="btn btn-sm" type="button" data-add="${p.id}">Add to bag</button>`}<button class="lnk-btn" type="button" data-unwish="${p.id}">Remove</button></div></li>`; }).join("")
      : `<li class="empty"><b>No saved items yet</b><span class="muted">Tap the heart on any product to save it here.</span></li>`;
  }

  /* checkout preview */
  function renderCheckout() {
    const sub = subtotal(), ship = sub >= FREE_SHIP ? 0 : SHIP;
    $("#co-items").innerHTML = cart.map(l => { const p = byId(l.id); return `<li><span class="ph co-img"><img src="img/${p.img}.webp" alt="" width="1000" height="1000"><i>${l.qty}</i></span><span>${esc(p.name)}${l.size ? `<small>Size ${esc(l.size)}</small>` : ""}</span><b>${money(p.price * l.qty)}</b></li>`; }).join("");
    $("#co-sub").textContent = money(sub); $("#co-ship").textContent = ship ? money(ship) : "Free"; $("#co-total").textContent = money(sub + ship);
  }

  function wire() {
    document.addEventListener("click", e => {
      const t = e.target;
      if (t.closest("[data-open-cart]")) { openDrawer("cart"); return; }
      if (t.closest("[data-open-wish]")) { openDrawer("wishlist"); return; }
      if (t.closest("[data-close]") || t.id === "scrim") { closeDrawers(); return; }
      const q = t.closest("[data-q]"); if (q) { const l = cart.find(x => key(x) === q.dataset.q); setQty(q.dataset.q, l.qty + +q.dataset.d); return; }
      const rm = t.closest("[data-rm]"); if (rm) { setQty(rm.dataset.rm, 0); return; }
      const a = t.closest("[data-add]"); if (a) { add(a.dataset.add); return; }
      const w = t.closest("[data-wish]"); if (w) { e.preventDefault(); toggleWish(w.dataset.wish); return; }
      const uw = t.closest("[data-unwish]"); if (uw) { toggleWish(uw.dataset.unwish); return; }
    });
    document.addEventListener("keydown", e => { if (e.key === "Escape" && $(".drawer.on")) closeDrawers(); });
    $("#to-checkout").addEventListener("click", () => { renderCheckout(); $("#co-form").hidden = false; $("#co-done").hidden = true; openDrawer("checkout"); });
    $("#co-back").addEventListener("click", () => openDrawer("cart"));
    $("#co-form").addEventListener("submit", e => {
      e.preventDefault();
      if (!Kit.validate(e.target)) return;
      e.target.hidden = true; $("#co-done").hidden = false; $("#co-done").focus();
    });
    $("#co-finish").addEventListener("click", () => { cart = []; changed(); closeDrawers(); toast("Demo complete — your bag has been cleared."); });
    changed();
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", wire); else wire();
  return { P, byId, add, toggleWish, inWish, esc, onChange: f => listeners.push(f), openDrawer };
})();
