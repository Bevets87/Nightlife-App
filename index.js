import server from './server'
import config from './config'
import winston from 'winston'

server.listen(config.port, config.host, () => {
  winston.info(`listening on port ${config.port}`)
})


