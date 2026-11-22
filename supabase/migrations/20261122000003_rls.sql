-- =====================================================================
-- KHOKA TECH — 003 privileges and Row Level Security
-- Principle: deny by default. Table privileges decide WHAT a role may do,
-- RLS policies decide WHICH rows. Frontend checks are only for UX.
--   anon          = website visitors (publishable/anon key)
--   authenticated = signed-in users; only role='admin' profiles get access
-- =====================================================================

alter table public.profiles             enable row level security;
alter table public.templates            enable row level security;
alter table public.orders               enable row level security;
alter table public.order_status_history enable row level security;

-- ---------------------------------------------------------------- table privileges
-- Supabase grants broad defaults to anon/authenticated; remove them first.
revoke all on public.profiles, public.templates, public.orders, public.order_status_history from anon, authenticated;

grant select                         on public.templates            to anon, authenticated;
grant insert, update, delete         on public.templates            to authenticated;   -- RLS: admins only
grant select                         on public.orders               to authenticated;   -- RLS: admins only
grant update (status)                on public.orders               to authenticated;   -- admins may change status only
grant select, insert                 on public.order_status_history to authenticated;   -- RLS: admins only; no update/delete
grant select                         on public.profiles             to authenticated;
grant update (full_name)             on public.profiles             to authenticated;   -- role can never be changed by app users

-- ---------------------------------------------------------------- function privileges
revoke execute on all functions in schema public from public, anon, authenticated;
grant execute on function public.is_admin()                                                   to anon, authenticated;
grant execute on function public.submit_order(text, text, text, text, text, text, text)       to anon, authenticated;
grant execute on function public.set_order_status(uuid, text, text)                           to authenticated;
grant execute on function public.add_order_note(uuid, text)                                   to authenticated;
-- Also stop Supabase's default privileges from exposing future functions automatically.
alter default privileges in schema public revoke execute on functions from public, anon, authenticated;

-- ---------------------------------------------------------------- templates
create policy "Visitors see active templates; admins see all"
  on public.templates for select to anon, authenticated
  using (is_active or public.is_admin());

create policy "Admins add templates"
  on public.templates for insert to authenticated
  with check (public.is_admin());

create policy "Admins edit templates"
  on public.templates for update to authenticated
  using (public.is_admin()) with check (public.is_admin());

create policy "Admins delete templates"
  on public.templates for delete to authenticated
  using (public.is_admin());

-- ---------------------------------------------------------------- orders
-- No policy for anon at all: visitors cannot read, insert, update or delete.
-- Orders are created only through public.submit_order().
create policy "Admins read orders"
  on public.orders for select to authenticated
  using (public.is_admin());

create policy "Admins update order status"
  on public.orders for update to authenticated
  using (public.is_admin()) with check (public.is_admin());

-- ---------------------------------------------------------------- order history
create policy "Admins read order history"
  on public.order_status_history for select to authenticated
  using (public.is_admin());

create policy "Admins add notes as themselves"
  on public.order_status_history for insert to authenticated
  with check (public.is_admin() and created_by = auth.uid());

-- ---------------------------------------------------------------- profiles
create policy "Users read own profile; admins read all"
  on public.profiles for select to authenticated
  using (id = auth.uid() or public.is_admin());

create policy "Users edit own name"
  on public.profiles for update to authenticated
  using (id = auth.uid()) with check (id = auth.uid());
