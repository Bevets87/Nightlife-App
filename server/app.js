import express from 'express'
import path from 'path'
import bodyParser from 'body-parser'

import webpack from 'webpack'
import webpackMiddleware from 'webpack-dev-middleware'
import webpackHotMiddleware from 'webpack-hot-middleware'
import webpackConfig from '../webpack.config.dev'

import { PORT } from './config'

const app = express()

const compiler = webpack(webpackConfig)

app.use(webpackMiddleware(compiler, {
  hot: true,
  publicPath: webpackConfig.output.publicPath,
  noInfo: true
}))

app.use(webpackHotMiddleware(compiler))

app.use(bodyParser.json())

app.use(express.static('client'))

app.listen(PORT, () => {
  console.log(`listening on localhost ${PORT}` )
})
