import { StrictMode } from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';
import './index.css';
import App from './App';

const container = document.getElementById('root')!;
const app = (
  <StrictMode>
    <App />
  </StrictMode>
);

// Em produção o HTML vem pré-renderizado (scripts/prerender.mjs); no dev, renderiza do zero.
if (container.hasChildNodes()) hydrateRoot(container, app);
else createRoot(container).render(app);
