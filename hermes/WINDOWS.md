# Configuração no Windows (Hermes Desktop)

Versão Windows do passo a passo do [README](README.md). No Windows os dados do
Hermes ficam em `%LOCALAPPDATA%\hermes\` (e não em `~/.hermes/`). Os comandos
abaixo são para o **PowerShell**.

## 1. Modelo

Hermes Desktop → **Settings → Model**: escolha um modelo forte como padrão
(Claude via API da Anthropic ou OpenRouter). O cron usa esse padrão.

## 2. Busca na web

**Settings → Tools & Keys → Web Search & Extract**: escolha Firecrawl, Exa ou
Tavily e cole a chave. Sem chave funciona, mas pode ficar limitado no meio da
rodada.

## 3. Telegram

**Messaging → Telegram → Create with QR**. Escaneie com o celular. Depois clique
em **Restart now**. Não conecte o WhatsApp.

## 4. Python

No PowerShell:

```powershell
python --version
```

Se não aparecer `Python 3.x` (ou abrir a Microsoft Store): instale pelo
[python.org](https://www.python.org/downloads/windows/) marcando **Add
python.exe to PATH**. Depois, em **Configurações → Aplicativos → Configurações
avançadas de aplicativos → Aliases de execução**, desligue `python.exe` e
`python3.exe` (os atalhos da Store). Feche e abra o PowerShell.

## 5. Supabase — usuário do agente

Igual ao [README, passo 5](README.md#5-supabase--usuário-do-agente):

1. Desligar "Allow new users to sign up".
2. Criar o usuário `hermes@sampsprojetos.com.br` com **Auto Confirm User**.
   Senha forte — gere no PowerShell:

   ```powershell
   -join ((48..57)+(65..90)+(97..122) | Get-Random -Count 28 | % {[char]$_})
   ```

3. Rodar o SQL de vínculo (ou pedir para o Claude fazer).

## 6. Variáveis

```powershell
notepad "$env:LOCALAPPDATA\hermes\.env"
```

Acrescente no fim e salve:

```
SUPABASE_URL=https://stbprwobloelftaglntp.supabase.co
SUPABASE_PUBLISHABLE_KEY=<mesma de VITE_SUPABASE_PUBLISHABLE_KEY na Vercel>
CRM_AGENTE_EMAIL=hermes@sampsprojetos.com.br
CRM_AGENTE_SENHA=<senha do passo 5>
CRM_DONO_ID=e962a6ed-ab8e-4675-80aa-da3e1beb7da1
```

## 7. Instalar a skill

```powershell
cd $env:USERPROFILE
git clone -b claude/wizardly-babbage-qwh3o4 https://github.com/masamps/samtech-landing.git
Copy-Item -Recurse -Force samtech-landing\hermes\skills\prospeccao-samps "$env:LOCALAPPDATA\hermes\skills\"
```

No Hermes Desktop: **Capabilities → Skills → Installed** deve listar
`prospeccao-samps`. Se não aparecer, reinicie o app.

Para atualizar depois: `git -C $env:USERPROFILE\samtech-landing pull` e repita
o `Copy-Item`.

## 8. Testar

Banco, sem o agente:

```powershell
cd "$env:LOCALAPPDATA\hermes\skills\prospeccao-samps"
python scripts\crm.py resumo
python scripts\crm.py existe "Clima Azul"
```

Esperado: `"total": 24` e `"existe": true`. O script lê o `.env` do Hermes
sozinho.

Agente, num chat novo do Hermes Desktop:

```
Use a skill prospeccao-samps e encontre 2 leads da Trilha A. Me mostre o relatório.
```

Confira os 2 leads no `/admin` antes de agendar.

## 9. Agendar

No PowerShell (uma linha):

```powershell
hermes cron create "0 8 * * 1-5" "Rode a prospecção do dia: 5 leads novos qualificados e os follow-ups vencidos. Siga a skill à risca e responda só com o relatório." --skill prospeccao-samps --name "Prospeccao diaria" --deliver telegram
```

Confira em **Scheduled jobs** no app.

O cron só roda com o PC ligado e o gateway ativo:

```powershell
hermes gateway install    # sobe o gateway no seu login, sem admin
hermes gateway status
```

E no app: **Settings → Advanced → Keep computer awake**, ou agende para um
horário em que o PC está sempre ligado.
