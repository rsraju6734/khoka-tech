/* LearnSphere — enrolment dialog shared by index.html and course.html.
   Any element with data-enroll opens it; data-enroll="course-id" pre-selects a course. */
window.Enroll = (function () {
  "use strict";
  const { $ } = Kit, C = window.LS.courses;
  const dlg = $("#enroll"), sel = $("#en-course");
  sel.insertAdjacentHTML("beforeend", C.map(c => `<option value="${c.id}">${c.title} — ৳${c.fee.toLocaleString("en-IN")}</option>`).join(""));
  function open(id) {
    if (id) sel.value = id;
    const st = $("#en-form .f-status"); if (st) st.hidden = true;
    if (typeof dlg.showModal === "function") dlg.showModal(); else dlg.setAttribute("open", "");
    (id ? $("#en-name") : sel).focus();
  }
  document.addEventListener("click", e => { const b = e.target.closest("[data-enroll]"); if (b) { e.preventDefault(); open(b.dataset.enroll); } });
  dlg.addEventListener("click", e => { if (e.target === dlg) dlg.close(); });
  /* small toast buttons used in the dashboard preview */
  document.addEventListener("click", e => { const t = e.target.closest("[data-toast]"); if (t) Kit.toast(t.dataset.toast); });
  return { open };
})();
