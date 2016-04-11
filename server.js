const webpack = require('webpack')
const WebpackDevServer = require('webpack-dev-server')
const config = require('./webpack.config')

const host = '0.0.0.0'
const port = 3000
const devServerOptions = {
  publicPath: config.output.publicPath,
  hot: true,
  historyApiFallback: true,
  contentBase: './example'
}

new WebpackDevServer(webpack(config), devServerOptions)
  .listen(port, host, (error, result) => {
    if (error) return console.log(error)

    console.log(`Listening at http://${host}:${port}/`)
  })
