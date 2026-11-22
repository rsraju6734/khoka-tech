# KHOKA TECH — Supabase backend (phase 1: database)

This folder contains everything the database needs. **Nothing here changes the live website yet.**
Phase 2 connects the order page, store and admin dashboard to this database.

```
supabase/
├── migrations/
│   ├── 20261122000001_schema.sql      tables, constraints, indexes
│   ├── 20261122000002_functions.sql   submit_order(), is_admin(), status log, triggers
│   ├── 20261122000003_rls.sql         privileges + Row Level Security policies
│   └── 20261122000004_storage.sql     bucket for template preview images
├── seed.sql                           the six current templates (safe to re-run)
├── tests/rls-test.js                  49 automated security checks (runs locally, no Supabase needed)
└── README.md                          this guide
```

---

## 1. Architecture

```
auth.users (Supabase Auth)
   │ 1:1 (trigger creates it)
   ▼
profiles ── role: 'none' | 'admin'   ← only the project owner can change role (SQL editor)

templates ◄──── orders ────► order_status_history
 (catalogue)    template_id      order_id
                + name/price     status changes + internal notes, append-only
                  snapshot
```

| Table | Purpose | Key rules |
|---|---|---|
| `profiles` | Staff accounts linked to Supabase Auth | `role` default `none`; app users can edit only their own `full_name` |
| `templates` | Store catalogue (name, category, price, active, demo/preview URLs, colours, translated copy in `content` jsonb) | Slug IDs, price 0–100000, URLs must be `https://` or site-relative |
| `orders` | Customer requests, reference `KT-YYMMDD-XXXX` | Validated name/email/WhatsApp/requirements; template name & price snapshot |
| `order_status_history` | Audit trail of status changes and internal notes | Insert-only; records which admin acted |

### Who can do what (enforced in the database)

| Action | Visitor (anon key) | Signed-in, not admin | Admin |
|---|---|---|---|
| Read active templates | ✅ | ✅ | ✅ (incl. inactive) |
| Submit an order | ✅ via `submit_order()` only | ✅ | ✅ |
| Read any order / history / profiles | ❌ | ❌ (own profile only) | ✅ |
| Change order status, add notes | ❌ | ❌ | ✅ (logged) |
| Edit customer details of an order | ❌ | ❌ | ❌ (kept as submitted) |
| Delete orders or history | ❌ | ❌ | ❌ (use status *Cancelled*) |
| Add / edit / deactivate templates, upload previews | ❌ | ❌ | ✅ |
| Make someone an admin | ❌ | ❌ | ❌ — SQL editor only |

Visitors never get `SELECT` on orders, so one customer can never read another's order. `submit_order()` returns
only the new reference and timestamp. It also rate-limits: max 3 orders per email/WhatsApp per 15 minutes and
30 per minute site-wide.

**Personal data kept to the minimum:** name, email, WhatsApp, optional business name, requirements, optional
message. No addresses, no payment data, no IP addresses, no customer accounts.

---

## 2. Create the Supabase project (≈10 minutes)

1. Go to **supabase.com** → sign in (GitHub login works) → **New project**.
2. Name: `khoka-tech` · Region: **Southeast Asia (Singapore)** — closest to Bangladesh · Plan: Free.
3. Set a strong **database password** and keep it in a password manager. You won't need it for the website —
   **never** put it in any file.
4. Wait until the project shows as ready.

## 3. Run the SQL

In the project: **SQL Editor → New query**. Paste and **Run** each file **in this order**:

1. `migrations/20261122000001_schema.sql`
2. `migrations/20261122000002_functions.sql`
3. `migrations/20261122000003_rls.sql`
4. `migrations/20261122000004_storage.sql`
5. `seed.sql`

Each should end with "Success. No rows returned". Then check: **Table Editor → templates** shows 6 rows, and
**Authentication → Policies** lists policies on all four tables with RLS **enabled**.

## 4. Lock down sign-ups (important)

**Authentication → Sign In / Providers** (or *Auth Settings*):

- **Allow new users to sign up: OFF.** There is no public registration; admins are created by you only.
- Email provider: **enabled** (used for admin login).
- **URL Configuration → Site URL:** `https://rsraju6734.github.io/khoka-tech/`
- **Redirect URLs:** add `https://rsraju6734.github.io/khoka-tech/admin/` (and `http://localhost:8000/admin/` for local testing).

Even if sign-ups were accidentally left on, a new account would get `role = 'none'` and see nothing — but turning
them off removes the risk entirely.

## 5. Create your admin account

1. **Authentication → Users → Add user → Create new user**
   Email: the address you will log in with · Password: a strong, unique password · ✅ *Auto Confirm User*.
2. **SQL Editor → New query**, replace the email and run:

```sql
update public.profiles
set role = 'admin', full_name = 'Raju'
where email = 'YOUR-ADMIN-EMAIL@example.com';

-- check: should return one row with role = admin
select email, role from public.profiles where role = 'admin';
```

**Adding another admin later:** repeat steps 1–2 with their email.
**Removing an admin:** `update public.profiles set role = 'none' where email = '…';` and, if they should lose
access completely, delete or ban the user under **Authentication → Users**.

Use a separate admin password from your email password, and enable **MFA** for your Supabase account
(Account → Security).

## 6. The two values the website needs

**Project Settings → API Keys** (older projects: **Project Settings → API**):

| Value | Looks like | Where it goes | Safe in public code? |
|---|---|---|---|
| **Project URL** | `https://abcdefghijklmnop.supabase.co` | `assets/js/contact.js` (phase 2) | ✅ Yes |
| **Publishable key** (new) *or* **anon public key** (legacy) | `sb_publishable_…` *or* `eyJhbGciOi…` | `assets/js/contact.js` (phase 2) | ✅ Yes — designed to be public; RLS protects the data |
| Secret key / **service_role** key | `sb_secret_…` / `eyJ…` marked *service_role* | **Nowhere in this project** | ❌ **Never.** It bypasses all security. |
| Database password | — | **Nowhere in this project** | ❌ **Never** |

GitHub Pages has no server-side environment variables, so the public URL and publishable key live in
`contact.js`. That is the intended Supabase setup for static sites: the publishable key only lets visitors do
what the RLS policies above allow (read active templates, call `submit_order()`).

## 7. Security checklist

- [ ] RLS **enabled** on `profiles`, `templates`, `orders`, `order_status_history` (Authentication → Policies)
- [ ] Sign-ups **disabled**; only accounts you created exist under Authentication → Users
- [ ] Exactly the intended people have `role = 'admin'`
- [ ] No `service_role` / `sb_secret_` key or DB password anywhere in the repository (search before every upload)
- [ ] Site URL and redirect URLs set to your GitHub Pages address
- [ ] MFA enabled on your Supabase account; strong unique admin passwords
- [ ] Re-run `supabase/tests/rls-test.js` after any SQL change
- [ ] Supabase **Advisors → Security** shows no errors

## 8. Testing checklist

Automated (local, no Supabase account needed):

```
npm install --no-save @electric-sql/pglite@0.2
node supabase/tests/rls-test.js
```

Expected: `49 passed, 0 failed`. It applies all migrations and checks every rule above as a visitor, a signed-in
non-admin and an admin.

In Supabase after setup (SQL Editor):

```sql
-- should return 6
select count(*) from public.templates;
-- should return true only when YOU run it from the app while logged in as admin; false/null here is expected
select public.is_admin();
```

## 9. Not included (needs extra services)

- **Email notifications** for new orders: requires a Supabase Edge Function plus an email provider (e.g. Resend).
- **CAPTCHA** on the order form: optional, via Cloudflare Turnstile + Supabase Auth/Edge Function.
- **Automatic WhatsApp messages**: requires the paid WhatsApp Business API. The order page will keep the free
  "Open WhatsApp" option alongside the database save.
