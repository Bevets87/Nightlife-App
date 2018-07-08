import webpack from 'webpack'
import webpackConfig from '../../webpack.config.babel'
import config from '../../config'
import path from 'path'


export default (app) => {
  const compiler = webpack(webpackConfig)

  const webpackDevMiddleware = require('webpack-dev-middleware')(compiler, {
    publicPath: webpackConfig.output.publicPath,
    historyApiFallback: true,
  })
  const webpackHotMiddleware = require('webpack-hot-middleware')(compiler)
  
  app.use(webpackDevMiddleware)
  app.use(webpackHotMiddleware)
  
}

