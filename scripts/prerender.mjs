// Pré-renderiza a página em HTML estático após o build, para SEO e carregamento mais rápido.
import { readFile, rm, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('..', import.meta.url));
const serverEntry = new URL('../dist-ssr/entry-server.js', import.meta.url);

const { render } = await import(serverEntry.href);
const template = await readFile(`${root}dist/index.html`, 'utf8');
const html = template.replace('<div id="root"></div>', `<div id="root">${render()}</div>`);
if (html === template) throw new Error('Marcador <div id="root"></div> não encontrado em dist/index.html');

await writeFile(`${root}dist/index.html`, html);
await rm(`${root}dist-ssr`, { recursive: true, force: true });
console.log('✓ dist/index.html pré-renderizado');
