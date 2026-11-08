import { createServer } from 'node:http';
import { readFile } from 'node:fs';
import { extname, resolve, sep } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('.', import.meta.url));
const dist = resolve(root, 'dist');
const remotes = new Set(['inicio', 'contas', 'movimentacoes', 'investimentos']);
const portArgument = process.argv.find(argument => argument.startsWith('--port='));
const port = Number(portArgument ? portArgument.slice('--port='.length) : process.env.PORT || 4200);
const types = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon'
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

  const parts = pathname.split('/');
  let directory = resolve(dist, 'banco-roxo');
  let relative = pathname;
  if (parts[1] === 'remotes') {
    if (!remotes.has(parts[2])) {
      response.writeHead(404).end('Microfrontend desconhecido.');
      return;
    }
    directory = resolve(dist, parts[2]);
    relative = '/' + parts.slice(3).join('/');
  } else if (!extname(pathname)) {
    relative = '/index.html';
  }

  const filename = resolve(directory, '.' + relative);
  if (!filename.startsWith(directory + sep)) {
    response.writeHead(403).end('Caminho inválido');
    return;
  }
  readFile(filename, (error, content) => {
    if (error) {
      if (error.code === 'ENOENT' || error.code === 'EISDIR') {
        response.writeHead(404).end('Arquivo não encontrado. Compile o shell e os microfrontends.');
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
