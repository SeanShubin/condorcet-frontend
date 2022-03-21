const {createProxyMiddleware} = require('http-proxy-middleware');

module.exports = function (app) {
    const options = {
        target: 'http://localhost:8080',
        changeOrigin: true,
        pathRewrite: {
            '^/api/': '/',
        }
    };
    app.use(
        '/api/',
        createProxyMiddleware(options)
    );
};
