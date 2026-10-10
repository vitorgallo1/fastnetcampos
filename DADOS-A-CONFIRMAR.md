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
| **Central do Assinante** | ✅ `https://fastnetbandalargarj.centralassinante.com.br/#/login` | — |
| **Instagram / Facebook** | `null` → os ícones ficam ocultos | Informar as URLs dos perfis oficiais. |
| **E-mail** | `null` → oculto | Informar, se existir. |
| **Razão social e CNPJ** | `null` → o rodapé mostra "FastNet Campos" | Informar para o rodapé (recomendado). |
| **Localidades atendidas** | ✅ Confirmadas: Campos dos Goytacazes, São João da Barra, Goitacazes, Tocos e Farol de São Tomé (mapa na seção de cobertura) | Revisar a posição de Goitacazes e Tocos no mapa (coordenadas aproximadas). |
| **Consulta de viabilidade** | `apiUrl: null` → a consulta vai para o WhatsApp comercial | Se o sistema de gestão tiver uma API de viabilidade, informar o endpoint (contrato descrito no arquivo). |
| **Planos e preços** | 200 Mb R$ 70, 500 Mb R$ 80, 800 Mb R$ 100 (do briefing) | Confirmar. Nenhum benefício contratual (instalação grátis, fidelidade, roteador) foi incluído. |
| **Fotografias** | ✅ Hero e Link Corporativo com as artes enviadas. Cobertura ainda usa composição gráfica | Enviar um panorama real de Campos dos Goytacazes, se quiserem foto nessa seção. |
| **Ícone do site (favicon)** | ✅ Arte oficial enviada pela FastNet (`brand/originais/fastnet-favicon.png`) | — |
| **Imagem de compartilhamento** | ✅ `public/og-image.png` com a logo oficial | — |
