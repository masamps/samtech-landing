# Agente de prospecção (Hermes)

O Hermes Agent acha e qualifica leads, cadastra no `/admin` como "Não
contatado" com o rascunho da primeira mensagem, e toda manhã manda um resumo
no Telegram. **Quem envia a mensagem para o prospect é você, à mão.**

```
Hermes (cron 8h) ──busca──> web / BrasilAPI
      │
      ├──insere──> Supabase crm_prospects  (só "Não contatado", sem update/delete)
      │
      └──resumo──> Telegram (só você)
                        │
Você ──revisa no /admin──> envia pelo seu WhatsApp ──> muda status
```

## O que já está pronto

- `skills/prospeccao-samps/` — a skill (instruções, perfil de cliente,
  modelos de mensagem e `scripts/crm.py`).
- `../supabase/migrations/20260928120000_crm_acesso_agente.sql` — **já
  aplicada** no projeto Zelo. Dá ao agente um acesso mínimo: lê seus prospects e
  insere lead novo só como "Não contatado". Não atualiza, não apaga, não muda
  status. Testado: agente vê as 24 linhas, insert com outro status é barrado,
  update/delete afetam 0 linhas, usuário qualquer continua vendo 0.

## Passo a passo

### 1. Onde rodar

O Hermes precisa de uma máquina ligada para o cron rodar. Escolha uma:

- **VPS Linux** (recomendado): Hetzner, Contabo, DigitalOcean, Oracle Cloud
  free tier. 2 GB de RAM bastam. Ubuntu 24.04.
- **Seu PC** com Linux, macOS ou Windows com WSL2 — só roda enquanto ele
  estiver ligado.

Precisa de `git`, `python3` e `curl`.

### 2. Instalar o Hermes

```bash
curl -fsSL https://hermes-agent.nousresearch.com/install.sh | bash
source ~/.bashrc
hermes setup
```

No `hermes setup`, escolha o provedor do modelo. Use um modelo forte em busca
e em seguir instruções (Claude via API da Anthropic ou OpenRouter). Modelo
fraco inventa dado e erra a qualificação.

Depois:

```bash
hermes doctor
```

### 3. Busca na web

Funciona sem chave (usa as camadas grátis). Para não ser limitado no meio da
rodada, configure um provedor com chave:

```bash
hermes tools    # Web Search & Extract → Firecrawl, Exa ou Tavily
```

### 4. Telegram (onde você recebe o resumo)

```bash
hermes gateway setup    # escolha Telegram
```

Ou no dashboard: Messaging → Telegram → **Create with QR**. Isso grava
`TELEGRAM_BOT_TOKEN` e `TELEGRAM_ALLOWED_USERS` no `~/.hermes/.env`.
`TELEGRAM_ALLOWED_USERS` deve ter **só o seu** ID.

**Não conecte o WhatsApp do (15) 98177-7690 no Hermes.** O agente não deve ter
como falar com prospect, e automação no seu número principal arrisca bloqueio.

Deixe o gateway rodando como serviço (o cron depende dele):

```bash
hermes gateway install   # instala como serviço do sistema
hermes gateway start
hermes gateway status
```

### 5. Supabase — usuário do agente

No dashboard do projeto **Zelo**:

1. **Authentication → Sign In / Providers → desligue "Allow new users to sign
   up"** (pendência antiga; sem isso qualquer pessoa cria conta).
2. **Authentication → Users → Add user → Create new user**
   - E-mail: `hermes@sampsprojetos.com.br` (não precisa existir)
   - Senha: gere uma forte (`openssl rand -base64 24`)
   - Marque **Auto Confirm User**
3. **SQL Editor**, rode:

```sql
insert into crm_privado.agentes (agent_id, owner_id)
select a.id, d.id
from auth.users a, auth.users d
where a.email = 'hermes@sampsprojetos.com.br'
  and d.email = 'sampsprojetos@gmail.com';
```

(O dono dos 24 prospects é `sampsprojetos@gmail.com`.) Ou me avise que eu
faço o vínculo.

### 6. Variáveis do agente

Acrescente ao `~/.hermes/.env`:

```bash
SUPABASE_URL=https://stbprwobloelftaglntp.supabase.co
SUPABASE_PUBLISHABLE_KEY=<mesma de VITE_SUPABASE_PUBLISHABLE_KEY na Vercel>
CRM_AGENTE_EMAIL=hermes@sampsprojetos.com.br
CRM_AGENTE_SENHA=<senha do passo 5>
CRM_DONO_ID=e962a6ed-ab8e-4675-80aa-da3e1beb7da1
```

```bash
chmod 600 ~/.hermes/.env
```

Nunca coloque a **service role key** aqui: ela ignora o RLS e abre o projeto
inteiro, inclusive o outro aplicativo.

### 7. Instalar a skill

```bash
git clone https://github.com/masamps/samtech-landing.git ~/samtech-landing
mkdir -p ~/.hermes/skills
cp -r ~/samtech-landing/hermes/skills/prospeccao-samps ~/.hermes/skills/
```

Para atualizar depois: `git -C ~/samtech-landing pull` e copie de novo.

### 8. Testar

Teste o acesso ao banco sem o agente:

```bash
cd ~/.hermes/skills/prospeccao-samps
set -a; . ~/.hermes/.env; set +a
python3 scripts/crm.py resumo      # deve mostrar total 24
python3 scripts/crm.py existe "Clima Azul"   # deve dizer existe: true
```

Depois, uma rodada pequena com o agente:

```bash
hermes
```

```
Use a skill prospeccao-samps e encontre 2 leads da Trilha A. Me mostre o relatório.
```

Confira no `/admin`: os 2 leads aparecem como "Não contatado", com o rascunho
em Observações. Leia os rascunhos e a fonte de cada um. Se algo estiver
errado, corrija a skill antes de agendar.

### 9. Agendar

```bash
hermes cron create "0 8 * * 1-5" \
  "Rode a prospecção do dia: 5 leads novos qualificados e os follow-ups vencidos. Siga a skill à risca e responda só com o relatório." \
  --skill prospeccao-samps \
  --name "Prospecção diária" \
  --deliver telegram
```

Dias úteis às 8h. Chega no Telegram antes de você começar o dia.

Bônus: a rodada diária consulta o banco, então o Supabase free não fica 7 dias
parado e não pausa sozinho.

### 10. Sua rotina (15 minutos por dia)

1. Leia o resumo no Telegram.
2. Abra o `/admin`, filtre "Não contatado".
3. Para cada lead novo: confira a fonte, ajuste o rascunho, mande do seu
   WhatsApp.
4. No `/admin`: status "Contatado", data do primeiro contato = hoje,
   follow-up = daqui a 5–7 dias.
5. Quem respondeu com interesse → aí sim protótipo no Claude Design.

## Controles

| Quero... | Comando |
|---|---|
| Parar tudo agora | `hermes pause` (volta com `hermes resume`) |
| Ver os jobs | `hermes cron list` |
| Rodar uma vez fora do horário | `hermes cron run <id>` |
| Cortar o acesso ao banco | Apague o usuário `hermes@…` no Supabase Auth |

## Limites de propósito

- O agente não manda mensagem para ninguém além de você no Telegram.
- O agente não cria protótipo.
- O agente não muda status nem apaga lead — o banco recusa.
- 5 leads por dia. Mais do que isso você não consegue conversar bem, e a meta é
  conversa, não lista.
