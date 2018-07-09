const server = require('./server')
const config = require('./config')
const winston = require('winston')

server.listen(config.port, config.host, () => {
  winston.info(`listening on port ${config.port}`)
})


