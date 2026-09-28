# Perfil de cliente e onde procurar

## Trilha A — conferência de pedido × nota fiscal (prioridade)

**O que já existe:** sistema que lê o PDF do pedido de compra, cruza com a nota
fiscal, acusa divergência (preço, quantidade, desconto, frete) e mostra os
custos. Roda hoje para um seller do Mercado Livre.

**Dor:** frete, desconto e promoção da plataforma não se replicam na nota; quem
confere pedido por pedido à mão perde tempo e deixa passar erro que vira
prejuízo ou problema fiscal.

**Quem é:**
- Seller com CNPJ no Mercado Livre, Shopee, Amazon ou Magalu.
- Volume médio: dezenas a centenas de pedidos por dia, várias notas por dia.
- Compra de vários fornecedores (revenda) ou tem operação com mais de uma pessoa
  no financeiro/estoque.
- Não é gigante (varejista grande já tem ERP com conferência).

**Sinais de porte:** MercadoLíder (Gold/Platinum), loja oficial, milhares de
vendas no perfil, catálogo com centenas de anúncios, marca própria com site,
vaga aberta de "assistente de e-commerce" ou "faturamento".

**Consultas úteis:**
- `"loja oficial" mercado livre <segmento> Sorocaba`
- `site:mercadolivre.com.br/pagina <segmento>` e depois o nome da loja no Google
- `e-commerce <segmento> Sorocaba CNPJ` / `distribuidora <segmento> vende no mercado livre`
- `vaga "assistente de e-commerce" Sorocaba` (quem contrata tem volume)
- Instagram: `<segmento> "compre no mercado livre" Sorocaba`

Segmentos com muita nota por pedido: autopeças, ferramentas, material
elétrico, informática, suplementos, pet, casa e construção.

**Contato:** o perfil do marketplace não dá contato direto. Ache o site,
Instagram ou CNPJ da empresa por trás da loja e use o canal comercial dela.

## Trilha B — serviço em campo com relatório por visita

**O que já existe:** protótipo de app de ordem de serviço (login do técnico,
OS do dia, checklist por tipo, fotos, materiais, assinatura, PDF) + painel do
gestor. Não mencione o protótipo na primeira mensagem.

**Argumento:** o documento já é obrigatório. A pergunta não é "quer um app?",
é "esse documento que você já emite toda visita sai pronto do celular?".

Segmentos, em ordem de prioridade:

| Segmento | Documento | Consulta |
|---|---|---|
| Ar-condicionado comercial/industrial | PMOC e relatório de manutenção | `PMOC <cidade>`, `manutenção ar condicionado empresas <cidade>` |
| Controle de pragas | Certificado/laudo de execução exigido pela vigilância sanitária | `dedetizadora laudo técnico <cidade>`, `controle de pragas empresas <cidade>` |
| Elevadores | Relatório de inspeção/manutenção | `manutenção de elevadores <cidade>` |
| Solar (O&M) | Relatório de preventiva com fotos | `manutenção usina solar <cidade>`, `limpeza placas solares empresas <cidade>` |
| Manutenção industrial/predial | Relatório de OS com fotos | `manutenção industrial <cidade>`, `manutenção predial condomínios <cidade>` |
| Extintores e incêndio | Relatório de inspeção | `recarga extintores empresas <cidade>` |

Cidades: Sorocaba, Votorantim, Itu, Salto, Tatuí, Boituva, Itapetininga, Porto
Feliz, Mairinque, São Roque, Indaiatuba, Jundiaí.

**Concorrentes a identificar** (se a empresa já usa, descarte): Auvo, Field
Control, Produttivo, Nomus, Fieldy. Sinais: link de app no site, "acompanhe sua
OS online", print de relatório com logo desses sistemas.

## Fontes

- `web_search` e `web_extract` para Google, Maps, sites e Instagram.
- BrasilAPI para CNPJ: `https://brasilapi.com.br/api/cnpj/v1/<14 dígitos>` —
  devolve razão social, porte, CNAE, situação, abertura, município.
- LinkedIn da empresa para nome e cargo do dono/gestor, quando público.

O que escrever em `sinal_porte`: fatos com fonte, curtos. Ex.: "Site cita 12
técnicos e contratos PMOC com indústrias; CNPJ EPP aberto em 2014; atende 8
cidades." Nada de adjetivo sem número.
