/* Horizon Estates — shared helpers for index.html and property.html. */
window.HE = (function () {
  "use strict";
  const { $ } = Kit, D = window.HORIZON;
  const esc = s => String(s).replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  /* ৳12.5 Cr / ৳3.5 lakh/month */
  function price(p) {
    if (p.status === "rent") return `৳${(p.price / 100000).toLocaleString("en-IN", { maximumFractionDigits: 1 })} lakh<small>/month</small>`;
    return p.price >= 10000000 ? `৳${(p.price / 10000000).toLocaleString("en-IN", { maximumFractionDigits: 2 })} Cr` : `৳${(p.price / 100000).toLocaleString("en-IN")} lakh`;
  }
  const icon = {
    bed: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 18V8M3 14h18v4M21 14v-2a3 3 0 00-3-3h-7v5"/><circle cx="7" cy="11" r="1.6"/></svg>',
    bath: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 12h16v2a5 5 0 01-5 5H9a5 5 0 01-5-5zM6 12V6a2 2 0 014 0"/></svg>',
    area: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 4h16v16H4zM4 9h5V4M20 15h-5v5"/></svg>'
  };
  function card(p, cls = "") {
    return `<article class="pcard ${cls} rv">
      <a class="ph pc-img" href="property.html?id=${p.id}" aria-label="${esc(p.name)}, ${esc(p.area)}"><img src="img/${p.photos[0][0]}.webp" alt="${esc(p.photos[0][1])}" loading="lazy" width="1400" height="933"><span class="pill ${p.status}">${p.status === "sale" ? "For sale" : "For rent"}</span></a>
      <div class="pc-b">
        <p class="pc-loc">${esc(p.area)}, ${esc(p.city)} · ${esc(p.type)}</p>
        <h3><a href="property.html?id=${p.id}">${esc(p.name)}</a></h3>
        <p class="pc-sum">${esc(p.summary)}</p>
        <ul class="facts"><li>${icon.bed}${p.beds} beds</li><li>${icon.bath}${p.baths} baths</li><li>${icon.area}${p.sqft.toLocaleString("en-IN")} sq ft</li></ul>
        <div class="pc-f"><span class="price">${price(p)}</span><a class="lnk" href="property.html?id=${p.id}">View details →</a></div>
      </div></article>`;
  }
  function agent(id, compact) {
    const a = D.agents[id];
    return `<div class="agent${compact ? " compact" : ""}"><span class="av" aria-hidden="true">${a.initials}</span><div><b>${esc(a.name)}</b><span>${esc(a.role)}</span>${compact ? "" : `<p>${esc(a.phone)}<br>${esc(a.email)}</p>`}</div></div>`;
  }
  /* header: transparent over photo heroes, solid after scrolling */
  const hdr = $("#hdr");
  if (hdr && document.body.classList.contains("photo-top") || $(".hero")) {
    const on = () => hdr.classList.toggle("solid", scrollY > 40);
    addEventListener("scroll", on, { passive: true }); on();
  } else if (hdr) hdr.classList.add("solid");
  return { D, esc, price, card, agent, icon };
})();
