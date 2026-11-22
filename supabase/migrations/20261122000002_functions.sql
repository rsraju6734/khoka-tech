-- =====================================================================
-- KHOKA TECH — 002 functions and triggers
-- All functions use an empty search_path and fully qualified names.
-- =====================================================================

-- ---------------------------------------------------------------- timestamps
create or replace function public.set_updated_at()
returns trigger language plpgsql set search_path = '' as $$
begin
  new.updated_at := now();
  return new;
end $$;

create trigger profiles_updated_at  before update on public.profiles  for each row execute function public.set_updated_at();
create trigger templates_updated_at before update on public.templates for each row execute function public.set_updated_at();
create trigger orders_updated_at    before update on public.orders    for each row execute function public.set_updated_at();

-- Record which admin last edited a template.
create or replace function public.set_template_editor()
returns trigger language plpgsql set search_path = '' as $$
begin
  new.updated_by := auth.uid();
  return new;
end $$;
create trigger templates_editor before insert or update on public.templates for each row execute function public.set_template_editor();

-- ---------------------------------------------------------------- profiles
-- Every new Auth user gets a profile with role 'none'. Admin rights are
-- granted manually by the owner (see supabase/README.md).
create or replace function public.handle_new_user()
returns trigger language plpgsql security definer set search_path = '' as $$
begin
  insert into public.profiles (id, email) values (new.id, coalesce(new.email, ''))
  on conflict (id) do nothing;
  return new;
end $$;

create trigger on_auth_user_created after insert on auth.users
  for each row execute function public.handle_new_user();

-- ---------------------------------------------------------------- admin check
-- SECURITY DEFINER so it can read profiles regardless of the caller's RLS,
-- which also avoids recursive policy evaluation. Returns false for visitors.
create or replace function public.is_admin()
returns boolean language sql stable security definer set search_path = '' as $$
  select exists (
    select 1 from public.profiles p
    where p.id = auth.uid() and p.role = 'admin'
  );
$$;

-- ---------------------------------------------------------------- order reference
-- KT-YYMMDD-XXXX, date in Bangladesh time, 4 characters without 0/O/1/I/L.
create or replace function public.generate_order_ref()
returns text language plpgsql volatile set search_path = '' as $$
declare
  alphabet constant text := '23456789ABCDEFGHJKMNPQRSTUVWXYZ';
  suffix text := '';
begin
  for i in 1..4 loop
    suffix := suffix || substr(alphabet, 1 + floor(random() * length(alphabet))::int, 1);
  end loop;
  return 'KT-' || to_char(now() at time zone 'Asia/Dhaka', 'YYMMDD') || '-' || suffix;
end $$;

-- ---------------------------------------------------------------- public order submission
-- The ONLY way a visitor can create an order. Visitors have no INSERT or
-- SELECT rights on public.orders; this function validates everything,
-- applies a simple rate limit, stores the order and returns just the
-- reference and timestamp — never other customers' data.
create or replace function public.submit_order(
  p_customer_name text,
  p_email         text,
  p_whatsapp      text,
  p_template_id   text,
  p_requirements  text,
  p_business_name text default null,
  p_message       text default null
)
returns table (ref text, created_at timestamptz)
language plpgsql volatile security definer set search_path = '' as $$
declare
  v_name   text := btrim(coalesce(p_customer_name, ''));
  v_email  text := lower(btrim(coalesce(p_email, '')));
  v_wa     text := btrim(coalesce(p_whatsapp, ''));
  v_wa_dig text := regexp_replace(coalesce(p_whatsapp, ''), '[^0-9]', '', 'g');
  v_req    text := btrim(coalesce(p_requirements, ''));
  v_biz    text := nullif(btrim(coalesce(p_business_name, '')), '');
  v_msg    text := nullif(btrim(coalesce(p_message, '')), '');
  v_tpl    public.templates%rowtype;
  v_ref    text;
  v_id     uuid;
  v_at     timestamptz;
begin
  -- validation (mirrors the table constraints, with friendly messages)
  if char_length(v_name) not between 2 and 80 then
    raise exception 'invalid_name' using errcode = '22023', hint = 'Name must be 2–80 characters.';
  end if;
  if char_length(v_email) > 120 or v_email !~ '^[^@[:space:]]+@[^@[:space:]]+\.[^@[:space:]]{2,}$' then
    raise exception 'invalid_email' using errcode = '22023', hint = 'Enter a valid email address.';
  end if;
  if regexp_replace(v_wa, '[[:space:]()-]', '', 'g') !~ '^\+?[0-9]{8,15}$' then
    raise exception 'invalid_whatsapp' using errcode = '22023', hint = 'WhatsApp number must have 8–15 digits.';
  end if;
  if char_length(v_req) not between 15 and 2000 then
    raise exception 'invalid_requirements' using errcode = '22023', hint = 'Requirements must be 15–2000 characters.';
  end if;
  if v_biz is not null and char_length(v_biz) > 100 then
    raise exception 'invalid_business' using errcode = '22023', hint = 'Business name is too long.';
  end if;
  if v_msg is not null and char_length(v_msg) > 1000 then
    raise exception 'invalid_message' using errcode = '22023', hint = 'Message is too long.';
  end if;

  select * into v_tpl from public.templates t where t.id = p_template_id and t.is_active;
  if not found then
    raise exception 'invalid_template' using errcode = '22023', hint = 'This template is not available.';
  end if;

  -- rate limits: same contact max 3 orders / 15 min; whole site max 30 / min
  if (select count(*) from public.orders o
        where o.created_at > now() - interval '15 minutes'
          and (lower(o.email) = v_email or regexp_replace(o.whatsapp, '[^0-9]', '', 'g') = v_wa_dig)) >= 3 then
    raise exception 'rate_limited' using errcode = '54000', hint = 'Too many requests. Please try again later or contact us on WhatsApp.';
  end if;
  if (select count(*) from public.orders o where o.created_at > now() - interval '1 minute') >= 30 then
    raise exception 'busy' using errcode = '54000', hint = 'We are receiving many requests. Please try again in a minute.';
  end if;

  -- insert with a fresh reference; retry on the (very unlikely) collision
  for attempt in 1..8 loop
    v_ref := public.generate_order_ref();
    begin
      insert into public.orders (ref, template_id, template_name, listed_price_usd, customer_name, email, whatsapp,
                                 business_name, requirements, message, source)
      values (v_ref, v_tpl.id, v_tpl.name, v_tpl.price_usd, v_name, v_email, v_wa, v_biz, v_req, v_msg, 'web')
      returning public.orders.id, public.orders.created_at into v_id, v_at;
      exit;
    exception when unique_violation then
      v_ref := null;
    end;
  end loop;
  if v_ref is null then
    raise exception 'ref_generation_failed' using errcode = 'P0001';
  end if;

  insert into public.order_status_history (order_id, from_status, to_status, note, created_by)
  values (v_id, null, 'new', 'Submitted from the website order page', null);

  ref := v_ref; created_at := v_at;
  return next;
end $$;

-- ---------------------------------------------------------------- admin actions
-- Both run with the CALLER's rights (security invoker), so Row Level
-- Security decides whether the change is allowed. A non-admin simply
-- matches zero rows and gets 'not_allowed'.

-- Status changes are logged automatically with the acting user.
create or replace function public.log_order_status()
returns trigger language plpgsql security definer set search_path = '' as $$
begin
  if new.status is distinct from old.status then
    insert into public.order_status_history (order_id, from_status, to_status, note, created_by)
    values (new.id, old.status, new.status, nullif(current_setting('app.status_note', true), ''), auth.uid());
  end if;
  return new;
end $$;
create trigger orders_log_status after update of status on public.orders
  for each row execute function public.log_order_status();

create or replace function public.set_order_status(p_order_id uuid, p_status text, p_note text default null)
returns void language plpgsql security invoker set search_path = '' as $$
begin
  if p_note is not null and char_length(p_note) > 1000 then
    raise exception 'invalid_note' using errcode = '22023';
  end if;
  perform set_config('app.status_note', coalesce(btrim(p_note), ''), true);
  update public.orders set status = p_status where id = p_order_id;
  if not found then
    raise exception 'not_allowed' using errcode = '42501', hint = 'Order not found, or you are not an admin.';
  end if;
  perform set_config('app.status_note', '', true);
end $$;

create or replace function public.add_order_note(p_order_id uuid, p_note text)
returns void language plpgsql security invoker set search_path = '' as $$
begin
  if p_note is null or char_length(btrim(p_note)) not between 1 and 1000 then
    raise exception 'invalid_note' using errcode = '22023';
  end if;
  insert into public.order_status_history (order_id, note, created_by)
  values (p_order_id, btrim(p_note), auth.uid());
end $$;
