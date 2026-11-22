/* ==========================================================================
   KHOKA TECH admin dashboard — UI.
   Routes (hash based, works on GitHub Pages):
     #/overview  #/orders  #/orders?status=new  #/orders/<REF>  #/templates  #/import  #/backend
   All data goes through KT_ADMIN_DATA.createAdapter() (see admin-data.js).
   In Preview mode nothing is saved anywhere: no localStorage, no cookies, no network.
   ========================================================================== */
(function () {
  "use strict";
  const D = window.KT_ADMIN_DATA, api = D.createAdapter();
  const TPL_BASE = window.KT_TEMPLATES || [], CATS = window.KT_CATEGORIES || {};
  const $ = (s, r = document) => r.querySelector(s), $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const esc = s => String(s == null ? "" : s).replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const STATUS = Object.fromEntries(D.STATUSES.map(s => [s.id, s.label]));
  const ST_COLOR = { new: "#B9A3FB", contacted: "#7DB7F5", discussion: "#F5B84B", confirmed: "#3DD68C", completed: "#9AD7C1", cancelled: "#F49A9F" };
  const PREVIEW = api.mode === "preview";
  let ORDERS = [], TEMPLATES = [];
  const view = $("#view");

  /* ---------------------------------------------------------------- helpers */
  const tplOf = id => TEMPLATES.find(t => t.id === id) || TPL_BASE.find(t => t.id === id);
  const tplName = id => (tplOf(id) || {}).name || id || "—";
  const pill = s => `<span class="st st-${s}">${esc(STATUS[s] || s)}</span>`;
  const fmtDate = iso => { const d = new Date(iso); return d.toLocaleDateString(undefined, { day: "numeric", month: "short", year: "numeric" }); };
  const fmtTime = iso => { const d = new Date(iso); return d.toLocaleString(undefined, { day: "numeric", month: "short", hour: "2-digit", minute: "2-digit" }); };
  const ago = iso => { const m = Math.round((Date.now() - new Date(iso)) / 60000); if (m < 60) return m + " min ago"; const h = Math.round(m / 60); if (h < 24) return h + " h ago"; return Math.round(h / 24) + " d ago"; };
  const waDigits = n => String(n || "").replace(/[^\d]/g, "");
  function toast(m) { const e = $("#toast"); e.textContent = m; e.classList.add("show"); clearTimeout(toast.i); toast.i = setTimeout(() => e.classList.remove("show"), 2800); }
  function setTitle(t) { $("#page-title").textContent = t; document.title = t + " — KHOKA TECH Admin"; }
  async function reload() { ORDERS = await api.listOrders(); TEMPLATES = await api.listTemplates(); $("#nav-new").textContent = ORDERS.filter(o => o.status === "new").length || ""; }

  /* ---------------------------------------------------------------- shell */
  function shell() {
    $("#mode-card").className = "mode" + (PREVIEW ? "" : " live");
    $("#mode-card").innerHTML = PREVIEW
      ? "<b><i></i>Preview mode</b>No backend connected. Sample data only; nothing is saved."
      : "<b><i></i>Connected</b>" + esc(window.KT_API.baseUrl);
    $("#mode-pill").className = "pill-mode" + (PREVIEW ? "" : " live");
    $("#mode-pill").textContent = PREVIEW ? "Preview · not saved" : "Live data";
    $("#banner").innerHTML = PREVIEW
      ? "<b>Preview mode.</b> No backend is connected, so this dashboard shows <b>fictional sample orders</b>. Status changes, imports and template edits last only until you reload this tab — nothing is stored in this browser or sent anywhere. Real orders currently arrive in your WhatsApp. <a class=\"link\" href=\"#/backend\">What needs a backend?</a>"
      : "";
    const sb = $("#sb"), scrim = $("#sb-scrim"), btn = $("#sb-open");
    const close = () => { sb.classList.remove("on"); scrim.classList.remove("on"); btn.setAttribute("aria-expanded", "false"); };
    btn.addEventListener("click", () => { sb.classList.add("on"); scrim.classList.add("on"); btn.setAttribute("aria-expanded", "true"); });
    scrim.addEventListener("click", close);
    $$(".sb-nav a").forEach(a => a.addEventListener("click", close));
    $("#gsearch").addEventListener("keydown", e => { if (e.key === "Enter") { filters.q = e.target.value.trim(); location.hash = "#/orders"; route(); } });
  }

  /* ---------------------------------------------------------------- overview */
  function renderOverview() {
    setTitle("Overview");
    const c = s => ORDERS.filter(o => o.status === s).length;
    const open = c("contacted") + c("discussion");
    const listed = ORDERS.filter(o => ["discussion", "confirmed"].includes(o.status)).reduce((a, o) => a + ((tplOf(o.templateId) || {}).price || 0), 0);
    const total = ORDERS.length || 1;
    const recent = ORDERS.slice().sort((a, b) => b.createdAt.localeCompare(a.createdAt)).slice(0, 6);
    const byTpl = TEMPLATES.map(t => ({ t, n: ORDERS.filter(o => o.templateId === t.id).length })).sort((a, b) => b.n - a.n);
    const max = Math.max(1, ...byTpl.map(x => x.n));
    view.innerHTML = `
    <div class="ph"><div><h2>Good to see you</h2><p class="muted">${PREVIEW ? "Sample data — connect a backend to see real orders here." : "Live order data."}</p></div><a class="btn primary" href="#/import">Add order from WhatsApp</a></div>
    <div class="kpis">
      <a class="kpi accent" href="#/orders?status=new"><span>New — needs a reply</span><b>${c("new")}</b><small>Reply on WhatsApp first</small></a>
      <a class="kpi" href="#/orders?status=open"><span>Contacted / in discussion</span><b>${open}</b><small>Active conversations</small></a>
      <a class="kpi" href="#/orders?status=confirmed"><span>Confirmed</span><b>${c("confirmed")}</b><small>Ready to build</small></a>
      <a class="kpi" href="#/orders?status=completed"><span>Completed</span><b>${c("completed")}</b><small>Delivered projects</small></a>
      <div class="kpi"><span>Listed value in pipeline</span><b>$${listed}</b><small>Demo list prices, not quotes</small></div>
    </div>
    <div class="grid-2">
      <section class="panel"><div class="panel-h"><h3>Recent orders</h3><a class="link" href="#/orders">View all</a></div>
        <div class="tbl-wrap"><table class="tbl"><thead><tr><th>Reference</th><th>Customer</th><th>Template</th><th>Status</th><th>Received</th></tr></thead>
        <tbody>${recent.map(rowHtml).join("") || `<tr><td colspan="5" class="empty-s">No orders yet.</td></tr>`}</tbody></table></div></section>
      <div style="display:grid;gap:20px;align-content:start">
        <section class="panel"><div class="panel-h"><h3>Status breakdown</h3><span class="muted" style="font-size:.8rem">${ORDERS.length} total</span></div><div class="panel-b">
          <div class="stack" role="img" aria-label="Orders by status">${D.STATUSES.map(s => `<i style="width:${c(s.id) / total * 100}%;background:${ST_COLOR[s.id]}" title="${s.label}: ${c(s.id)}"></i>`).join("")}</div>
          <div class="legend">${D.STATUSES.map(s => `<span><i style="background:${ST_COLOR[s.id]}"></i>${s.label}<b>${c(s.id)}</b></span>`).join("")}</div></div></section>
        <section class="panel"><div class="panel-h"><h3>Orders by template</h3></div><div class="panel-b bars">
          ${byTpl.map(x => `<div class="bar-row"><span>${esc(x.t.name)}</span><span class="tr"><i style="width:${x.n / max * 100}%"></i></span><b>${x.n}</b></div>`).join("")}</div></section>
      </div>
    </div>`;
    bindRows();
  }

  /* ---------------------------------------------------------------- orders */
  const filters = { q: "", status: "all", tpl: "all", sort: "new" };
  function rowHtml(o) {
    const t = tplOf(o.templateId);
    return `<tr data-id="${esc(o.id)}" tabindex="0" aria-label="Open order ${esc(o.ref)}">
      <td class="ref">${esc(o.ref)}${o.sample ? '<span class="tag-s">sample</span>' : ""}${o.imported ? '<span class="tag-s imp">imported</span>' : ""}</td>
      <td class="who"><b>${esc(o.customer.name)}</b><span>${esc(o.customer.business || "Personal")}</span></td>
      <td><span class="tpl-cell"><i style="background:${t ? t.accent : "#555"}"></i>${esc(tplName(o.templateId))}</span></td>
      <td>${pill(o.status)}</td>
      <td><span title="${esc(fmtTime(o.createdAt))}">${esc(ago(o.createdAt))}</span></td></tr>`;
  }
  function bindRows() {
    $$(".tbl tbody tr[data-id]", view).forEach(tr => {
      const go = () => { location.hash = "#/orders/" + encodeURIComponent(tr.dataset.id); };
      tr.addEventListener("click", go);
      tr.addEventListener("keydown", e => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); go(); } });
    });
  }
  function filtered() {
    const q = filters.q.toLowerCase();
    let list = ORDERS.filter(o => {
      if (filters.status === "open" ? !["contacted", "discussion"].includes(o.status) : filters.status !== "all" && o.status !== filters.status) return false;
      if (filters.tpl !== "all" && o.templateId !== filters.tpl) return false;
      if (!q) return true;
      return [o.ref, o.customer.name, o.customer.business, o.customer.email, o.customer.whatsapp, tplName(o.templateId), o.requirements].join(" ").toLowerCase().includes(q);
    });
    list.sort((a, b) => filters.sort === "old" ? a.createdAt.localeCompare(b.createdAt) : b.createdAt.localeCompare(a.createdAt));
    return list;
  }
  function renderOrders(selectedId) {
    setTitle("Orders");
    const count = s => s === "all" ? ORDERS.length : ORDERS.filter(o => o.status === s).length;
    const list = filtered();
    view.innerHTML = `
    <div class="ph"><div><h2>Orders</h2><p class="muted">Every template request, from first message to delivery.</p></div><a class="btn" href="#/import">Add from WhatsApp</a></div>
    <div class="chips-s" role="group" aria-label="Filter by status">
      ${[["all", "All"], ...D.STATUSES.map(s => [s.id, s.label])].map(([id, l]) => `<button type="button" data-st="${id}" aria-pressed="${filters.status === id}">${l}<span>${count(id)}</span></button>`).join("")}
      ${filters.status === "open" ? `<button type="button" data-st="open" aria-pressed="true">Contacted + In Discussion</button>` : ""}
    </div>
    <div class="filters-bar">
      <label class="search-in"><span class="sr">Search orders</span><svg aria-hidden="true"><use href="#i-search"/></svg><input id="oq" type="search" placeholder="Name, business, reference…" value="${esc(filters.q)}" autocomplete="off"></label>
      <label><span class="sr">Template</span><select id="otpl"><option value="all">All templates</option>${TEMPLATES.map(t => `<option value="${t.id}"${filters.tpl === t.id ? " selected" : ""}>${esc(t.name)}</option>`).join("")}</select></label>
      <label><span class="sr">Sort</span><select id="osort"><option value="new"${filters.sort === "new" ? " selected" : ""}>Newest first</option><option value="old"${filters.sort === "old" ? " selected" : ""}>Oldest first</option></select></label>
      <span class="muted" style="font-size:.85rem;margin-left:auto" aria-live="polite">${list.length} of ${ORDERS.length}</span>
    </div>
    <section class="panel"><div class="tbl-wrap"><table class="tbl"><thead><tr><th>Reference</th><th>Customer</th><th>Template</th><th>Status</th><th>Received</th></tr></thead>
      <tbody>${list.map(rowHtml).join("") || `<tr><td colspan="5" class="empty-s">No orders match these filters. <button class="linkbtn" type="button" id="oclear">Clear filters</button></td></tr>`}</tbody></table></div></section>`;
    $$("[data-st]", view).forEach(b => b.addEventListener("click", () => { filters.status = b.dataset.st; renderOrders(); }));
    let deb; $("#oq").addEventListener("input", e => { clearTimeout(deb); deb = setTimeout(() => { filters.q = e.target.value.trim(); $("#gsearch").value = filters.q; renderOrders(); $("#oq").focus(); const v = $("#oq").value; $("#oq").setSelectionRange(v.length, v.length); }, 150); });
    $("#otpl").addEventListener("change", e => { filters.tpl = e.target.value; renderOrders(); });
    $("#osort").addEventListener("change", e => { filters.sort = e.target.value; renderOrders(); });
    const oc = $("#oclear"); if (oc) oc.addEventListener("click", () => { Object.assign(filters, { q: "", status: "all", tpl: "all" }); $("#gsearch").value = ""; renderOrders(); });
    bindRows();
    if (selectedId) { const tr = $(`tr[data-id="${CSS.escape(selectedId)}"]`, view); if (tr) tr.classList.add("sel"); }
  }

  /* ---------------------------------------------------------------- order drawer */
  const drawer = $("#drawer"), dScrim = $("#drawer-scrim");
  let lastFocus = null;
  function closeDrawer(updateHash = true) {
    drawer.classList.remove("on"); dScrim.classList.remove("on"); drawer.setAttribute("aria-hidden", "true");
    if (updateHash && location.hash.startsWith("#/orders/")) history.replaceState(null, "", "#/orders");
    $$(".tbl tr.sel").forEach(r => r.classList.remove("sel"));
    if (lastFocus) lastFocus.focus();
  }
  dScrim.addEventListener("click", () => closeDrawer());
  document.addEventListener("keydown", e => { if (e.key === "Escape" && drawer.classList.contains("on")) closeDrawer(); });

  async function openDrawer(id) {
    const o = await api.getOrder(id);
    if (!o) { toast("Order " + id + " was not found."); history.replaceState(null, "", "#/orders"); return; }
    const t = tplOf(o.templateId), c = o.customer;
    const reply = `Hello ${c.name.replace(/^Sample:\s*/, "")}, thank you for your template request (${o.ref}) for ${tplName(o.templateId)}. — KHOKA TECH`;
    lastFocus = document.activeElement;
    drawer.innerHTML = `
      <div class="dr-h"><div><small>${esc(o.ref)}${o.sample ? " · sample" : ""}</small><h2 id="dr-title">${esc(c.name)}</h2>${pill(o.status)}</div><button class="dr-x" type="button" id="dr-x" aria-label="Close order details">×</button></div>
      <div class="dr-b">
        <section class="dr-sec"><h3>Status</h3>
          <form class="dr-status" id="st-form">
            <label><span class="sr">New status</span><select id="st-sel">${D.STATUSES.map(s => `<option value="${s.id}"${s.id === o.status ? " selected" : ""}>${s.label}</option>`).join("")}</select></label>
            <button class="btn primary" type="submit">Update</button>
            <label style="grid-column:1/-1"><span class="sr">Note (optional)</span><input id="st-note" placeholder="Optional note, e.g. “Sent quote on WhatsApp”" maxlength="200"></label>
          </form>
          ${PREVIEW ? '<p class="muted" style="font-size:.78rem;margin-top:8px">Preview mode: the change is shown here but not saved.</p>' : ""}
        </section>
        <section class="dr-sec"><h3>Customer</h3><dl class="kv">
          <div><dt>Name</dt><dd>${esc(c.name)}</dd></div>
          <div><dt>Business</dt><dd>${esc(c.business || "—")}</dd></div>
          <div><dt>Email</dt><dd>${c.email ? `<a href="mailto:${esc(c.email)}">${esc(c.email)}</a>` : "—"}</dd></div>
          <div><dt>WhatsApp</dt><dd>${esc(c.whatsapp)}</dd></div>
          <div><dt>Received</dt><dd>${esc(fmtTime(o.createdAt))}</dd></div></dl></section>
        <section class="dr-sec"><h3>Template</h3><dl class="kv">
          <div><dt>Template</dt><dd>${esc(tplName(o.templateId))}</dd></div>
          <div><dt>Listed price</dt><dd>${t ? "$" + t.price + " <span class=\"muted\">(demo list price)</span>" : "—"}</dd></div>
          <div><dt>Links</dt><dd>${t ? `<a href="../${t.demo}" target="_blank" rel="noopener">Live demo ↗</a> · <a href="../templates/details.html?id=${t.id}" target="_blank" rel="noopener">Product page ↗</a>` : "—"}</dd></div></dl></section>
        <section class="dr-sec"><h3>Customisation requirements</h3><div class="txt">${esc(o.requirements || "—")}</div></section>
        ${o.note ? `<section class="dr-sec"><h3>Additional message</h3><div class="txt">${esc(o.note)}</div></section>` : ""}
        <section class="dr-sec"><h3>Activity</h3><ol class="timeline">${o.history.slice().reverse().map(h => `<li><b>${esc(STATUS[h.status] || h.status)}</b>${h.note ? " — " + esc(h.note) : ""}<span>${esc(fmtTime(h.at))}</span></li>`).join("")}</ol></section>
      </div>
      <div class="dr-f">
        <a class="btn wa" href="${window.KT_WA(reply, waDigits(c.whatsapp))}" target="_blank" rel="noopener">Reply on WhatsApp</a>
        ${c.email ? `<a class="btn" href="${window.KT_MAIL("Your template request " + o.ref, reply, c.email)}">Email</a>` : ""}
        <button class="btn" type="button" id="dr-copy">Copy details</button>
      </div>`;
    drawer.classList.add("on"); dScrim.classList.add("on"); drawer.setAttribute("aria-hidden", "false");
    $("#dr-x").addEventListener("click", () => closeDrawer());
    $("#dr-x").focus();
    $("#st-form").addEventListener("submit", async e => {
      e.preventDefault();
      const s = $("#st-sel").value, note = $("#st-note").value.trim();
      if (s === o.status && !note) { toast("Choose a different status or add a note."); return; }
      try {
        await api.updateStatus(o.id, s, note);
        await reload();
        toast(`Status set to ${STATUS[s]}${PREVIEW ? " (preview — not saved)" : ""}`);
        if (location.hash.startsWith("#/orders")) renderOrders(o.id);
        openDrawer(o.id);
      } catch (err) { toast(err.message); }
    });
    $("#dr-copy").addEventListener("click", () => {
      const txt = `${o.ref}\n${c.name}${c.business ? " (" + c.business + ")" : ""}\n${c.email}\n${c.whatsapp}\nTemplate: ${tplName(o.templateId)}\nStatus: ${STATUS[o.status]}\n\n${o.requirements}${o.note ? "\n\n" + o.note : ""}`;
      (navigator.clipboard && window.isSecureContext ? navigator.clipboard.writeText(txt) : Promise.reject()).then(() => toast("Copied."), () => toast("Copy isn't available here."));
    });
  }

  /* ---------------------------------------------------------------- templates */
  let editing = null;
  function renderTemplates() {
    setTitle("Templates");
    view.innerHTML = `
    <div class="ph"><div><h2>Template catalogue</h2><p class="muted">Names, list prices and short descriptions shown in the store.</p></div>
      <button class="btn primary" type="button" id="dl">Download templates-data.js</button></div>
    <p class="notice" style="margin-bottom:16px">${PREVIEW ? "Edits here update this tab only. To publish them, click <b>Download templates-data.js</b> and replace <code>assets/js/templates-data.js</code> in your GitHub repository." : "Edits are saved to the backend."}</p>
    <section class="panel"><div class="tbl-wrap"><table class="tbl"><thead><tr><th></th><th>Template</th><th>Category</th><th>List price</th><th>Orders</th><th>Links</th><th></th></tr></thead><tbody>
    ${TEMPLATES.map(t => `<tr data-t="${t.id}">
      <td><span class="tpl-thumb" style="display:block;background:${t.paper}"><img src="../${t.thumb}" alt="" width="640" height="400" loading="lazy"></span></td>
      <td class="who"><b>${esc(t.name)}</b><span>${esc(t.short.en)}</span></td>
      <td>${esc((CATS[t.category] || {}).en || t.category)}</td>
      <td class="num">$${t.price}</td>
      <td class="num">${ORDERS.filter(o => o.templateId === t.id).length}</td>
      <td style="white-space:nowrap"><a class="link" href="../${t.demo}" target="_blank" rel="noopener">Demo</a> · <a class="link" href="../templates/details.html?id=${t.id}" target="_blank" rel="noopener">Page</a></td>
      <td><button class="btn xs" type="button" data-edit="${t.id}">${editing === t.id ? "Close" : "Edit"}</button></td></tr>
      ${editing === t.id ? `<tr class="edit-row"><td colspan="7"><form class="edit-form" data-form="${t.id}">
        <label><span>Name</span><input name="name" value="${esc(t.name)}" required maxlength="60"></label>
        <label><span>List price ($)</span><input name="price" type="number" min="0" max="100000" value="${t.price}" required></label>
        <label><span>Short description (English)</span><input name="shortEn" value="${esc(t.short.en)}" required maxlength="160"></label>
        <button class="btn primary" type="submit">Save</button></form></td></tr>` : ""}`).join("")}
    </tbody></table></div></section>`;
    $$("[data-edit]", view).forEach(b => b.addEventListener("click", e => { e.stopPropagation(); editing = editing === b.dataset.edit ? null : b.dataset.edit; renderTemplates(); const f = $("[data-form] input", view); if (f) f.focus(); }));
    $$("[data-form]", view).forEach(f => f.addEventListener("submit", async e => {
      e.preventDefault();
      if (!f.reportValidity()) return;
      try { await api.updateTemplate(f.dataset.form, { name: f.name.value, price: f.price.value, shortEn: f.shortEn.value }); editing = null; await reload(); toast("Template updated" + (PREVIEW ? " in this tab" : "")); renderTemplates(); }
      catch (err) { toast(err.message); }
    }));
    $("#dl").addEventListener("click", downloadData);
  }
  function downloadData() {
    const file = "/* KHOKA TEMPLATES — catalogue data (exported from the admin dashboard on " + new Date().toISOString().slice(0, 10) + ").\n   Replace assets/js/templates-data.js with this file. Prices are DEMO prices. */\n" +
      "window.KT_CATEGORIES = " + JSON.stringify(CATS, null, 2) + ";\n\nwindow.KT_TEMPLATES = " + JSON.stringify(TEMPLATES, null, 2) + ";\n";
    const a = document.createElement("a");
    a.href = URL.createObjectURL(new Blob([file], { type: "text/javascript" }));
    a.download = "templates-data.js"; document.body.appendChild(a); a.click(); a.remove();
    setTimeout(() => URL.revokeObjectURL(a.href), 2000);
    toast("templates-data.js downloaded");
  }

  /* ---------------------------------------------------------------- import */
  function renderImport() {
    setTitle("Add from WhatsApp");
    view.innerHTML = `
    <div class="ph"><div><h2>Add an order from WhatsApp</h2><p class="muted">Paste a message sent from the website's order page. The fields are read automatically.</p></div></div>
    <div class="imp">
      <section class="panel"><div class="panel-h"><h3>1 · Paste the message</h3></div><div class="panel-b">
        <form id="imp-form" style="gap:12px"><label><span class="sr">WhatsApp message</span><textarea id="imp-text" placeholder="*New template order request*&#10;Ref: KT-261122-7Q4M&#10;Template: …"></textarea></label>
        <small class="err" id="imp-err" role="alert"></small>
        <div class="drow"><button class="btn primary" type="submit">Read message</button><button class="btn" type="button" id="imp-clear">Clear</button></div></form></div></section>
      <section class="panel"><div class="panel-h"><h3>2 · Check and add</h3></div><div class="panel-b" id="imp-out"><p class="muted">The order details will appear here.</p></div></section>
    </div>
    <p class="muted" style="font-size:.82rem;margin-top:16px">${PREVIEW ? "Preview mode: added orders stay in this tab only and disappear when you reload. Keep WhatsApp as your record until a backend is connected." : "Added orders are saved to the backend."}</p>`;
    let parsed = null;
    $("#imp-form").addEventListener("submit", e => {
      e.preventDefault(); $("#imp-err").textContent = "";
      try { parsed = D.parseWhatsAppOrder($("#imp-text").value); }
      catch (err) { parsed = null; $("#imp-err").textContent = err.message; $("#imp-out").innerHTML = '<p class="muted">Nothing to add yet.</p>'; return; }
      const c = parsed.customer;
      $("#imp-out").innerHTML = `<dl class="kv">
        <div><dt>Reference</dt><dd>${esc(parsed.ref)}</dd></div><div><dt>Name</dt><dd>${esc(c.name)}</dd></div>
        <div><dt>Business</dt><dd>${esc(c.business || "—")}</dd></div><div><dt>Email</dt><dd>${esc(c.email || "—")}</dd></div>
        <div><dt>WhatsApp</dt><dd>${esc(c.whatsapp)}</dd></div><div><dt>Template</dt><dd>${esc(tplName(parsed.templateId))}${tplOf(parsed.templateId) ? "" : ' <span class="muted">(not in catalogue)</span>'}</dd></div></dl>
        <h3 style="font-size:.8rem;margin:16px 0 8px;font-family:var(--text);color:var(--gray-2);letter-spacing:.1em;text-transform:uppercase">Requirements</h3><div class="txt">${esc(parsed.requirements || "—")}</div>
        <div class="drow" style="margin-top:16px"><button class="btn primary" type="button" id="imp-add">Add to orders</button></div>`;
      $("#imp-add").addEventListener("click", async () => {
        try { await api.addOrder(parsed); await reload(); toast("Order " + parsed.ref + " added" + (PREVIEW ? " (this tab only)" : "")); location.hash = "#/orders/" + encodeURIComponent(parsed.ref); }
        catch (err) { $("#imp-err").textContent = err.message; }
      });
    });
    $("#imp-clear").addEventListener("click", () => { $("#imp-text").value = ""; $("#imp-err").textContent = ""; $("#imp-out").innerHTML = '<p class="muted">The order details will appear here.</p>'; parsed = null; });
  }

  /* ---------------------------------------------------------------- backend status */
  function renderBackend() {
    setTitle("Backend status");
    const yes = '<span class="ok-dot">Works now</span>', no = '<span class="no-dot">Needs backend</span>';
    const rows = [
      ["Order page, validation, order reference", "Customers fill in the order page; a reference like KT-261122-7Q4M is generated in their browser.", yes],
      ["WhatsApp hand-off", "The order message opens in the customer's WhatsApp addressed to " + esc(window.KT_CONTACT.phone) + ". You receive it only when they press Send.", yes],
      ["Dashboard interface, search, filters, order details", "Fully working on sample data or on orders you paste in.", yes],
      ["Template catalogue export", "Edit names, prices and descriptions, then download an updated templates-data.js to commit to GitHub.", yes],
      ["Saving orders permanently", "Orders need a database (e.g. PostgreSQL) so they survive reloads and are visible on every device.", no],
      ["Receiving orders automatically", "The order page would POST to an API endpoint instead of relying only on WhatsApp.", no],
      ["Admin sign-in and access control", "This page is public on GitHub Pages. Real customer data must only be served by a backend after a secure login.", no],
      ["Status changes and notes that persist", "PATCH /orders/:id stores the status history in the database.", no],
      ["Template edits without re-uploading files", "PATCH /templates/:id, plus a public GET /templates the store reads.", no],
      ["Email notifications", "Server-side email to you on each new order and to the customer on status changes.", no]
    ];
    view.innerHTML = `
    <div class="ph"><div><h2>Backend status</h2><p class="muted">What works on GitHub Pages today, and what requires a secure server and database.</p></div></div>
    <div class="kpis three">
      <div class="kpi"><span>Mode</span><b style="font-size:1.3rem">${PREVIEW ? "Preview" : "Connected"}</b><small>${PREVIEW ? "KT_API.baseUrl is not set" : esc(window.KT_API.baseUrl)}</small></div>
      <div class="kpi"><span>Order channel</span><b style="font-size:1.3rem">WhatsApp</b><small>${esc(window.KT_CONTACT.phone)}</small></div>
      <div class="kpi"><span>Customer data stored in this browser</span><b style="font-size:1.3rem">None</b><small>No localStorage, cookies or uploads</small></div>
    </div>
    <section class="panel"><div class="tbl-wrap"><table class="tbl feat-tbl"><thead><tr><th>Feature</th><th>How it works</th><th>Status</th></tr></thead><tbody>
      ${rows.map(r => `<tr style="cursor:default"><td>${r[0]}</td><td class="muted">${r[1]}</td><td>${r[2]}</td></tr>`).join("")}
    </tbody></table></div></section>
    <section class="panel" style="margin-top:20px"><div class="panel-h"><h3>Connecting a backend later</h3></div><div class="panel-b" style="display:grid;gap:12px">
      <p>1. Build the API described in <a class="link" href="https://github.com/rsraju6734/khoka-tech/blob/main/docs/BACKEND.md" target="_blank" rel="noopener">docs/BACKEND.md</a> (endpoints, database tables, security rules).</p>
      <p>2. Set the address in <code>assets/js/contact.js</code>:</p>
      <div class="code">window.KT_API = {\n  baseUrl: "https://api.your-domain.com/v1"\n};</div>
      <p>3. The dashboard switches to live mode automatically and stops showing sample data.</p>
    </div></section>`;
  }

  /* ---------------------------------------------------------------- router */
  const NAV = { overview: "overview", orders: "orders", templates: "templates", import: "import", backend: "backend" };
  async function route() {
    const h = location.hash.replace(/^#\/?/, "") || "overview";
    const [path, query] = h.split("?");
    const parts = path.split("/");
    const name = NAV[parts[0]] ? parts[0] : "overview";
    $$(".sb-nav a").forEach(a => { if (a.dataset.route === name) a.setAttribute("aria-current", "page"); else a.removeAttribute("aria-current"); });
    if (name !== "orders" || !parts[1]) { if (drawer.classList.contains("on")) closeDrawer(false); }
    if (name === "orders") {
      const qs = new URLSearchParams(query || "");
      if (qs.get("status")) filters.status = qs.get("status");
      const id = parts[1] ? decodeURIComponent(parts[1]) : null;
      // A link to a specific order must never land on a list that hides it.
      if (id && !filtered().some(o => o.id === id)) { Object.assign(filters, { q: "", status: "all", tpl: "all" }); $("#gsearch").value = ""; }
      renderOrders(id);
      if (id) openDrawer(id);
    } else if (name === "templates") renderTemplates();
    else if (name === "import") renderImport();
    else if (name === "backend") renderBackend();
    else renderOverview();
    if (!parts[1]) view.focus({ preventScroll: true });
  }

  (async function boot() {
    shell();
    try { await reload(); }
    catch (err) { view.innerHTML = `<div class="panel panel-b"><h2 style="font-size:1.2rem">Couldn't load data</h2><p class="muted" style="margin-top:8px">${esc(err.message)}</p></div>`; return; }
    window.addEventListener("hashchange", route);
    route();
  })();
})();
