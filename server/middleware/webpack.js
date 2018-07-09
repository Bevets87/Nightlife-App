const webpack = require('webpack')
const webpackConfig = require('../../webpack.config.babel')

module.exports = (app) => {
  const compiler = webpack(webpackConfig)

  const webpackDevMiddleware = require('webpack-dev-middleware')(compiler, {
    publicPath: webpackConfig.output.publicPath,
    historyApiFallback: true,
  })
  const webpackHotMiddleware = require('webpack-hot-middleware')(compiler)
  
  app.use(webpackDevMiddleware)
  app.use(webpackHotMiddleware)
  
}

