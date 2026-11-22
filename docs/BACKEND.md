# KHOKA TECH — Backend guide (orders & admin)

The public website runs on GitHub Pages, which can only serve static files. It cannot store data, check passwords
or keep anything private. This document lists what works today without a server, what needs a backend,
and the exact API the admin dashboard (`admin/`) is already written to use.

---

## 1. What works today (no backend)

| Feature | Where | Notes |
|---|---|---|
| Order page with validation | `templates/order.html` | Name, email, WhatsApp, business, template, requirements, message |
| Order reference | browser | `KT-YYMMDD-XXXX`, generated with `crypto.getRandomValues` |
| WhatsApp hand-off | `wa.me` link | Message is addressed to `KT_CONTACT.whatsapp` in `assets/js/contact.js`. You receive it only when the customer presses **Send**. |
| Admin dashboard UI | `admin/` | Overview, orders, filters, details, status changes, templates, import |
| Import from WhatsApp | `admin/#/import` | Paste a received order message; fields are parsed. Kept in that tab only. |
| Catalogue export | `admin/#/templates` | Edit and download a new `templates-data.js`, then commit it to GitHub |

**Nothing is persisted.** The dashboard runs in *Preview mode* with fictional sample orders. It never writes to
`localStorage`, cookies or any server, so no customer data sits in a public browser store or in a JavaScript file.

## 2. What requires a backend

| Feature | Why a server is needed |
|---|---|
| Saving orders | Needs a database; the browser is not a safe or shared place for customer data |
| Receiving orders automatically | The order page must `POST` to an API you control |
| Admin login | Passwords and sessions must be checked server-side; `admin/` is publicly downloadable |
| Status history across devices | Stored per order in the database |
| Editing templates without re-uploading files | API + database for the catalogue |
| Email notifications | Server-side email sending (API keys must never be in frontend code) |

## 3. Recommended stacks (free tiers available)

1. **Supabase** (PostgreSQL + Auth + Row Level Security + Edge Functions) — fastest route. Use Supabase Auth for the
   admin login and RLS so only authenticated admins can read orders. The public order page may only `insert`.
2. **Node.js (Express/Fastify) + PostgreSQL** on Render, Railway or Fly.io — full control.
3. **Firebase** (Firestore + Auth + Cloud Functions) — also workable; write strict security rules.

> Tip: put the API and the admin on the same site (e.g. `api.khokatech.com` and `admin.khokatech.com` behind a
> custom domain) so the secure session cookie is first-party. Cross-site cookies from `github.io` are blocked by
> some browsers.

## 4. Data model

```sql
create table templates (
  id          text primary key,            -- 'business', 'ecommerce', …
  name        text not null,
  category    text not null,
  price       integer not null,            -- list price in USD (demo price on the site)
  short_en    text not null,
  published   boolean not null default true,
  updated_at  timestamptz not null default now()
);

create table orders (
  id            text primary key,          -- order reference, e.g. KT-261122-7Q4M
  created_at    timestamptz not null default now(),
  status        text not null default 'new'
                check (status in ('new','contacted','discussion','confirmed','completed','cancelled')),
  template_id   text references templates(id),
  customer_name text not null,
  business_name text,
  email         text not null,
  whatsapp      text not null,
  requirements  text not null,
  note          text,
  source        text not null default 'web' -- 'web' | 'whatsapp-import'
);

create table order_events (
  id         bigserial primary key,
  order_id   text not null references orders(id) on delete cascade,
  status     text not null,
  note       text,
  admin_id   uuid,
  at         timestamptz not null default now()
);

create table admins (
  id            uuid primary key,
  email         text unique not null,
  password_hash text not null,             -- argon2id / bcrypt; or use the provider's auth instead
  created_at    timestamptz not null default now()
);
```

## 5. API contract (already used by `assets/js/admin-data.js` → `HttpAdapter`)

Base URL is set in `assets/js/contact.js`:

```js
window.KT_API = { baseUrl: "https://api.your-domain.com/v1" };
```

All admin requests are sent with `credentials: "include"` and must be authorised by an **HttpOnly, Secure,
SameSite** session cookie. A missing or expired session returns `401`.

| Method | Path | Auth | Body / query | Returns |
|---|---|---|---|---|
| `POST` | `/auth/login` | – | `{ email, password }` | sets session cookie |
| `POST` | `/auth/logout` | admin | – | clears cookie |
| `GET` | `/templates` | public | – | `Template[]` |
| `PATCH` | `/templates/:id` | admin | `{ name?, price?, shortEn? }` | `Template` |
| `POST` | `/orders` | public* | order fields (see below) | `{ ref }` |
| `GET` | `/orders` | admin | `?status=&q=&template=&page=` | `Order[]` |
| `GET` | `/orders/:id` | admin | – | `Order` |
| `PATCH` | `/orders/:id` | admin | `{ status, note? }` | `Order` (with new history entry) |

\* Public `POST /orders` must be rate-limited and validated server-side; consider a free CAPTCHA (e.g. Cloudflare
Turnstile). Generate the final reference on the server.

`Order` JSON shape expected by the dashboard:

```json
{
  "id": "KT-261122-7Q4M",
  "ref": "KT-261122-7Q4M",
  "createdAt": "2026-11-22T09:30:00Z",
  "status": "new",
  "customer": { "name": "…", "business": "…", "email": "…", "whatsapp": "…" },
  "templateId": "business",
  "requirements": "…",
  "note": "…",
  "history": [{ "status": "new", "at": "2026-11-22T09:30:00Z", "note": "" }]
}
```

## 6. Security checklist

- HTTPS only. Allow CORS **only** from your site origin(s), never `*` when credentials are used.
- Validate and length-limit every field on the server; never trust the browser.
- Keep database/service keys on the server. Nothing secret may appear in `assets/js/`.
- Store only what you need; delete cancelled leads after an agreed period; let customers request deletion.
- Log admin actions in `order_events` (who changed what, when).
- The `admin/` page itself is public on GitHub Pages and contains **no data**. All protection comes from the API.

## 7. Connecting the order page later

When `POST /orders` exists, extend the submit handler in `assets/js/marketplace.js` (`initOrder`) to send the same
fields to the API first, show the server's reference, and keep the WhatsApp button as a second channel.
Until then, WhatsApp is the only way an order reaches you — the page says so to customers.
