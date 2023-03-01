const { createProxyMiddleware } = require('http-proxy-middleware');
module.exports = function (app) {
    app.use(
        createProxyMiddleware("/api", {
            target: "http://1.15.179.72:7777",
            changeOrigin: true,
            ws: true,
            pathRewrite: { "^/api": "" }
        })
    );
};