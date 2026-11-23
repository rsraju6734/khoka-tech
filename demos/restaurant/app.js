/* The Urban Plate — menu, categories, gallery lightbox, header and reservation times. */
(function () {
  "use strict";
  const { $, $$, money } = Kit;

  const CATS = [
    { id: "burgers", name: "Burgers" }, { id: "pizza", name: "Pizza" }, { id: "pasta", name: "Pasta" },
    { id: "grill", name: "From the grill" }, { id: "salads", name: "Salads" }, { id: "desserts", name: "Desserts" }, { id: "drinks", name: "Coffee" }
  ];
  const MENU = [
    { c: "burgers", img: "burger", alt: "Burger with fries", name: "The Urban Smash", desc: "Two smashed beef patties, aged cheddar, pickles, house sauce, brioche bun. Served with fries.", price: 890, tags: ["Bestseller"] },
    { c: "burgers", img: "burger2", alt: "Cheeseburger with melted cheese on a brioche bun", name: "Classic Cheeseburger", desc: "Grilled beef patty, double American cheese, lettuce, tomato, toasted brioche.", price: 760, tags: [] },
    { c: "pizza", img: "pizza", alt: "Wood-fired pizza topped with fresh basil", name: "Garden Pizza", desc: "Tomato, fior di latte, roasted peppers, olives and fresh basil. 48-hour fermented dough.", price: 980, tags: ["Vegetarian"] },
    { c: "pizza", img: "pizza2", alt: "Margherita pizza coming out of a wood-fired oven", name: "Margherita DOP", desc: "San Marzano tomato, fior di latte, basil, extra-virgin olive oil — straight from the oven.", price: 920, tags: ["Vegetarian"] },
    { c: "pasta", img: "pasta", alt: "Spaghetti with beef ragù in a dark bowl", name: "Spaghetti Bolognese", desc: "Slow-cooked beef ragù, parmesan and basil over fresh spaghetti.", price: 820, tags: [] },
    { c: "pasta", img: "pasta2", alt: "Tagliatelle with herbs in a black bowl", name: "Wild Mushroom Tagliatelle", desc: "Fresh egg tagliatelle, sautéed mushrooms, garlic, herbs and a light cream sauce.", price: 890, tags: ["Vegetarian"] },
    { c: "grill", img: "steak", alt: "Sliced steak on a tray", name: "Sirloin, 250 g", desc: "Grass-fed sirloin, roasted garlic butter, grilled vegetables.", price: 2150, tags: ["Chef's pick"] },
    { c: "grill", img: "steak2", alt: "Steak with fries and salad", name: "Smoked Ribeye, 300 g", desc: "Dry-aged ribeye, chimichurri, hand-cut fries, market salad.", price: 2450, tags: ["Chef's special"] },
    { c: "salads", img: "salad", alt: "Bowl of fresh vegetables", name: "Garden Grain Bowl", desc: "Quinoa, roasted pumpkin, avocado, pickled onion, tahini dressing.", price: 640, tags: ["Vegetarian"] },
    { c: "salads", img: "salad2", alt: "Colourful bowl of salad with avocado and radish", name: "Market Rainbow Salad", desc: "Leaves, avocado, radish, cherry tomatoes, roasted chickpeas and a lemon-herb dressing.", price: 680, tags: ["Vegetarian"] },
    { c: "desserts", img: "dessert", alt: "Chocolate cake with ice cream", name: "Warm Chocolate Fondant", desc: "Molten centre, vanilla bean ice cream.", price: 520, tags: ["Bestseller"] },
    { c: "desserts", img: "dessert2", alt: "Chocolate layer cake", name: "Triple Chocolate Cake", desc: "Dark, milk and white chocolate layers with ganache.", price: 480, tags: ["Vegetarian"] },
    { c: "desserts", img: "dessert3", alt: "Chocolate mousse in a glass topped with a strawberry", name: "Chocolate Mousse Cup", desc: "Silky dark chocolate mousse, fresh strawberry and a hint of mint.", price: 450, tags: ["Vegetarian"] },
    { c: "drinks", img: "coffee", alt: "Cappuccino in a mug", name: "Cappuccino", desc: "Double shot espresso, steamed milk. Oat milk available.", price: 320, tags: [] }
  ];
  const GALLERY = [
    { img: "dining", alt: "Guests dining in the restaurant", cls: "w2 h2" },
    { img: "bar", alt: "Bar counter with chairs" },
    { img: "cocktail", alt: "Warm lights over the bar area" },
    { img: "table", alt: "Friends sharing dishes at a round table", cls: "w2" },
    { img: "chef", alt: "Chef at work in the kitchen" },
    { img: "pizza", alt: "Wood-fired pizza with fresh basil" },
    { img: "room", alt: "Dining room with artwork" },
    { img: "dessert", alt: "Chocolate fondant with ice cream" }
  ];

  const esc = s => String(s).replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  const tagCls = t => /Vegetarian/.test(t) ? "tag veg" : /Spicy/.test(t) ? "tag hot" : "tag";

  /* categories → tiles */
  $("#cats").innerHTML = CATS.map(c => {
    const first = MENU.find(m => m.c === c.id), n = MENU.filter(m => m.c === c.id).length;
    return `<button class="cat" type="button" data-cat="${c.id}"><img src="img/${first.img}.webp" alt="" loading="lazy" width="1000" height="667"><span>${c.name}<small>${n} dish${n > 1 ? "es" : ""}</small></span></button>`;
  }).join("");

  /* menu tabs */
  let current = "all";
  function renderTabs() {
    $("#tabs").innerHTML = [{ id: "all", name: "All" }, ...CATS].map(c => `<button class="tab" type="button" role="tab" data-tab="${c.id}" aria-selected="${current === c.id}">${c.name}</button>`).join("");
  }
  function renderMenu() {
    const list = current === "all" ? MENU : MENU.filter(m => m.c === current);
    $("#menu-grid").innerHTML = list.map((m, i) => `<article class="dish" style="animation-delay:${i * 40}ms">
      <div class="ph"><img src="img/${m.img}.webp" alt="${esc(m.alt)}" loading="lazy" width="1000" height="667"></div>
      <div class="dish-b"><div class="dish-top"><h3>${esc(m.name)}</h3><span class="price">${money(m.price)}</span></div>
      <p>${esc(m.desc)}</p>${m.tags.length ? `<div class="tags">${m.tags.map(t => `<span class="${tagCls(t)}">${t}</span>`).join("")}</div>` : ""}</div></article>`).join("");
  }
  function select(id, scroll) {
    current = id; renderTabs(); renderMenu();
    if (scroll) $("#menu").scrollIntoView({ behavior: "smooth" });
  }
  $("#tabs").addEventListener("click", e => { const b = e.target.closest("[data-tab]"); if (b) select(b.dataset.tab); });
  $("#tabs").addEventListener("keydown", e => {
    if (!["ArrowLeft", "ArrowRight"].includes(e.key)) return;
    const ids = ["all", ...CATS.map(c => c.id)], i = ids.indexOf(current) + (e.key === "ArrowRight" ? 1 : -1);
    select(ids[(i + ids.length) % ids.length]); $(`[data-tab="${current}"]`).focus();
  });
  $("#cats").addEventListener("click", e => { const b = e.target.closest("[data-cat]"); if (b) select(b.dataset.cat, true); });
  select("all");

  /* gallery + lightbox */
  $("#gallery-grid").innerHTML = GALLERY.map((g, i) => `<button class="g-item ${g.cls || ""}" type="button" data-i="${i}" aria-label="View photo: ${esc(g.alt)}"><img src="img/${g.img}.webp" alt="${esc(g.alt)}" loading="lazy" width="1000" height="667"></button>`).join("");
  const lb = $("#lightbox"); let idx = 0, opener = null;
  function show(i) { idx = (i + GALLERY.length) % GALLERY.length; const g = GALLERY[idx]; $("#lb-img").src = `img/${g.img}.webp`; $("#lb-img").alt = g.alt; $("#lb-cap").textContent = `${g.alt} · ${idx + 1} / ${GALLERY.length}`; }
  function open(i) { opener = document.activeElement; show(i); lb.hidden = false; document.body.style.overflow = "hidden"; $("#lb-close").focus(); }
  function close() { lb.hidden = true; document.body.style.overflow = ""; if (opener) opener.focus(); }
  $("#gallery-grid").addEventListener("click", e => { const b = e.target.closest("[data-i]"); if (b) open(+b.dataset.i); });
  $("#lb-close").addEventListener("click", close);
  $("#lb-prev").addEventListener("click", () => show(idx - 1));
  $("#lb-next").addEventListener("click", () => show(idx + 1));
  lb.addEventListener("click", e => { if (e.target === lb) close(); });
  document.addEventListener("keydown", e => {
    if (lb.hidden) return;
    if (e.key === "Escape") close(); else if (e.key === "ArrowLeft") show(idx - 1); else if (e.key === "ArrowRight") show(idx + 1);
  });

  /* header becomes solid after the hero starts scrolling */
  const hdr = $("#hdr"), onScroll = () => hdr.classList.toggle("solid", scrollY > 60);
  addEventListener("scroll", onScroll, { passive: true }); onScroll();

  /* reservation time slots */
  const times = []; for (let h = 12; h <= 22; h++) for (const m of ["00", "30"]) if (!(h === 22 && m === "30")) times.push(`${String(h).padStart(2, "0")}:${m}`);
  $("#r-time").insertAdjacentHTML("beforeend", times.map(t => `<option>${t}</option>`).join(""));
})();
