import { site, type Plan } from '@/config/site';

export function whatsappUrl(message: string) {
  return `https://wa.me/${site.contact.whatsapp}?text=${encodeURIComponent(message)}`;
}

export const messages = {
  general: 'Olá! Vim pelo site da FastNet e gostaria de mais informações.',
  hire: 'Olá! Vim pelo site da FastNet e gostaria de contratar um plano de internet.',
  plan: (plan: Plan) =>
    `Olá! Tenho interesse no plano FastNet de ${plan.speedMb} Mb por R$ ${plan.price}/mês. Gostaria de consultar a disponibilidade para o meu endereço.`,
  business:
    'Olá! Represento uma empresa e gostaria de falar com um especialista sobre o Link Corporativo da FastNet.',
  subscriber: 'Olá! Sou assinante FastNet e preciso de atendimento.',
  coverage: (address: string, name?: string) =>
    [
      'Olá! Gostaria de consultar a cobertura da FastNet para o meu endereço.',
      name ? `Nome: ${name}` : null,
      `Endereço: ${address}`,
    ]
      .filter(Boolean)
      .join('\n'),
};

/** Link da Central do Assinante: portal oficial, ou WhatsApp enquanto a URL não for confirmada. */
export function subscriberPortalHref() {
  return site.subscriberPortalUrl ?? whatsappUrl(messages.subscriber);
}
