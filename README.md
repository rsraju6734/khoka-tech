# KHOKA TECH — Studio website + KHOKA TEMPLATES store (v3)

Static site: HTML5, CSS3 and vanilla JavaScript. No backend, no build step, no paid services.
Works on GitHub Pages and by double-clicking `index.html`.

## Structure
```
khoka-tech/
├── index.html                      Studio homepage (EN / বাংলা / हिन्दी)
├── README.md
├── templates/
│   ├── index.html                  Template store: search, categories, sort
│   ├── details.html                Product page → details.html?id=<id>  (&order=1 opens the order form)
│   └── demos/
│       ├── business.html           Nexora Advisory   — serif, ivory/forest/brass
│       ├── ecommerce.html          Bazaar & Co.      — Archivo, homeware shop with working bag
│       ├── education.html          EduSphere Academy — Figtree, timetable + course catalogue
│       ├── portfolio.html          Folio Mono        — Instrument Serif, project index, dark mode
│       ├── restaurant.html         Saffron Table     — Cormorant, printed menu, reservations
│       └── agency.html             Pixelforge Studio — Bricolage Grotesque, Swiss grid
└── assets/
    ├── css/
    │   ├── style.css               Brand system: tokens, type, grid, header/footer, homepage
    │   ├── marketplace.css         Store, product page, order dialog
    │   └── demo.css                Demo plumbing only (no visual design — see below)
    ├── js/
    │   ├── templates-data.js       ★ Template catalogue: copy, palette, fonts, sections, price
    │   ├── main.js                 Homepage text (3 languages), projects, form
    │   ├── marketplace.js          Store + product page + order form (3 languages)
    │   └── demo.js                 Demo bar, mobile nav, accordions, filters, demo forms
    └── images/
        ├── favicon.svg, logo-horizontal.svg
        └── templates/*.svg         One thumbnail per template, drawn from its real layout
```

## Design system (KHOKA TECH)
- Colours: Midnight `#080D19` page, Deep Navy `#101F40` used for one band only, Electric Blue `#2675F5`
  for actions, Sky Blue `#55A0FF` for links and small markers, Soft Gray `#A6B0C3` for body copy.
- Type: Manrope (display) + Inter (text); Noto Sans Bengali / Devanagari for বাংলা and हिन्दी.
- Layout: 12-column grid (`.g12`), hairline rules instead of boxed cards, 6px corners, numbered section labels.
- Each demo has its **own** palette, typefaces and components inside its `<style>` block. `demo.css` only holds
  shared mechanics (reset, KHOKA demo bar, reveal, form messages) so the demos never drift toward one look.

## Run locally
- Double-click `index.html`, or
- `python -m http.server 8000` in this folder → http://localhost:8000, or VS Code **Live Server**.

## Test checklist
1. Homepage: language switcher (persists to the store), mobile menu, contact form (submit empty → errors).
2. `templates/`: search (`menu`, `shop`, `serif`), category list, sort; the URL keeps `?cat=&q=&sort=`.
3. Product page: Desktop / Tablet / Mobile preview, **Order this template** → validation → demo summary.
4. Each demo: mobile menu, forms (empty submit), plus
   - Business: practice-area accordion · E-commerce: category tabs, search, sort, bag quantities, free-delivery bar
   - Education: hero search, subject tabs, Enrol pre-selects course · Portfolio: filter, cursor preview, case dialog, dark mode
   - Restaurant: menu tabs, past dates rejected · Agency: service/budget chips, process line animation

## Honesty rules built in
- All prices are labelled **demo price**; no payment is taken anywhere.
- Every form validates in the browser only. Nothing is stored or sent.
- Demo brands, people, articles and figures are labelled as samples. No reviews, ratings or awards are invented.
- Footer contact details and social links are placeholders — replace them before launch.

## Add a template
1. Add an object to `assets/js/templates-data.js` (id, name, category, price, paper/ink/accent, palette, fonts,
   short/long/sections/features in en/bn/hi).
2. Create `templates/demos/<id>.html` with `<body data-template="<id>" data-name="…">` and its own `<style>`.
3. Add `assets/images/templates/<id>.svg` (640×400).

## Deploy on GitHub Pages
1. Create a public repository, upload the folder contents so `index.html` is at the root (or `git push`).
2. **Settings → Pages → Deploy from a branch → `main` / root → Save.**
3. Live after about a minute at `https://<username>.github.io/<repo>/`. All links are relative.
