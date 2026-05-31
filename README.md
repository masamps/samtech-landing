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

Quase todo o conteúdo (serviços, diferenciais, processo, projetos, depoimentos,
FAQ e dados de contato) fica centralizado em **`src/data/site.js`**.

> **Importante:** atualize os dados de contato em `src/data/site.js`
> (`email`, `whatsapp`, `whatsappLabel`) e o domínio nos arquivos de SEO
> (`index.html`, `public/robots.txt`, `public/sitemap.xml`) com as informações
> reais da empresa antes de publicar.

## 🔎 SEO incluído

- Meta tags de título, descrição e keywords em português
- Open Graph e Twitter Cards (com imagem de compartilhamento)
- Dados estruturados (JSON-LD) do tipo `ProfessionalService`
- `robots.txt` e `sitemap.xml`
- HTML semântico, acessibilidade (skip link, foco visível, `aria-*`)
- URL canônica e `lang="pt-BR"`

## 🌐 Deploy

O projeto gera um site estático em `/dist`, pronto para hospedagem em
Vercel, Netlify, GitHub Pages, Cloudflare Pages ou qualquer servidor estático.
