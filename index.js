const http = require('http');
const httpProxy = require('http-proxy');

const ProxyTarget = 'http://127.0.0.1:9999'; // The resource we want to proxy
const ProxyAllowDomain = ['http://127.0.0.1:1337', 'https://mydomain.com']; // Allowed domains
const ProxyPort = 1337; // The port on which the proxy will run

const proxy = httpProxy.createProxyServer({
  agent: new http.Agent({
    keepAlive: true
  })
});

const server = http.createServer((req, res) => proxy.web(req, res, { target: ProxyTarget }));

proxy.on('error', async (err, req, res) => {
  console.error('Error connecting to target:', err.message);
  if (err.code === 'ECONNREFUSED') {
    await new Promise(resolve => setTimeout(resolve, 5000));
    await proxy.web(req, res, { target: ProxyTarget });
  } else {
    res.writeHead(500, { 'Content-Type': 'text/plain' });
    res.end('Internal server error');
  }
});

proxy.on('proxyReq', (proxyReq, req, res) => {
  const origin = req.headers.origin;
  if (ProxyAllowDomain.includes(origin)) proxyReq.setHeader('Origin', origin);
});

proxy.on('proxyRes', (proxyRes, req, res) => {
  res.writeHead(proxyRes.statusCode, proxyRes.headers);
});

server.listen(ProxyPort, () => console.log(`Node.js proxy server running on port ${ProxyPort}`));

process.on('SIGINT', () => {
  console.log('Stopping proxy server...');
  server.close(() => {
    console.log('Server stopped.');
    process.exit(0);
  });
});
