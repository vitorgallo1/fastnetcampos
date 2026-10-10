# FastNet Campos — site institucional

Landing page da FastNet Campos, provedor de internet fibra óptica em Campos dos
Goytacazes (RJ). Foco em conversão pelo WhatsApp.

**Antes de publicar, leia [DADOS-A-CONFIRMAR.md](./DADOS-A-CONFIRMAR.md).**

## Stack

- React 18 + TypeScript, Vite 5
- Tailwind CSS 3
- Framer Motion (carregado via `LazyMotion`; respeita `prefers-reduced-motion`)
- Lucide React (ícones) e `simple-icons` (WhatsApp, Instagram, Facebook)
- Fontes Plus Jakarta Sans e Inter auto-hospedadas (subconjunto latino, licença OFL)
- HTML pré-renderizado no build: o conteúdo já vem no `index.html`, o que ajuda no SEO e no carregamento

## Comandos

```bash
npm install
npm run dev        # desenvolvimento em http://localhost:5173
npm run build      # build de produção em dist/ (com pré-renderização)
npm run preview    # serve o build em http://localhost:4173
npm run typecheck
```

Requer Node 18 ou mais recente (testado com Node 22).

## Publicação

A pasta `dist/` é um site estático e pode ser publicada em qualquer hospedagem.

- **Netlify**: o `netlify.toml` já define o build, a pasta de publicação e os cabeçalhos de cache. Basta conectar o repositório.
- **Vercel / Cloudflare Pages**: comando `npm run build` e pasta de saída `dist`.
- **Hospedagem comum (cPanel / FTP)**: rode `npm run build` e envie o *conteúdo* de `dist/` para a pasta pública do domínio.

Se o domínio final não for `https://fastnetcampos.net.br`, atualize `site.url` em
`src/config/site.ts` e as URLs em `index.html`, `public/robots.txt` e `public/sitemap.xml`.

## Onde editar

| O quê | Arquivo |
| --- | --- |
| Contatos, planos, links, localidades, imagens, logo | `src/config/site.ts` |
| Arquivos da logo | `brand/originais/` (enviados pela FastNet) e `public/brand/` (versões usadas no site) |
| Mensagens enviadas ao WhatsApp | `src/lib/whatsapp.ts` |
| Título, descrição e Open Graph | `index.html` |
| Cores e fontes | `tailwind.config.ts` e `src/index.css` |
| Seções da página | `src/sections/` |

## Estrutura

```
src/
  config/site.ts          dados oficiais (fonte única)
  lib/                    WhatsApp, consulta de CEP (ViaCEP), utilidades
  hooks/                  rolagem e seção ativa do menu
  components/ui/          Button, Container, Eyebrow, Reveal, Logo, ícones de marca
  components/layout/      Header (com menu móvel), Footer, botão flutuante de WhatsApp
  sections/               Hero, Plans, Business, Features, Coverage (+ formulário), Contact
  entry-server.tsx        usado pela pré-renderização
scripts/prerender.mjs     injeta o HTML renderizado em dist/index.html
```

## Funcionalidades

- **Planos**: cada botão abre o WhatsApp com a mensagem "Olá! Tenho interesse no plano FastNet de [VELOCIDADE] por R$ [VALOR]/mês…".
- **Link Corporativo**: botão com mensagem própria para atendimento empresarial.
- **Consulta de cobertura**: valida CEP (8 dígitos) e número, ou o endereço completo, e completa rua, bairro e cidade pela base pública ViaCEP. Sem API de viabilidade configurada, a consulta é enviada ao WhatsApp comercial e o site **não** afirma que há cobertura. Com `coverage.apiUrl`, faz a consulta real e mostra o resultado.
- **Central do Assinante**: portal oficial quando configurado; antes disso, atendimento pelo WhatsApp.
- **Botão flutuante de WhatsApp**: aparece depois do hero e some sobre o formulário de cobertura, a seção de contato e o rodapé (no celular, também sobre os planos) para não cobrir outros elementos.
- **Menu**: fixo, com destaque da seção atual; no celular, menu hambúrguer que fecha com Esc.
- **Animações**: entrada do hero linha a linha (CSS, roda direto do HTML pré-renderizado), sublinhado desenhado sob "move você.", pulsos de luz nas fibras, contagem até a velocidade máxima, seções surgindo na rolagem, mockup de WhatsApp que "digita" e envia a mensagem, sinais pulsando na cobertura, brilho nos botões, barra de progresso de leitura (CSS `animation-timeline`, sem JS) e menu móvel escalonado. Só `transform`, `opacity` e `stroke-dashoffset`; tudo para com `prefers-reduced-motion`. Utilitários em `src/index.css`.
- **SEO**: title, description, canonical, Open Graph, dados estruturados `LocalBusiness` gerados a partir de `site.ts`, `sitemap.xml` e `robots.txt`.
- **Acessibilidade**: link "pular para o conteúdo", foco visível, rótulos e mensagens de erro associados aos campos, contraste AA nos textos.

## Imagens

As artes enviadas pela FastNet ficam em `brand/originais/artes/`; as versões
servidas pelo site, em `public/images/`, configuradas em `site.images`
(`src/config/site.ts`). Cada tela baixa só o tamanho de que precisa:

| Chave | Arquivos | Comportamento |
| --- | --- | --- |
| `hero` | `hero-960.webp`, `hero-1672.webp` | Fundo do hero a partir de 1024 px; abaixo disso não aparece nem é baixada |
| `business` | `empresas-mobile.webp`, `empresas-1200.webp`, `empresas-2000.webp` | Fundo da seção a partir de 1280 px; abaixo disso, card sob o conteúdo |
| `coverage` | — (pendente) | Panorama de Campos dos Goytacazes; sem ele, a seção usa uma composição gráfica |

Para trocar uma arte, gere as larguras equivalentes (ex.: `cwebp -q 76 -resize 1200 0 arte.jpg -o arte-1200.webp`)
e atualize os caminhos em `site.images`.
