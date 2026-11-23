/* Horizon Estates — property detail: gallery + lightbox, facts, features, EMI calculator, agent, viewing request. */
(function () {
  "use strict";
  const { $, $$ } = Kit, { D, esc, price, card, agent, icon } = HE, P = D.properties;
  const p = P.find(x => x.id === new URLSearchParams(location.search).get("id"));

  if (!p) {
    document.title = "Property not found — Horizon Estates";
    $("#crumbs").innerHTML = `<a href="index.html">Home</a><span>/</span><span>Not found</span>`;
    $("#prop").innerHTML = `<div class="none"><p><b>This property is no longer listed.</b></p><a class="btn btn-sm" href="index.html#listings">Browse all properties</a></div>`;
  } else {
    document.title = `${p.name}, ${p.area} — Horizon Estates | Demo by KHOKA TECH`;
    $('meta[name="description"]').setAttribute("content", `${p.name} in ${p.area}, ${p.city}: ${p.summary} Sample listing by Horizon Estates, a KHOKA TECH demo.`);
    $("#crumbs").innerHTML = `<a href="index.html">Home</a><span>/</span><a href="index.html#listings">Properties</a><span>/</span><span aria-current="page">${esc(p.name)}</span>`;
    const ph = p.photos;
    $("#prop").innerHTML = `
    <div class="d-head">
      <div><p class="pc-loc">${esc(p.area)}, ${esc(p.city)} · ${esc(p.type)} · <span class="pill ${p.status} inline">${p.status === "sale" ? "For sale" : "For rent"}</span></p><h1>${esc(p.name)}</h1></div>
      <div class="d-price"><span class="price">${price(p)}</span><a class="btn" href="#enquire">Book a viewing</a></div>
    </div>
    <div class="d-gallery">
      ${ph.map((x, i) => `<button type="button" class="ph dg-${i}" data-i="${i}" aria-label="View photo ${i + 1}: ${esc(x[1])}"><img src="img/${x[0]}.webp" alt="${esc(x[1])}" width="1400" height="933" ${i ? 'loading="lazy"' : 'fetchpriority="high"'}>${i === ph.length - 1 ? `<span class="all">View all ${ph.length} photos</span>` : ""}</button>`).join("")}
    </div>
    <div class="d-grid">
      <div class="d-main">
        <ul class="d-facts">
          <li>${icon.bed}<b>${p.beds}</b><span>Bedrooms</span></li><li>${icon.bath}<b>${p.baths}</b><span>Bathrooms</span></li>
          <li>${icon.area}<b>${p.sqft.toLocaleString("en-IN")}</b><span>Sq ft</span></li><li><b>${p.parking}</b><span>Parking</span></li><li><b>${p.year}</b><span>Built</span></li>
        </ul>
        <section><h2>About this home</h2>${p.desc.map(t => `<p>${esc(t)}</p>`).join("")}</section>
        <section><h2>Features</h2><ul class="feat-list">${p.features.map(f => `<li>${esc(f)}</li>`).join("")}</ul></section>
        ${p.status === "sale" ? `<section class="emi" aria-labelledby="emi-h"><h2 id="emi-h">Estimate monthly payments</h2>
          <div class="emi-grid">
            <label><span>Down payment</span><select id="e-down"><option value="20">20%</option><option value="30" selected>30%</option><option value="40">40%</option><option value="50">50%</option></select></label>
            <label><span>Interest rate (yearly)</span><select id="e-rate"><option>8</option><option selected>9</option><option>10</option><option>11</option><option>12</option></select></label>
            <label><span>Loan term</span><select id="e-years"><option value="10">10 years</option><option value="15">15 years</option><option value="20" selected>20 years</option><option value="25">25 years</option></select></label>
            <div class="emi-out"><span>Estimated EMI</span><b id="e-out"></b><small id="e-loan"></small></div>
          </div><p class="note">An estimate for illustration only — not a loan offer.</p></section>` : `<section><h2>Lease terms</h2><p>Minimum two-year lease. Two months' advance and a refundable security deposit. Utilities and service charge billed separately.</p></section>`}
      </div>
      <aside class="d-side" id="enquire" aria-labelledby="enq-h">
        <div class="side-card">
          ${agent(p.agent)}
          <form class="inq" data-demo-form data-success="Thank you — your viewing request for ${esc(p.name)} is ready. A live site would now notify ${esc(D.agents[p.agent].name)}.">
            <h3 id="enq-h">Request a viewing</h3>
            <div class="field"><label for="v-name">Full name</label><input id="v-name" autocomplete="name" required minlength="2"><small class="f-err"></small></div>
            <div class="field"><label for="v-phone">Phone</label><input id="v-phone" type="tel" autocomplete="tel" required><small class="f-err"></small></div>
            <div class="field"><label for="v-email">Email</label><input id="v-email" type="email" autocomplete="email" required><small class="f-err"></small></div>
            <div class="field"><label for="v-date">Preferred date</label><input id="v-date" type="date" data-min-today required><small class="f-err"></small></div>
            <div class="field"><label for="v-msg">Message</label><textarea id="v-msg" rows="3" maxlength="500">I'd like to arrange a viewing of ${esc(p.name)}.</textarea></div>
            <button class="btn btn-full" type="submit">Send request</button>
            <p class="f-status" role="status" hidden></p>
            <p class="demo-note">Demo mode: nothing is sent.</p>
          </form>
        </div>
      </aside>
    </div>`;

    /* EMI calculator (standard amortisation formula) */
    if (p.status === "sale") {
      const calc = () => {
        const loan = p.price * (1 - $("#e-down").value / 100), r = $("#e-rate").value / 1200, n = $("#e-years").value * 12;
        const emi = loan * r * Math.pow(1 + r, n) / (Math.pow(1 + r, n) - 1);
        $("#e-out").textContent = "৳" + Math.round(emi).toLocaleString("en-IN") + " /month";
        $("#e-loan").textContent = "Loan amount ৳" + Math.round(loan).toLocaleString("en-IN");
      };
      ["#e-down", "#e-rate", "#e-years"].forEach(s => $(s).addEventListener("change", calc)); calc();
    }

    /* lightbox */
    const lb = $("#lightbox"); let idx = 0, opener = null;
    const show = i => { idx = (i + ph.length) % ph.length; $("#lb-img").src = `img/${ph[idx][0]}.webp`; $("#lb-img").alt = ph[idx][1]; $("#lb-cap").textContent = `${ph[idx][1]} · ${idx + 1} / ${ph.length}`; };
    const open = i => { opener = document.activeElement; show(i); lb.hidden = false; document.body.style.overflow = "hidden"; $("#lb-close").focus(); };
    const close = () => { lb.hidden = true; document.body.style.overflow = ""; if (opener) opener.focus(); };
    $(".d-gallery").addEventListener("click", e => { const b = e.target.closest("[data-i]"); if (b) open(+b.dataset.i); });
    $("#lb-close").addEventListener("click", close); $("#lb-prev").addEventListener("click", () => show(idx - 1)); $("#lb-next").addEventListener("click", () => show(idx + 1));
    lb.addEventListener("click", e => { if (e.target === lb) close(); });
    document.addEventListener("keydown", e => { if (lb.hidden) return; if (e.key === "Escape") close(); else if (e.key === "ArrowLeft") show(idx - 1); else if (e.key === "ArrowRight") show(idx + 1); });
  }
  $("#more").innerHTML = P.filter(x => !p || x.id !== p.id).slice(0, 3).map(x => card(x)).join("");
  Kit.reveal(document);
})();
