/* Horizon Estates — homepage: finder, featured, listings with filters, agents. */
(function () {
  "use strict";
  const { $, $$ } = Kit, { D, card, agent, esc } = HE, P = D.properties;
  const uniq = a => [...new Set(a)];
  const state = { status: "all", city: "all", type: "all", beds: 0, q: "", sort: "feat" };

  // fill selects from the data
  $("#f-city").insertAdjacentHTML("beforeend", uniq(P.map(p => p.city)).map(c => `<option>${esc(c)}</option>`).join(""));
  $("#f-type").insertAdjacentHTML("beforeend", uniq(P.map(p => p.type)).map(t => `<option>${esc(t)}</option>`).join(""));
  $("#c-prop").insertAdjacentHTML("beforeend", P.map(p => `<option>${esc(p.name)} — ${esc(p.area)}</option>`).join(""));

  $("#feat").innerHTML = P.filter(p => p.featured).slice(0, 3).map((p, i) => card(p, i === 0 ? "big" : "")).join("");
  $("#agent-grid").innerHTML = Object.keys(D.agents).map(id => agent(id)).join("");

  function render() {
    const q = state.q.toLowerCase().trim();
    let list = P.filter(p => (state.status === "all" || p.status === state.status) && (state.city === "all" || p.city === state.city) &&
      (state.type === "all" || p.type === state.type) && p.beds >= state.beds && (!q || [p.name, p.area, p.city, p.type, p.summary].join(" ").toLowerCase().includes(q)));
    // compare sale prices with sale and rent with rent; rent first when mixed and sorting by price
    const s = { feat: (a, b) => (b.featured | 0) - (a.featured | 0), low: (a, b) => a.price - b.price, high: (a, b) => b.price - a.price, size: (a, b) => b.sqft - a.sqft }[state.sort];
    list = list.slice().sort(s);
    $("#cards").innerHTML = list.map(p => card(p)).join("");
    Kit.reveal($("#cards"));
    $("#none").hidden = list.length > 0;
    $("#ls-count").textContent = `${list.length} of ${P.length} properties`;
    $$(".seg [data-st]").forEach(b => b.setAttribute("aria-pressed", b.dataset.st === state.status));
  }

  $("#finder").addEventListener("submit", e => {
    e.preventDefault();
    Object.assign(state, { status: $("#f-status").value, city: $("#f-city").value, type: $("#f-type").value, beds: +$("#f-beds").value });
    render(); $("#listings").scrollIntoView({ behavior: "smooth" });
  });
  $(".seg").addEventListener("click", e => { const b = e.target.closest("[data-st]"); if (b) { state.status = b.dataset.st; $("#f-status").value = state.status; render(); } });
  let t; $("#ls-q").addEventListener("input", e => { clearTimeout(t); t = setTimeout(() => { state.q = e.target.value; render(); }, 120); });
  $("#ls-sort").addEventListener("change", e => { state.sort = e.target.value; render(); });
  $("#clear").addEventListener("click", () => { Object.assign(state, { status: "all", city: "all", type: "all", beds: 0, q: "" }); ["#f-status", "#f-city", "#f-type"].forEach(s => $(s).value = "all"); $("#f-beds").value = "0"; $("#ls-q").value = ""; render(); });
  render();
})();
