const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = {
  devServer: {
    proxy: {
      '/api': {
        target: 'http://localhost:8080',
        changeOrigin: true,
        pathRewrite: { '^/api': '' },
        secure: false,
        logLevel: 'debug',
        onError: function (err, req, res) {
          res.writeHead(500, {
            'Content-Type': 'text/plain',
          });
          res.end('Proxy error.');
        },
      },
    },
  },
};
