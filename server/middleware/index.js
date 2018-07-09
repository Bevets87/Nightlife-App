const bodyParser = require('body-parser')
const compression = require('compression')
const helmet = require('helmet')
const cors = require('cors')


module.exports = (app) => {
  app.use(compression())
  app.use(cors())
  app.use(bodyParser.json())
  app.use(helmet())
}