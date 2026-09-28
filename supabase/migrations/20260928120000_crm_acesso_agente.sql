-- Acesso do agente de prospecção (Hermes) à tabela crm_prospects.
--
-- O agente tem login próprio no Supabase Auth — nunca a service key, que
-- ignora o RLS e abriria o projeto inteiro (que tem outro aplicativo em
-- produção). Ele trabalha em nome do dono, com privilégio mínimo:
--
--   * LÊ as linhas do dono (para não cadastrar a mesma empresa duas vezes e
--     para listar follow-ups vencidos);
--   * INSERE lead novo em nome do dono, só como "Não contatado", sem data de
--     contato e sem follow-up — quem muda status é o dono, depois de mandar
--     a mensagem de verdade;
--   * não atualiza e não apaga nada (não existe política para isso).
--
-- O vínculo agente → dono fica num schema que a API não expõe, então nenhum
-- usuário logado consegue ler nem forjar esse vínculo pelo PostgREST.

create schema if not exists crm_privado;
revoke all on schema crm_privado from public, anon;
grant usage on schema crm_privado to authenticated;

create table if not exists crm_privado.agentes (
  agent_id uuid primary key references auth.users (id) on delete cascade,
  owner_id uuid not null references auth.users (id) on delete cascade,
  created_at timestamptz not null default now(),
  check (agent_id <> owner_id)
);
alter table crm_privado.agentes enable row level security;
revoke all on crm_privado.agentes from public, anon, authenticated;

-- security definer: a política roda como o usuário logado, que não enxerga a
-- tabela de vínculos. A função só responde "o usuário atual é agente deste
-- dono?" — não devolve nenhum dado.
create or replace function crm_privado.agente_de(dono uuid)
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select exists (
    select 1
    from crm_privado.agentes a
    where a.agent_id = (select auth.uid())
      and a.owner_id = dono
  );
$$;
revoke all on function crm_privado.agente_de(uuid) from public, anon;
grant execute on function crm_privado.agente_de(uuid) to authenticated;

drop policy if exists crm_prospects_select_agente on public.crm_prospects;
create policy crm_prospects_select_agente
  on public.crm_prospects
  for select
  to authenticated
  using (crm_privado.agente_de(user_id));

drop policy if exists crm_prospects_insert_agente on public.crm_prospects;
create policy crm_prospects_insert_agente
  on public.crm_prospects
  for insert
  to authenticated
  with check (
    crm_privado.agente_de(user_id)
    and status = 'Não contatado'
    and data_primeiro_contato is null
    and data_follow_up is null
  );

-- Depois de criar o usuário do agente em Authentication > Users:
--   insert into crm_privado.agentes (agent_id, owner_id)
--   values ('<uuid do agente>', '<uuid do dono>');
-- Para revogar: apague o usuário do agente (o vínculo cai em cascata).
