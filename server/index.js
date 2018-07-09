const express = require('express')
const path = require('path')
const db = require('./db')
const middleware = require('./middleware')
const webpackMiddleware = require('./middleware/webpack')
const routes = require('./routes')
const errorware = require('./errorware')

const app = express()

if (process.env.NODE_ENV === 'development') {
  webpackMiddleware(app)
}

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client')))
}

if (!(process.env.NODE_ENV === 'testing')) {
  db.connect()
}

middleware(app)
routes(app)
errorware(app)

module.exports = app
  



















