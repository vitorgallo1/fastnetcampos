import { defineConfig, type Plugin } from 'vite';
import react from '@vitejs/plugin-react';
import { fileURLToPath, URL } from 'node:url';
import { site } from './src/config/site';

/** Gera os dados estruturados (SEO local) a partir de src/config/site.ts. */
function structuredData(): Plugin {
  const sameAs = Object.values(site.social).filter(Boolean);
  const data = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    additionalType: 'https://schema.org/TelecommunicationsCompany',
    name: site.name,
    url: `${site.url}/`,
    telephone: `+${site.contact.whatsapp}`,
    image: `${site.url}/og-image.png`,
    address: {
      '@type': 'PostalAddress',
      addressLocality: site.city,
      addressRegion: site.state,
      addressCountry: 'BR',
    },
    areaServed: { '@type': 'City', name: site.city },
    ...(sameAs.length ? { sameAs } : {}),
    makesOffer: site.plans.map((plan) => ({
      '@type': 'Offer',
      name: `Plano ${plan.name} ${plan.speedMb} Mb`,
      price: plan.price.toFixed(2),
      priceCurrency: 'BRL',
      category: 'Internet fibra óptica residencial',
    })),
  };
  return {
    name: 'structured-data',
    transformIndexHtml: (html) =>
      html.replace(
        '<!-- structured-data -->',
        `<script type="application/ld+json">${JSON.stringify(data)}</script>`,
      ),
  };
}

export default defineConfig(({ isSsrBuild }) => ({
  plugins: [react(), structuredData()],
  resolve: {
    alias: { '@': fileURLToPath(new URL('./src', import.meta.url)) },
  },
  build: {
    target: 'es2020',
    rollupOptions: isSsrBuild
      ? {}
      : {
          output: {
            manualChunks: {
              react: ['react', 'react-dom'],
              motion: ['framer-motion'],
            },
          },
        },
  },
}));
