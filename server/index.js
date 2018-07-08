import express from 'express'
import path from 'path'
import db from './db'
import middleware from './middleware'
import webpackMiddleware from './middleware/webpack'
import routes from './routes'
import errorware from './errorware'

const app = express()

if (process.env.NODE_ENV === 'development') {
  webpackMiddleware(app)
}

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../build')))
}

if (!(process.env.NODE_ENV === 'testing')) {
  db.connect()
}

middleware(app)
routes(app)
errorware(app)

export default app 
  



















