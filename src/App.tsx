import { LazyMotion, MotionConfig, domAnimation } from 'framer-motion';
import { FloatingWhatsApp } from '@/components/layout/FloatingWhatsApp';
import { Footer } from '@/components/layout/Footer';
import { Header } from '@/components/layout/Header';
import { Business } from '@/sections/Business';
import { Contact } from '@/sections/Contact';
import { Coverage } from '@/sections/Coverage';
import { Features } from '@/sections/Features';
import { Hero } from '@/sections/Hero';
import { Plans } from '@/sections/Plans';

export default function App() {
  return (
    <LazyMotion features={domAnimation} strict>
      <MotionConfig reducedMotion="user">
      <a
        href="#conteudo"
        className="sr-only z-[60] rounded-md bg-white px-4 py-2 font-semibold text-navy focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
      >
        Pular para o conteúdo
      </a>
      <Header />
      <main id="conteudo">
        <Hero />
        <Plans />
        <Business />
        <Features />
        <Coverage />
        <Contact />
      </main>
      <Footer />
      <FloatingWhatsApp />
      </MotionConfig>
    </LazyMotion>
  );
}
