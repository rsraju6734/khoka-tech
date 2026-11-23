/* Nexora Technologies — case study filters + detail dialog, header state. */
(function () {
  "use strict";
  const { $, $$ } = Kit;
  const esc = s => String(s).replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  const CASES = [
    { id: "travel", cat: "web", kind: "Web platform · Travel", title: "Booking platform for a regional tour operator", img: "workstation", alt: "Workspace with a laptop, monitor and keyboard",
      sum: "A new customer booking site and staff dashboard replacing a decade-old system.",
      ch: "Bookings ran through spreadsheets and email. Staff re-typed every order and customers waited a day for confirmation.",
      so: "A React booking site with live availability, a Node.js API and a staff dashboard for changes and refunds — released in stages so operations never stopped.",
      stack: ["React", "Node.js", "PostgreSQL", "AWS"] },
    { id: "logistics", cat: "cloud", kind: "Cloud & DevOps · Logistics", title: "Moving a logistics company to the cloud", img: "building", alt: "Glass office building interior",
      sum: "Migration from on-premise servers to AWS with automated deployments and monitoring.",
      ch: "Servers in a back room, manual deployments on weekends and no alerts when something failed.",
      so: "Infrastructure as code, a CI/CD pipeline with automated tests, and dashboards with on-call alerts. Deployments now happen during the working day.",
      stack: ["AWS", "Terraform", "Docker", "GitHub Actions"] },
    { id: "support-ai", cat: "ai", kind: "AI integration · Retail", title: "Customer-support assistant for an online retailer", img: "sticky", alt: "Sticky notes from a planning session",
      sum: "An assistant that answers order and product questions using the retailer's own data.",
      ch: "The support team answered the same delivery and returns questions hundreds of times a week.",
      so: "A retrieval-based assistant connected to the order system and help centre, with human hand-off for anything it can't answer confidently.",
      stack: ["Python", "LLM API", "Vector search", "React"] },
    { id: "clinic", cat: "web", kind: "Web & mobile · Healthcare", title: "Appointment app for a group of clinics", img: "code", alt: "Code on a computer screen",
      sum: "Online appointments, reminders and a doctor schedule view across five clinics.",
      ch: "Phone lines were always busy and missed appointments cost the clinics every day.",
      so: "A Flutter app and web portal for booking, SMS reminders and a shared schedule — integrated with the clinics' existing billing system.",
      stack: ["Flutter", "Node.js", "PostgreSQL", "SMS gateway"] }
  ];

  let filter = "all";
  function render() {
    const list = CASES.filter(c => filter === "all" || c.cat === filter);
    $("#cases").innerHTML = list.map((c, i) => `<article class="case ${i === 0 && filter === "all" ? "wide" : ""}">
      <button type="button" class="case-btn" data-case="${c.id}" aria-label="Open case study: ${esc(c.title)}">
        <span class="ph"><img src="img/${c.img}.webp" alt="${esc(c.alt)}" loading="lazy" width="1000" height="667"></span>
        <span class="case-b"><span class="kind">${esc(c.kind)}</span><b>${esc(c.title)}</b><span class="sum">${esc(c.sum)}</span><span class="more">Read case study →</span></span>
      </button></article>`).join("");
    $$("#filters [data-f]").forEach(b => b.setAttribute("aria-pressed", b.dataset.f === filter));
  }
  $("#filters").addEventListener("click", e => { const b = e.target.closest("[data-f]"); if (b) { filter = b.dataset.f; render(); } });
  render();

  const dlg = $("#case-dlg");
  $("#cases").addEventListener("click", e => {
    const b = e.target.closest("[data-case]"); if (!b) return;
    const c = CASES.find(x => x.id === b.dataset.case);
    $("#cd-img").src = `img/${c.img}.webp`; $("#cd-img").alt = c.alt;
    $("#cd-kind").textContent = c.kind; $("#cd-h").textContent = c.title; $("#cd-sum").textContent = c.sum;
    $("#cd-ch").textContent = c.ch; $("#cd-so").textContent = c.so;
    $("#cd-stack").innerHTML = c.stack.map(s => `<span>${esc(s)}</span>`).join("");
    if (typeof dlg.showModal === "function") dlg.showModal(); else dlg.setAttribute("open", "");
  });
  dlg.addEventListener("click", e => { if (e.target === dlg) dlg.close(); });

  /* header background after scrolling */
  const hdr = $("#hdr"), on = () => hdr.classList.toggle("solid", scrollY > 20);
  addEventListener("scroll", on, { passive: true }); on();
})();
