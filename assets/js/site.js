/* KHOKA TECH — site.js (inner pages)
   Adds the pull-cord light/dark switch used on the homepage. The choice is kept in localStorage ("kt-theme"),
   which holds only "light" or "dark" — no personal data. The <head> of each page applies it before paint. */
(function () {
  var root = document.documentElement;
  var meta = document.querySelector('meta[name="theme-color"]');
  var label = { en: "Switch light and dark mode", bn: "লাইট ও ডার্ক মোড বদলান", hi: "लाइट और डार्क मोड बदलें" };
  var cord = document.createElement("button");
  cord.className = "cord"; cord.type = "button";
  cord.innerHTML = '<span class="sr"></span><span class="cord-line" aria-hidden="true"></span><span class="cord-knob" aria-hidden="true"></span>';
  function setLabel() { cord.querySelector(".sr").textContent = label[root.lang] || label.en; }
  function apply(dark) {
    root.classList.toggle("dark", dark);
    cord.setAttribute("aria-pressed", dark ? "true" : "false");
    if (meta) meta.content = dark ? "#141312" : "#EFEBE4";
  }
  cord.addEventListener("click", function () {
    var dark = !root.classList.contains("dark");
    apply(dark);
    try { localStorage.setItem("kt-theme", dark ? "dark" : "light"); } catch (e) {}
    cord.classList.remove("pull"); void cord.offsetWidth; cord.classList.add("pull");
  });
  setLabel(); apply(root.classList.contains("dark"));
  new MutationObserver(setLabel).observe(root, { attributes: true, attributeFilter: ["lang"] });
  document.body.appendChild(cord);
})();
