import { createServer } from 'node:http';
import { readFile } from 'node:fs';
import { extname, resolve, sep } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('.', import.meta.url));
const modern = resolve(root, 'modern', 'dist', 'modern', 'browser');
const legacy = resolve(root, 'legacy', 'dist', 'banco-vermelho');
const port = Number(process.env.PORT || 4200);
const types = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.ico': 'image/x-icon',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.woff2': 'font/woff2'
};

if (!Number.isInteger(port) || port < 1 || port > 65535) {
  throw new Error('PORT deve ser uma porta válida entre 1 e 65535.');
}

createServer((request, response) => {
  if (request.method !== 'GET' && request.method !== 'HEAD') {
    response.writeHead(405, { Allow: 'GET, HEAD' }).end();
    return;
  }

  let pathname;
  try {
    pathname = decodeURIComponent(new URL(request.url, 'http://localhost').pathname);
  } catch {
    response.writeHead(400).end('URL inválida');
    return;
  }

  const isLegacy = pathname === '/legado' || pathname.startsWith('/legado/');
  const directory = isLegacy ? legacy : modern;
  const relative = isLegacy ? pathname.slice('/legado'.length) : pathname;
  const routes = isLegacy
    ? ['', '/', '/inicio', '/contas', '/movimentacoes', '/investimentos']
    : ['', '/', '/inicio', '/contas'];
  const filename = resolve(directory, '.' + (routes.includes(relative) ? '/index.html' : relative));
  if (filename !== directory && !filename.startsWith(directory + sep)) {
    response.writeHead(403).end('Caminho inválido');
    return;
  }

  readFile(filename, (error, content) => {
    if (error) {
      if (error.code === 'ENOENT' || error.code === 'EISDIR') {
        response.writeHead(404).end('Arquivo não encontrado. Compile as duas aplicações antes de iniciar.');
        return;
      }
      console.error('Erro ao ler arquivo:', error);
      response.writeHead(500).end('Erro ao servir a aplicação.');
      return;
    }
    response.writeHead(200, { 'Content-Type': types[extname(filename)] || 'application/octet-stream' });
    response.end(request.method === 'HEAD' ? undefined : content);
  });
}).listen(port, '127.0.0.1', () => {
  console.log(`Banco Roxo disponível em http://127.0.0.1:${port}`);
});
