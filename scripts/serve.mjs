import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';

const root = path.resolve('dist');
const mime = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.mjs': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.ico': 'image/x-icon',
  '.pdf': 'application/pdf',
  '.mp3': 'audio/mpeg',
  '.wav': 'audio/wav'
};

http.createServer((req, res) => {
  let pathname;
  try {
    pathname = decodeURIComponent(new URL(req.url, 'http://localhost').pathname);
  } catch {
    res.writeHead(400).end();
    return;
  }

  let filePath = pathname === '/' ? '/index.html' : pathname;
  if (filePath === '/quest' || filePath === '/quest/') {
    filePath = '/quest/index.html';
  }

  let target = path.resolve(root, '.' + filePath);
  if (!target.startsWith(root + path.sep) && target !== root) {
    res.writeHead(403).end('Forbidden');
    return;
  }

  try {
    const stat = fs.statSync(target);
    if (stat.isDirectory()) {
      const idx = path.join(target, 'index.html');
      if (fs.existsSync(idx)) {
        target = idx;
      }
    }
  } catch {
    // stat failed, let readFile handle 404
  }

  fs.readFile(target, (error, data) => {
    if (error) {
      res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' }).end('Not found');
      return;
    }
    const ext = path.extname(target).toLowerCase();
    res.writeHead(200, {
      'Content-Type': mime[ext] || 'application/octet-stream',
      'Cache-Control': 'no-cache'
    });
    res.end(data);
  });
}).listen(4173, '127.0.0.1', () => console.log('Local: http://127.0.0.1:4173'));
