# Dados a confirmar antes da publicação

O site atual (https://fastnetcampos.net.br/) não estava acessível a partir do
ambiente de desenvolvimento, então nenhum dado oficial pôde ser conferido nele.
Tudo abaixo fica em **`src/config/site.ts`** — basta editar esse arquivo e
rodar `npm run build` de novo.

| Item | Situação atual no código | O que fazer |
| --- | --- | --- |
| **Logo oficial** | ✅ Recebida. Originais em `brand/originais/`; versão para fundo escuro (ícone azul + texto branco) em `public/brand/` | Se existir a logo em vetor (SVG, AI ou PDF), vale substituir para nitidez máxima. |
| **WhatsApp comercial** | `5522992135926` / (22) 99213-5926, tirado da imagem de referência | Confirmar o número. Ele alimenta todos os botões, o formulário de cobertura, o rodapé e o SEO. Também aparece no `<noscript>` do `index.html`. |
| **Horário de atendimento** | "Segunda a sábado", tirado da imagem de referência | Confirmar e, se possível, informar os horários. |
| **Central do Assinante** | `subscriberPortalUrl: null` → o link abre o WhatsApp com "Sou assinante FastNet e preciso de atendimento" | Informar a URL do portal do assinante (SGP, IXC, MK etc.). |
| **Instagram / Facebook** | `null` → os ícones ficam ocultos | Informar as URLs dos perfis oficiais. |
| **E-mail** | `null` → oculto | Informar, se existir. |
| **Razão social e CNPJ** | `null` → o rodapé mostra "FastNet Campos" | Informar para o rodapé (recomendado). |
| **Localidades atendidas** | Campos dos Goytacazes, São João da Barra, Tocos, Goitacazes e Farol, com `confirmed: false` → a lista **não** aparece | Confirmar a lista e mudar para `confirmed: true`. |
| **Consulta de viabilidade** | `apiUrl: null` → a consulta vai para o WhatsApp comercial | Se o sistema de gestão tiver uma API de viabilidade, informar o endpoint (contrato descrito no arquivo). |
| **Planos e preços** | 200 Mb R$ 70, 500 Mb R$ 80, 800 Mb R$ 100 (do briefing) | Confirmar. Nenhum benefício contratual (instalação grátis, fidelidade, roteador) foi incluído. |
| **Fotografias** | `images.*: null` → as seções usam composições gráficas próprias | Fornecer fotos reais (veja "Fotografias" no README). |
| **Ícone do site (favicon)** | ✅ Arte oficial enviada pela FastNet (`brand/originais/fastnet-favicon.png`) | — |
| **Imagem de compartilhamento** | ✅ `public/og-image.png` com a logo oficial | — |
