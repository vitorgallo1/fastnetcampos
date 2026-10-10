/**
 * Dados oficiais da FastNet Campos.
 *
 * TODO o conteúdo comercial e de contato do site sai deste arquivo.
 * Itens marcados com `PENDENTE` não puderam ser verificados no site atual
 * (https://fastnetcampos.net.br/) durante o desenvolvimento e precisam ser
 * confirmados pelo responsável antes da publicação. Veja DADOS-A-CONFIRMAR.md.
 */

export type Plan = {
  id: string;
  name: string;
  speedMb: number;
  price: number;
  description: string;
  highlights: string[];
  featured?: boolean;
};

export type ResponsiveImage = {
  /** Arquivo maior, usado como fallback. */
  src: string;
  srcSet: string;
  width: number;
  height: number;
  /** Recorte opcional para telas menores que 1024 px. */
  mobile?: { src: string; width: number; height: number };
};

export type Locality = {
  name: string;
  kind: string;
  lat: number;
  lon: number;
  label: 'left' | 'right';
};

export const site = {
  name: 'FastNet Campos',
  url: 'https://fastnetcampos.net.br',
  city: 'Campos dos Goytacazes',
  state: 'RJ',

  /**
   * Logo oficial (arquivos enviados pela FastNet, em /brand/originais).
   * A versão para fundo escuro junta o ícone azul da logo completa com o
   * texto branco oficial. Com `null`, o site exibe o nome em texto simples.
   */
  logo: {
    /** Versão para fundos escuros (header e rodapé). */
    onDark: '/brand/logo-fastnet-branca.webp' as string | null,
    /** Dimensões intrínsecas do arquivo, para reservar o espaço e evitar salto de layout. */
    width: 373,
    height: 96,
  },

  contact: {
    /**
     * WhatsApp comercial no formato internacional, só dígitos.
     * PENDENTE: número retirado da referência visual enviada; confirmar.
     */
    whatsapp: '5522992135926',
    phoneDisplay: '(22) 99213-5926',
    phoneHref: 'tel:+5522992135926',
    /** PENDENTE: confirmar horário oficial de atendimento. */
    hours: 'Segunda a sábado',
    /** PENDENTE: e-mail oficial (deixe `null` para ocultar). */
    email: null as string | null,
  },

  /**
   * Central do Assinante (portal do provedor). Com `null`, os links levam o
   * assinante ao WhatsApp com uma mensagem de atendimento ao cliente.
   */
  subscriberPortalUrl: 'https://fastnetbandalargarj.centralassinante.com.br/#/login' as string | null,

  /** PENDENTE: perfis oficiais. Redes com `null` não são exibidas. */
  social: {
    instagram: null as string | null,
    facebook: null as string | null,
  },

  /** PENDENTE: razão social e CNPJ para o rodapé (deixe `null` para ocultar). */
  legal: {
    companyName: null as string | null,
    cnpj: null as string | null,
  },

  /**
   * Artes em /public/images/ (originais enviados pela FastNet em brand/originais/artes).
   * Com `null`, a seção usa uma composição gráfica própria. Especificações em README.md.
   */
  images: {
    hero: {
      src: '/images/hero-1672.webp',
      srcSet: '/images/hero-960.webp 960w, /images/hero-1672.webp 1672w',
      width: 1672,
      height: 941,
    } as ResponsiveImage | null,
    business: {
      src: '/images/empresas-2000.webp',
      srcSet: '/images/empresas-1200.webp 1200w, /images/empresas-2000.webp 2000w',
      width: 2000,
      height: 667,
      mobile: { src: '/images/empresas-mobile.webp', width: 760, height: 563 },
    } as ResponsiveImage | null,
    /** PENDENTE: panorama real de Campos dos Goytacazes. */
    coverage: null as string | null,
  },

  coverage: {
    /**
     * Área de atuação exibida no mapa e na lista da seção de cobertura
     * (confirmada pelo responsável). Com `confirmed: false`, mapa e lista somem.
     * Coordenadas aproximadas, na escala do mapa; `label` define o lado do nome.
     * Os municípios destacados no mapa ficam em scripts/gerar-mapa.py (SERVED).
     */
    confirmed: true,
    localities: [
      { name: 'Campos dos Goytacazes', kind: 'Município', lat: -21.754, lon: -41.324, label: 'left' },
      { name: 'São João da Barra', kind: 'Município', lat: -21.638, lon: -41.051, label: 'left' },
      { name: 'Goitacazes', kind: 'Distrito de Campos', lat: -21.813, lon: -41.268, label: 'right' },
      { name: 'Tocos', kind: 'Distrito de Campos', lat: -21.878, lon: -41.295, label: 'left' },
      { name: 'Farol de São Tomé', kind: 'Praia, em Campos', lat: -22.042, lon: -41.053, label: 'left' },
    ] satisfies Locality[],
    /**
     * Endpoint de consulta de viabilidade, se o sistema de gestão oferecer.
     * Sem endpoint, a consulta é encaminhada ao WhatsApp comercial.
     * Contrato esperado: POST JSON { cep, numero, endereco } →
     * { status: 'available' | 'unavailable' | 'unknown', message?: string }.
     */
    apiUrl: null as string | null,
  },

  plans: [
    {
      id: 'essencial',
      name: 'Essencial',
      speedMb: 200,
      price: 70,
      description: 'Para navegação, estudos e redes sociais no dia a dia.',
      highlights: ['Navegação e redes sociais', 'Estudos e videochamadas', 'Uso diário da casa'],
    },
    {
      id: 'familia',
      name: 'Família',
      speedMb: 500,
      price: 80,
      description: 'Para streaming, vários dispositivos e toda a família.',
      highlights: ['Streaming em vários ambientes', 'Vários dispositivos conectados', 'Home office e estudos'],
      featured: true,
    },
    {
      id: 'gamer',
      name: 'Gamer',
      speedMb: 800,
      price: 100,
      description: 'Para games, trabalho e uso intenso da conexão.',
      highlights: ['Jogos online', 'Downloads e arquivos pesados', 'Casas com uso intenso'],
    },
  ] satisfies Plan[],
};

export const navLinks = [
  { id: 'planos', label: 'Planos' },
  { id: 'beneficios', label: 'Benefícios' },
  { id: 'empresas', label: 'Empresas' },
  { id: 'cobertura', label: 'Cobertura' },
] as const;

export const maxSpeed = Math.max(...site.plans.map((p) => p.speedMb));
