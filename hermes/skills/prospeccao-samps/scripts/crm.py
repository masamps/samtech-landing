#!/usr/bin/env python3
"""Ponte entre o agente e o CRM de prospecção (tabela crm_prospects).

Só biblioteca padrão — roda em qualquer máquina com Python 3.9+.

O agente entra com login próprio no Supabase Auth. O banco só deixa esse
login LER as linhas do dono e INSERIR lead novo como "Não contatado"; não há
como atualizar, apagar ou mudar status por aqui, nem por engano.

Uso:
  crm.py resumo                 contagem por status e trilha
  crm.py listar                 empresas já cadastradas (para não repetir)
  crm.py existe "Nome Ltda"     diz se a empresa já está no CRM
  crm.py inserir < lead.json    cadastra um lead (JSON no stdin)
  crm.py followups              follow-ups vencidos até hoje
  crm.py pendentes [n]          leads "Não contatado" mais antigos (padrão 10)
  crm.py whatsapp "<número>" < msg.txt
                                link wa.me com a mensagem já preenchida

Variáveis (no .env do Hermes: ~/.hermes/.env ou %LOCALAPPDATA%\\hermes\\.env):
  SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY,
  CRM_AGENTE_EMAIL, CRM_AGENTE_SENHA, CRM_DONO_ID
Se não vierem do ambiente, o script lê direto desse .env.
"""

import datetime
import json
import os
import re
import sys
import unicodedata
import urllib.error
import urllib.parse
import urllib.request

TABELA = "crm_prospects"

STATUS = [
    "Não contatado", "Contatado", "Respondeu", "Em conversa",
    "Proposta enviada", "Fechado", "Descartado",
]
CANAIS = ["WhatsApp", "E-mail", "Instagram", "LinkedIn", "Telefone"]
TRILHAS = ["A", "B"]
AVALIACOES = ["Sim", "Não", "Avaliar"]

# Mesmos limites do formulário do /admin (src/components/admin/FormProspect.jsx).
LIMITES = {
    "empresa": 120,
    "cidade": 80,
    "fonte": 120,
    "sinal_porte": 400,
    "contato": 80,
    "cargo": 80,
    "proxima_acao": 300,
    "observacoes": 2000,
}
ENUMS = {"trilha": TRILHAS, "canal": CANAIS, "vale_prototipo": AVALIACOES}
PERMITIDOS = set(LIMITES) | set(ENUMS)

# Palavras que não distinguem uma empresa da outra na hora de comparar nomes.
RUIDO = {
    "ltda", "me", "epp", "eireli", "sa", "s", "a", "ltd", "mei",
    "de", "da", "do", "das", "dos", "e", "&",
}


def falhar(msg, codigo=1):
    print(json.dumps({"erro": msg}, ensure_ascii=False))
    sys.exit(codigo)


def _arquivos_env():
    if os.environ.get("HERMES_HOME"):
        yield os.path.join(os.environ["HERMES_HOME"], ".env")
    if os.environ.get("LOCALAPPDATA"):
        yield os.path.join(os.environ["LOCALAPPDATA"], "hermes", ".env")
    yield os.path.join(os.path.expanduser("~"), ".hermes", ".env")


def _ler_env_hermes():
    # Fallback para rodar o script à mão, fora do Hermes.
    valores = {}
    for caminho in _arquivos_env():
        if not os.path.isfile(caminho):
            continue
        with open(caminho, encoding="utf-8-sig") as arquivo:
            for linha in arquivo:
                linha = linha.strip()
                if not linha or linha.startswith("#") or "=" not in linha:
                    continue
                chave, valor = linha.split("=", 1)
                chave = chave.strip().removeprefix("export ").strip()
                valores.setdefault(chave, valor.strip().strip('"').strip("'"))
        break
    return valores


_ENV_ARQUIVO = None


def env(nome):
    global _ENV_ARQUIVO
    valor = os.environ.get(nome, "").strip()
    if not valor:
        if _ENV_ARQUIVO is None:
            _ENV_ARQUIVO = _ler_env_hermes()
        valor = _ENV_ARQUIVO.get(nome, "").strip()
    if not valor:
        falhar(f"variável {nome} não definida no .env do Hermes")
    return valor


def normalizar(nome):
    texto = unicodedata.normalize("NFKD", nome or "")
    texto = "".join(c for c in texto if not unicodedata.combining(c)).lower()
    palavras = re.findall(r"[a-z0-9]+", texto)
    return " ".join(p for p in palavras if p not in RUIDO)


def limpar_texto(valor, limite):
    # Remove caracteres de controle (menos quebra de linha) e corta no limite.
    texto = "".join(c for c in str(valor) if c == "\n" or unicodedata.category(c)[0] != "C")
    return texto.strip()[:limite]


class Crm:
    def __init__(self):
        self.url = env("SUPABASE_URL").rstrip("/")
        self.chave = env("SUPABASE_PUBLISHABLE_KEY")
        self.dono = env("CRM_DONO_ID")
        self.token = self._entrar(env("CRM_AGENTE_EMAIL"), env("CRM_AGENTE_SENHA"))

    def _pedir(self, metodo, caminho, corpo=None, cabecalhos=None):
        dados = json.dumps(corpo).encode() if corpo is not None else None
        req = urllib.request.Request(self.url + caminho, data=dados, method=metodo)
        req.add_header("apikey", self.chave)
        req.add_header("Content-Type", "application/json")
        for chave, valor in (cabecalhos or {}).items():
            req.add_header(chave, valor)
        try:
            with urllib.request.urlopen(req, timeout=30) as resp:
                texto = resp.read().decode()
                return json.loads(texto) if texto else None
        except urllib.error.HTTPError as e:
            detalhe = e.read().decode(errors="replace")[:500]
            if e.code == 503 or "paused" in detalhe.lower():
                falhar("Supabase pausado ou fora do ar — restaurar pelo dashboard")
            falhar(f"HTTP {e.code} em {caminho.split('?')[0]}: {detalhe}")
        except urllib.error.URLError as e:
            falhar(f"sem conexão com o Supabase: {e.reason}")

    def _entrar(self, email, senha):
        resp = self._pedir(
            "POST", "/auth/v1/token?grant_type=password",
            {"email": email, "password": senha},
        )
        token = (resp or {}).get("access_token")
        if not token:
            falhar("login do agente falhou")
        return token

    def _rest(self, metodo, consulta, corpo=None, extra=None):
        cabecalhos = {"Authorization": f"Bearer {self.token}"}
        cabecalhos.update(extra or {})
        return self._pedir(metodo, f"/rest/v1/{TABELA}{consulta}", corpo, cabecalhos)

    def todos(self, colunas):
        consulta = "?" + urllib.parse.urlencode({
            "select": colunas,
            "user_id": f"eq.{self.dono}",
            "order": "empresa.asc",
        })
        return self._rest("GET", consulta) or []

    def achar(self, empresa):
        alvo = normalizar(empresa)
        if not alvo:
            return None
        for linha in self.todos("empresa,status,cidade"):
            atual = normalizar(linha["empresa"])
            # Igual, ou um nome contido no outro ("Clima Azul" x "Clima Azul
            # Ar Condicionado"). Nomes curtos demais não entram no "contido".
            if atual == alvo or (
                min(len(atual), len(alvo)) >= 6 and (alvo in atual or atual in alvo)
            ):
                return linha
        return None

    def inserir(self, lead):
        extras = set(lead) - PERMITIDOS
        if extras:
            falhar(f"campos não permitidos: {sorted(extras)}")
        registro = {}
        for campo, valor in lead.items():
            if valor in (None, ""):
                continue
            if campo in ENUMS:
                if valor not in ENUMS[campo]:
                    falhar(f"{campo} inválido: {valor!r}. Use um de {ENUMS[campo]}")
                registro[campo] = valor
            else:
                registro[campo] = limpar_texto(valor, LIMITES[campo])
        if not registro.get("empresa"):
            falhar("empresa é obrigatória")
        if not registro.get("trilha"):
            falhar("trilha é obrigatória (A ou B)")
        repetido = self.achar(registro["empresa"])
        if repetido:
            print(json.dumps({"repetido": repetido}, ensure_ascii=False))
            sys.exit(2)
        registro["user_id"] = self.dono
        registro["status"] = "Não contatado"
        registro.setdefault("vale_prototipo", "Avaliar")
        resp = self._rest(
            "POST", "?select=id,empresa", registro, {"Prefer": "return=representation"}
        )
        print(json.dumps({"inserido": resp[0] if resp else registro}, ensure_ascii=False))

    def followups(self):
        hoje = datetime.date.today().isoformat()
        consulta = "?" + urllib.parse.urlencode([
            ("select", "empresa,contato,canal,status,data_primeiro_contato,data_follow_up,proxima_acao"),
            ("user_id", f"eq.{self.dono}"),
            ("data_follow_up", f"lte.{hoje}"),
            ("status", "not.in.(Descartado,Fechado)"),
            ("order", "data_follow_up.asc"),
        ])
        return self._rest("GET", consulta) or []

    def pendentes(self, limite=10):
        consulta = "?" + urllib.parse.urlencode([
            ("select", "empresa,trilha,cidade,contato,cargo,canal,fonte,proxima_acao,observacoes,created_at"),
            ("user_id", f"eq.{self.dono}"),
            ("status", "eq.Não contatado"),
            ("order", "created_at.asc"),
            ("limit", str(limite)),
        ])
        return self._rest("GET", consulta) or []

    def resumo(self):
        linhas = self.todos("status,trilha,data_primeiro_contato")
        por_status = {s: 0 for s in STATUS}
        por_trilha = {t: 0 for t in TRILHAS}
        for linha in linhas:
            por_status[linha["status"]] = por_status.get(linha["status"], 0) + 1
            if linha.get("trilha"):
                por_trilha[linha["trilha"]] = por_trilha.get(linha["trilha"], 0) + 1
        return {
            "total": len(linhas),
            "contatados": sum(1 for l in linhas if l.get("data_primeiro_contato")),
            "por_status": por_status,
            "por_trilha": por_trilha,
        }


def link_whatsapp(numero, texto):
    """Monta o link wa.me. Não precisa de login: é só texto."""
    digitos = re.sub(r"\D", "", numero or "")
    if digitos.startswith("55") and len(digitos) in (12, 13):
        digitos = digitos[2:]
    if digitos.startswith("0"):
        falhar(f"{numero!r} é 0800/0300 — não existe WhatsApp nesse número")
    if len(digitos) not in (10, 11):
        falhar(f"número inválido: {numero!r} (use DDD + número)")
    celular = len(digitos) == 11 and digitos[2] == "9"
    return {
        "link": f"https://wa.me/55{digitos}?text={urllib.parse.quote(texto.strip())}",
        "celular": celular,
        "aviso": None if celular else "não parece celular — confirme se tem WhatsApp",
    }


def main():
    # Console do Windows usa cp1252 por padrão; acentos não podem derrubar o script.
    for fluxo in (sys.stdout, sys.stderr):
        if hasattr(fluxo, "reconfigure"):
            fluxo.reconfigure(encoding="utf-8", errors="replace")
    if len(sys.argv) < 2:
        falhar("comando faltando: resumo | listar | existe | inserir | followups | pendentes | whatsapp")
    comando = sys.argv[1]
    if comando == "whatsapp":
        if len(sys.argv) < 3:
            falhar('uso: crm.py whatsapp "(15) 99999-9999" < mensagem.txt')
        texto = sys.stdin.read()
        if not texto.strip():
            falhar("mande a mensagem no stdin")
        print(json.dumps(link_whatsapp(sys.argv[2], texto), ensure_ascii=False))
        return
    crm = Crm()
    if comando == "resumo":
        print(json.dumps(crm.resumo(), ensure_ascii=False, indent=2))
    elif comando == "listar":
        linhas = crm.todos("empresa,trilha,cidade,status")
        print(json.dumps(linhas, ensure_ascii=False, indent=2))
    elif comando == "existe":
        if len(sys.argv) < 3:
            falhar('uso: crm.py existe "Nome da empresa"')
        achado = crm.achar(sys.argv[2])
        print(json.dumps({"existe": bool(achado), "registro": achado}, ensure_ascii=False))
    elif comando == "inserir":
        try:
            lead = json.load(sys.stdin)
        except json.JSONDecodeError as e:
            falhar(f"JSON inválido no stdin: {e}")
        if not isinstance(lead, dict):
            falhar("mande um objeto JSON, um lead por vez")
        crm.inserir(lead)
    elif comando == "pendentes":
        limite = int(sys.argv[2]) if len(sys.argv) > 2 and sys.argv[2].isdigit() else 10
        print(json.dumps(crm.pendentes(min(limite, 30)), ensure_ascii=False, indent=2))
    elif comando == "followups":
        print(json.dumps(crm.followups(), ensure_ascii=False, indent=2))
    else:
        falhar(f"comando desconhecido: {comando}")


if __name__ == "__main__":
    main()
