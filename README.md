# KHOKA TECH — Studio website, template store & order system (v4)

Static site: HTML5, CSS3 and vanilla JavaScript. No build step, no paid services. Runs on GitHub Pages:
https://rsraju6734.github.io/khoka-tech/

## Structure
```
khoka-tech/
├── index.html                      Studio homepage (EN / বাংলা / हिन्दी)
├── README.md
├── admin/
│   └── index.html                  Admin dashboard (Preview mode until a backend is connected)
├── docs/
│   └── BACKEND.md                  What needs a server, database schema, API contract, security checklist
├── templates/
│   ├── index.html                  Template store: search, categories, sort
│   ├── details.html                Product page → details.html?id=<id>
│   ├── order.html                  Order page   → order.html?id=<id>  (template pre-selected)
│   └── demos/                      Six live demos (business, ecommerce, education, portfolio, restaurant, agency)
└── assets/
    ├── css/
    │   ├── style.css               Brand system, header/footer, homepage
    │   ├── marketplace.css         Store, product page, order page
    │   ├── admin.css               Admin dashboard
    │   └── demo.css                Demo plumbing only
    ├── js/
    │   ├── contact.js              ★ CENTRAL CONFIG: email, business WhatsApp number, order prefix, API address
    │   ├── templates-data.js       ★ Template catalogue
    │   ├── main.js                 Homepage
    │   ├── marketplace.js          Store + product page + order page (3 languages)
    │   ├── admin-data.js           Admin data layer: Preview adapter, HTTP adapter (backend contract), message parser
    │   ├── admin.js                Admin dashboard UI
    │   └── demo.js                 Demo bar, mobile nav, filters, demo forms
    └── images/
        ├── templates/*.svg         Template thumbnails
        └── projects/shikbolab.svg  Featured project preview
```

## Order flow (works today)
1. Every **Order** button (store cards, product page, homepage, demo bar) opens `templates/order.html?id=<template>`.
2. The customer fills in name, email, WhatsApp, business (optional), requirements and a message (optional).
3. After validation the page creates a reference such as `KT-261122-7Q4M` and a formatted message.
4. **Open WhatsApp** starts a chat with the number in `contact.js`, with the message filled in.
   The page states clearly that the request is **not sent until the customer presses Send** in WhatsApp.
   Copy and email fall-backs are offered. Nothing is stored by the website.

To change the business WhatsApp number, edit `whatsapp` in `assets/js/contact.js` (digits only, with country code).

## Admin dashboard — `admin/`
Overview (KPIs, status breakdown, orders by template), order list with search + status/template filters, order
details drawer (customer info, requirements, status change, activity, Reply on WhatsApp), template manager with
**Download templates-data.js**, and **Add from WhatsApp** (paste a received order message to read it).

**Preview mode:** with no backend (`KT_API.baseUrl = null`), the dashboard shows fictional sample orders. Changes last
only until the tab is reloaded. No customer data is written to localStorage, cookies or any server, and no real
customer data exists in any JavaScript file. The page is not linked from the public site and is marked `noindex`,
but it is publicly reachable — real protection must come from a backend login. See `docs/BACKEND.md`.

| Works now | Needs a backend |
|---|---|
| Order page, validation, reference, WhatsApp hand-off | Saving orders permanently |
| Dashboard UI, search, filters, details, status UI | Receiving orders automatically |
| Paste-import of WhatsApp orders (tab only) | Admin login / access control |
| Template catalogue export | Status history across devices, email notifications |

## Run locally
`python -m http.server 8000` in this folder → http://localhost:8000 (or double-click `index.html`).

## Test checklist
1. Store → **Order** on any card → order page shows that template and its demo price.
2. Submit empty → errors; fill in → reference + message preview → **Open WhatsApp** opens wa.me with the text.
3. Product page **Order this template**, homepage **Order**, demo bar **Order this template** → same order page.
4. `admin/`: filters, search, open an order, change status, Templates → Edit → Download, Add from WhatsApp
   (paste a message from step 2).

## Deploy / update on GitHub Pages
Upload the changed files (keep the folder structure) to the `khoka-tech` repository, or `git add . && git commit -m "Update" && git push`.
New folders in this version: `admin/`, `docs/`, plus `templates/order.html`, `assets/css/admin.css`,
`assets/js/admin-data.js`, `assets/js/admin.js`. Do not upload the local `.claude/` folder.
