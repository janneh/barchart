const path = require('path')
const webpack = require('webpack')

const PATHS = {
  component: path.join(__dirname, 'src'),
  environment: path.join(__dirname, 'example')
}

module.exports = {
  devtool: 'eval',
  entry: [
    'webpack-dev-server/client?http://localhost:3000',
    'webpack/hot/only-dev-server',
    './example'
  ],
  output: {
    path: PATHS.environment,
    filename: 'bundle.js',
    publicPath: '/static/'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ],
  module: {
    loaders: [{
      test: /\.js$/,
      loaders: ['react-hot', 'babel'],
      include: [
        PATHS.environment,
        PATHS.component
      ]
    }]
  }
}
