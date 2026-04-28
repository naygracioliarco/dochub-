-- Execute no SQL Editor do Supabase (Dashboard > SQL).
-- Depois: Table Editor > documents > Enable Realtime (ou o comando abaixo).

create table if not exists public.documents (
  id bigint generated always as identity primary key,
  nome text not null,
  link text not null,
  tipo_link text not null,
  descricao text not null,
  responsavel text not null,
  status text not null,
  categoria text not null,
  coautores jsonb not null default '[]'::jsonb,
  ultima_atualizacao text not null
);

alter table public.documents enable row level security;

-- Ajuste as politicas conforme a seguranca da sua organizacao (ex.: apenas usuarios autenticados).
create policy "documents_select_anon" on public.documents for select using (true);
create policy "documents_insert_anon" on public.documents for insert with check (true);
create policy "documents_update_anon" on public.documents for update using (true);
create policy "documents_delete_anon" on public.documents for delete using (true);

alter publication supabase_realtime add table public.documents;
