const express = require('express')
const webpack = require('webpack')
const webpackDevMiddleware = require('webpack-dev-middleware')
const webpackHotMiddleware = require('webpack-hot-middleware')
const WebpackConfig = require('./webpack.config')

const app = express()
const compiler = webpack(WebpackConfig)

// webpackDevMiddleware是一个wapper，可以将webpack处理后的文件，传递哥服务器
// Tell express to use the webpack-dev-middleware and use the webpack.config.js
// configuration file as a base.
app.use(
  webpackDevMiddleware(compiler, {
    // 是一个公共的地址，用于处理静态资源的应用地址
    publicPath: '/__build__/',
    stats: {
      colors: true,
      chunks: false
    }
  })
)
// webpackHotMiddleware 插件是实现热加载
app.use(webpackHotMiddleware(compiler))

app.use(express.static(__dirname))

const port = process.env.PORT || 8080
module.exports = app.listen(port, () => {
  console.log(`Server listening on http://localhost:${port}, Ctrl+C to stop`)
})
