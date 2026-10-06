-- Trilha C: escritórios de contabilidade que atendem sellers de marketplace.
-- Entram como canal de indicação para o sistema da Trilha A.
alter table public.crm_prospects drop constraint if exists crm_prospects_trilha_check;
alter table public.crm_prospects
  add constraint crm_prospects_trilha_check check (trilha = any (array['A', 'B', 'C']));
