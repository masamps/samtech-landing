# Samps Projetos — Website

Site institucional da **Samps Projetos**, especializada no desenvolvimento de
**sistemas web, sites e aplicativos mobile** sob medida.

Construído com foco em **UI/UX moderna**, **performance** e **SEO**.

## 🚀 Tecnologias

- [React 18](https://react.dev/) + [Vite](https://vitejs.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Framer Motion](https://www.framer.com/motion/) (animações)
- [Lucide Icons](https://lucide.dev/)
- Fontes variáveis Sora + Manrope (self-hosted via Fontsource)

## 📦 Como rodar

```bash
npm install      # instala as dependências
npm run dev      # ambiente de desenvolvimento (http://localhost:5173)
npm run build    # build de produção (gera /dist)
npm run preview  # pré-visualiza o build de produção
```

## 🗂 Estrutura

```
public/            # robots.txt, sitemap.xml, favicon e og-image (SEO)
src/
  components/      # componentes de UI e seções da página
  data/site.js     # CONTEÚDO do site (textos, serviços, contato...)
  lib/             # utilitários (variantes de animação)
  App.jsx          # composição das seções
index.html         # meta tags, Open Graph, Twitter Card e JSON-LD
```

## ✏️ Como editar o conteúdo

Quase todo o conteúdo (serviços, diferenciais, cases, depoimentos e dados de
contato) fica centralizado em **`src/data/site.js`**.

## ⚙️ Configuração (leads e rastreamento)

Todas as integrações são opcionais e ligadas por **variáveis de ambiente**.
Sem elas o site funciona normalmente — o formulário apenas cai no WhatsApp e
nenhum rastreamento é carregado. Veja **`.env.example`** para a lista completa.

Na Vercel: **Settings → Environment Variables** (depois refaça o deploy).

| Variável | Para que serve | Onde obter |
|---|---|---|
| `VITE_FORMSPREE_ID` | Recebe os leads do formulário **por e-mail** | [formspree.io](https://formspree.io) |
| `VITE_GA4_ID` | Google Analytics 4 (`G-XXXX`) | [analytics.google.com](https://analytics.google.com) |
| `VITE_GOOGLE_ADS_ID` | Conversões do Google Ads (`AW-XXXX`) | Painel do Google Ads |
| `VITE_META_PIXEL_ID` | Meta Pixel (Facebook/Instagram) | [business.facebook.com](https://business.facebook.com) |

### Eventos de conversão enviados

`lead_formulario` (envio do form), `clique_whatsapp`, `clique_whatsapp_hero`,
`clique_whatsapp_menu`, `clique_whatsapp_flutuante`, `clique_email`.
No Meta, todos são reportados como o evento padrão **`Lead`**.

> **Antes de publicar:** confira os dados de contato em `src/data/site.js`
> (`email`, `whatsapp`, `whatsappLabel`) e o domínio nos arquivos de SEO
> (`index.html`, `public/robots.txt`, `public/sitemap.xml`).

## 🔎 SEO incluído

- Meta tags de título, descrição e keywords em português
- Open Graph e Twitter Cards (com imagem de compartilhamento)
- Dados estruturados (JSON-LD) do tipo `ProfessionalService`
- `robots.txt` e `sitemap.xml`
- HTML semântico, acessibilidade (skip link, foco visível, `aria-*`)
- URL canônica e `lang="pt-BR"`
- Política de Privacidade (LGPD) em `/politica-de-privacidade.html`

## 🌐 Deploy

O projeto gera um site estático em `/dist`, pronto para hospedagem em
Vercel, Netlify, GitHub Pages, Cloudflare Pages ou qualquer servidor estático.
