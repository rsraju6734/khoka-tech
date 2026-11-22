// Usage (from the project root): npm install --no-save @electric-sql/pglite@0.2 && node supabase/tests/rls-test.js
// Runs the KHOKA TECH migrations in PGlite with a minimal Supabase-like environment,
// then checks every security rule as visitor (anon), signed-in non-admin and admin.
const { PGlite } = require("@electric-sql/pglite");
const fs = require("fs"), path = require("path");
const ROOT = process.argv[2] || path.join(__dirname, "..", "..");  // project root
const read = f => fs.readFileSync(path.join(ROOT, f), "utf8");

const SUPABASE_STUB = `
create role anon nologin; create role authenticated nologin;
create schema auth;
create table auth.users (id uuid primary key, email text);
create function auth.uid() returns uuid language sql stable as $$ select nullif(current_setting('request.jwt.claim.sub', true), '')::uuid $$;
grant usage on schema auth to anon, authenticated;
grant execute on function auth.uid() to anon, authenticated;
grant usage on schema public to anon, authenticated;
-- Supabase's default: new tables/functions in public are fully granted to anon/authenticated
alter default privileges in schema public grant all on tables to anon, authenticated;
alter default privileges in schema public grant all on sequences to anon, authenticated;
alter default privileges in schema public grant execute on functions to anon, authenticated;
create schema storage;
create table storage.buckets (id text primary key, name text, public boolean, file_size_limit bigint, allowed_mime_types text[]);
create table storage.objects (id uuid primary key default gen_random_uuid(), bucket_id text, name text);
alter table storage.objects enable row level security;
grant usage on schema storage to anon, authenticated;
grant all on storage.objects to anon, authenticated;
`;

const ADMIN = "11111111-1111-1111-1111-111111111111", USER = "22222222-2222-2222-2222-222222222222";
let pass = 0, fail = 0;
const ok = (name, cond, extra = "") => { (cond ? pass++ : fail++); console.log((cond ? "PASS " : "FAIL ") + name + (extra ? "  → " + extra : "")); };

(async () => {
  const db = new PGlite();
  await db.exec(SUPABASE_STUB);
  for (const f of ["supabase/migrations/20261122000001_schema.sql", "supabase/migrations/20261122000002_functions.sql",
                   "supabase/migrations/20261122000003_rls.sql", "supabase/migrations/20261122000004_storage.sql", "supabase/seed.sql"]) {
    try { await db.exec(read(f)); console.log("applied " + f); }
    catch (e) { console.log("ERROR in " + f + ": " + e.message); process.exit(1); }
  }
  await db.exec(read("supabase/seed.sql")); console.log("seed re-run OK (idempotent)");

  // two auth users → profiles created by trigger; promote ADMIN the way the owner would
  await db.exec(`insert into auth.users values ('${ADMIN}', 'owner@example.com'), ('${USER}', 'staff@example.com');
                 update public.profiles set role = 'admin' where email = 'owner@example.com';`);
  ok("profiles auto-created for new auth users", (await db.query("select count(*)::int n from public.profiles")).rows[0].n === 2);

  const as = async (who, sql, params) => {
    const role = who === "anon" ? "anon" : "authenticated", sub = who === "admin" ? ADMIN : who === "user" ? USER : "";
    await db.exec(`reset role; select set_config('request.jwt.claim.sub', '${sub}', false); set role ${role};`);
    try { return { rows: (await db.query(sql, params)).rows }; }
    catch (e) { return { error: e.message }; }
    finally { await db.exec("reset role;"); }
  };
  const submit = (over = {}) => {
    const a = Object.assign({ n: "Karim Uddin", e: "karim@test.com", w: "+880 1711-111111", t: "business", r: "Change colours to green and add two pages", b: "Spice Garden", m: null }, over);
    return as("anon", "select * from public.submit_order($1,$2,$3,$4,$5,$6,$7)", [a.n, a.e, a.w, a.t, a.r, a.b, a.m]);
  };

  // ---- visitors
  let r = await as("anon", "select id from public.templates");
  ok("anon reads active templates", r.rows && r.rows.length === 6, r.error || r.rows.length);
  await db.exec("update public.templates set is_active = false where id = 'agency'");
  r = await as("anon", "select id from public.templates");
  ok("anon cannot see inactive template", r.rows && r.rows.length === 5);
  r = await as("admin", "select id from public.templates");
  ok("admin still sees inactive template", r.rows && r.rows.length === 6);
  r = await submit({ t: "agency" });
  ok("order for inactive template rejected", r.error && r.error.includes("invalid_template"), r.error);

  r = await submit();
  const ref1 = r.rows && r.rows[0] && r.rows[0].ref;
  ok("anon submit_order returns reference", /^KT-\d{6}-[2-9A-HJKMNP-Z]{4}$/.test(ref1 || ""), ref1 || r.error);
  ok("submit_order returns only ref + created_at", r.rows && Object.keys(r.rows[0]).join() === "ref,created_at");
  ok("order stored with template snapshot", (await db.query("select template_name, listed_price_usd from public.orders where ref = $1", [ref1])).rows[0].listed_price_usd === 39);
  ok("initial 'new' history row written", (await db.query("select count(*)::int n from public.order_status_history h join public.orders o on o.id = h.order_id where o.ref = $1 and h.to_status = 'new'", [ref1])).rows[0].n === 1);

  r = await submit({ e: "not-an-email" });        ok("invalid email rejected", r.error && r.error.includes("invalid_email"), r.error);
  r = await submit({ w: "123" });                 ok("invalid WhatsApp rejected", r.error && r.error.includes("invalid_whatsapp"), r.error);
  r = await submit({ r: "too short" });           ok("short requirements rejected", r.error && r.error.includes("invalid_requirements"), r.error);
  r = await submit({ n: "K" });                   ok("short name rejected", r.error && r.error.includes("invalid_name"), r.error);
  r = await submit({ t: "nope" });                ok("unknown template rejected", r.error && r.error.includes("invalid_template"), r.error);
  await submit(); await submit();
  r = await submit();                             ok("4th order from same contact in 15 min rate-limited", r.error && r.error.includes("rate_limited"), r.error);
  r = await submit({ e: "other@test.com", w: "+8801700000000" });
  const ref2 = r.rows && r.rows[0].ref;           ok("different customer can still order", !!ref2, r.error);

  r = await as("anon", "select * from public.orders");                      ok("anon cannot read orders", !!r.error, r.error);
  r = await as("anon", "select * from public.order_status_history");        ok("anon cannot read history", !!r.error, r.error);
  r = await as("anon", "select * from public.profiles");                    ok("anon cannot read profiles", !!r.error, r.error);
  r = await as("anon", "insert into public.orders (ref, template_name, customer_name, email, whatsapp, requirements) values ('KT-261122-AAAA','x','Bob','b@b.co','+8801711111111','long enough requirements')");
  ok("anon cannot insert orders directly", !!r.error, r.error);
  r = await as("anon", "insert into public.templates (id, name, category, price_usd) values ('hack','Hack','business',1)");
  ok("anon cannot add templates", !!r.error, r.error);
  r = await as("anon", "select public.is_admin() a");                       ok("is_admin() is false for visitors", r.rows && r.rows[0].a === false);
  r = await as("anon", "select public.set_order_status(gen_random_uuid(), 'confirmed')");
  ok("anon cannot call set_order_status", !!r.error, r.error);
  r = await as("anon", "select public.generate_order_ref()");               ok("anon cannot call internal functions", !!r.error, r.error);
  r = await as("anon", "insert into storage.objects (bucket_id, name) values ('template-previews', 'x.png')");
  ok("anon cannot upload preview images", !!r.error, r.error);

  // ---- signed-in, NOT admin
  r = await as("user", "select * from public.orders");                      ok("non-admin sees zero orders", r.rows && r.rows.length === 0, r.error);
  r = await as("user", "select public.is_admin() a");                       ok("is_admin() false for non-admin", r.rows && r.rows[0].a === false);
  const oid = (await db.query("select id from public.orders where ref = $1", [ref1])).rows[0].id;
  r = await as("user", "select public.set_order_status($1, 'confirmed')", [oid]); ok("non-admin cannot change status", r.error && r.error.includes("not_allowed"), r.error);
  r = await as("user", "select public.add_order_note($1, 'hi')", [oid]);    ok("non-admin cannot add notes", !!r.error, r.error);
  r = await as("user", `update public.profiles set role = 'admin' where id = '${USER}'`); ok("non-admin cannot promote self", !!r.error, r.error);
  r = await as("user", `update public.profiles set full_name = 'Staff Name' where id = '${USER}' returning full_name`);
  ok("user can edit own name", r.rows && r.rows[0] && r.rows[0].full_name === "Staff Name", r.error);
  r = await as("user", "select email from public.profiles");                ok("user sees only own profile", r.rows && r.rows.length === 1);
  r = await as("user", "update public.templates set price_usd = 1 where id = 'business'");
  ok("non-admin template update changes nothing", (await db.query("select price_usd from public.templates where id='business'")).rows[0].price_usd === 39);
  r = await as("user", "insert into storage.objects (bucket_id, name) values ('template-previews', 'x.png')");
  ok("non-admin cannot upload preview images", !!r.error, r.error);

  // ---- admin
  const total = (await db.query("select count(*)::int n from public.orders")).rows[0].n;
  r = await as("admin", "select ref from public.orders order by created_at");   ok("admin reads all orders", r.rows && r.rows.length === total && total === 4, (r.error || r.rows.length) + " of " + total);
  r = await as("admin", "select public.set_order_status($1, 'contacted', 'Called the customer')", [oid]); ok("admin changes status", !r.error, r.error);
  const h = (await db.query("select from_status, to_status, note, created_by::text cb from public.order_status_history where order_id = $1 order by id desc limit 1", [oid])).rows[0];
  ok("status change logged with note and admin id", h && h.from_status === "new" && h.to_status === "contacted" && h.note === "Called the customer" && h.cb === ADMIN, JSON.stringify(h));
  r = await as("admin", "select public.set_order_status($1, 'shipped')", [oid]);  ok("invalid status rejected", !!r.error, r.error);
  r = await as("admin", "select public.add_order_note($1, 'Prefers calls after 6 pm')", [oid]); ok("admin adds internal note", !r.error, r.error);
  r = await as("admin", "select count(*)::int n from public.order_status_history where order_id = $1", [oid]); ok("admin reads history", r.rows && r.rows[0].n === 3, r.error);
  r = await as("admin", `update public.orders set email = 'x@y.z' where id = '${oid}'`); ok("admin cannot rewrite customer data", !!r.error, r.error);
  r = await as("admin", "delete from public.order_status_history");          ok("history is append-only (no delete)", !!r.error, r.error);
  r = await as("admin", "delete from public.orders");                        ok("orders cannot be deleted from the app", !!r.error, r.error);
  r = await as("admin", "insert into public.templates (id, name, category, price_usd, demo_url, thumb_url) values ('clinic','Care Clinic','health',55,'https://example.com/demo','https://example.com/t.png') returning updated_by::text");
  ok("admin adds template (updated_by recorded)", r.rows && r.rows[0].updated_by === ADMIN, r.error);
  r = await as("admin", "update public.templates set price_usd = 65, category = 'medical', is_active = false where id = 'clinic' returning price_usd");
  ok("admin edits price/category/active", r.rows && r.rows[0] && r.rows[0].price_usd === 65, r.error);
  r = await as("admin", "update public.templates set demo_url = 'javascript:alert(1)' where id = 'clinic'"); ok("unsafe demo URL rejected", !!r.error, r.error);
  r = await as("admin", "update public.templates set price_usd = -5 where id = 'clinic'");   ok("negative price rejected", !!r.error, r.error);
  r = await as("admin", "insert into storage.objects (bucket_id, name) values ('template-previews', 'clinic.png')"); ok("admin uploads preview image", !r.error, r.error);
  r = await as("admin", `update public.profiles set role = 'none' where id = '${ADMIN}'`); ok("even admins cannot change roles from the app", !!r.error, r.error);

  console.log(`\n${pass} passed, ${fail} failed`);
  process.exit(fail ? 1 : 0);
})();
