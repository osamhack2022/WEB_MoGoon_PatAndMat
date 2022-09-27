const {createProxyMiddleware} = require('http-proxy-middleware')

module.exports = app => {
    app.use('/proxy',
        createProxyMiddleware(
            {
                target: 'http://localhost:5000',
                changeOrigin: true,
            }
        )
    )
}