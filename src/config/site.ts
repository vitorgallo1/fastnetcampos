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
   * Central do Assinante (portal do provedor).
   * PENDENTE: URL oficial. Enquanto for `null`, os links levam o assinante
   * ao WhatsApp com uma mensagem de atendimento ao cliente.
   */
  subscriberPortalUrl: null as string | null,

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
   * Fotografias reais (JPG/WebP otimizados) em /public/images/.
   * Enquanto um caminho for `null`, a seção usa uma composição gráfica
   * própria, sem imagem ilustrativa genérica. Especificações em README.md.
   */
  images: {
    hero: null as string | null,
    business: null as string | null,
    coverage: null as string | null,
  },

  coverage: {
    /**
     * Localidades atendidas. Só são exibidas quando `confirmed` for true.
     * PENDENTE: lista retirada da referência visual; confirmar.
     */
    confirmed: false,
    localities: ['Campos dos Goytacazes', 'São João da Barra', 'Tocos', 'Goitacazes', 'Farol'],
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
