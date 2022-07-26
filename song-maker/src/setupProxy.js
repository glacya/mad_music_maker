const {createProxyMiddleware} = require('http-proxy-middleware')
module.exports = app => {
  app.use(
    "/api",
    createProxyMiddleware(
      {
        target: 'http://192.249.18.201:443',
        changeOrigin: true
        
      }
    )
  )
}