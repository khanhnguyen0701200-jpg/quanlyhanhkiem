const http = require('http');
const fs = require('fs');
const path = require('path');
const { URL } = require('url');

const PORT = Number(process.env.PORT || 3000);
const ROOT = __dirname;
const DATA_FILE = path.join(process.env.DATA_DIR || ROOT, 'data.json');
const MIME = { '.html':'text/html; charset=utf-8', '.js':'text/javascript; charset=utf-8', '.css':'text/css; charset=utf-8', '.png':'image/png', '.json':'application/json; charset=utf-8' };

function ensureData() {
  if (!fs.existsSync(DATA_FILE)) {
    fs.writeFileSync(DATA_FILE, JSON.stringify({ version: 4, admin: { username:'admin', password:'admin123' }, teachers:[], students:[], rules:[{id:'v-late',type:'violation',name:'Đi học muộn',points:1},{id:'v-uniform',type:'violation',name:'Không đúng đồng phục',points:1},{id:'v-homework',type:'violation',name:'Không làm bài tập',points:1},{id:'v-phone',type:'violation',name:'Sử dụng điện thoại sai quy định',points:2},{id:'r-participate',type:'reward',name:'Tích cực phát biểu',points:1},{id:'r-help',type:'reward',name:'Giúp đỡ bạn bè',points:1},{id:'r-achievement',type:'reward',name:'Có thành tích tốt',points:2},{id:'r-activity',type:'reward',name:'Tham gia hoạt động trường',points:1}], teacherRules:[], history:[], settings:{ siteName:'Quản lý điểm hạnh kiểm', maxScore:10 } }, null, 2));
  }
}
function send(res, code, body, type='application/json; charset=utf-8') { res.writeHead(code, {'Content-Type':type, 'Cache-Control':'no-store'}); res.end(body); }
function serveStatic(req, res) {
  let pathname = decodeURIComponent(new URL(req.url, `http://${req.headers.host}`).pathname);
  if (pathname === '/') pathname = '/index.html';
  const file = path.normalize(path.join(ROOT, pathname));
  if (!file.startsWith(ROOT) || !fs.existsSync(file) || fs.statSync(file).isDirectory()) return send(res, 404, 'Not found', 'text/plain; charset=utf-8');
  send(res, 200, fs.readFileSync(file), MIME[path.extname(file)] || 'application/octet-stream');
}
ensureData();
http.createServer((req, res) => {
  const pathname = new URL(req.url, `http://${req.headers.host}`).pathname;
  if (pathname === '/api/data' && req.method === 'GET') return send(res, 200, fs.readFileSync(DATA_FILE, 'utf8'));
  if (pathname === '/api/data' && req.method === 'PUT') {
    let body = ''; req.on('data', chunk => { if (body.length < 10_000_000) body += chunk; });
    req.on('end', () => { try { const parsed = JSON.parse(body); fs.writeFileSync(DATA_FILE, JSON.stringify(parsed, null, 2)); send(res, 200, JSON.stringify({ok:true})); } catch (e) { send(res, 400, JSON.stringify({error:'JSON không hợp lệ'})); } });
    return;
  }
  if (req.method === 'GET') return serveStatic(req, res);
  send(res, 405, 'Method not allowed', 'text/plain; charset=utf-8');
}).listen(PORT, '0.0.0.0', () => console.log(`HanhKiem web đang chạy tại http://localhost:${PORT}`));
