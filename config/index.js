import _ from 'lodash'

let env = process.env.NODE_ENV

let baseConfig = {
  port: 3000,
  host: 'localhost'
}

let envConfig = {}

if (env === 'dev' || env === 'development') {
  envConfig = require('./dev')
}
else if (env === 'prod' || env === 'production') {
  envConfig = require('./prod')
}
else if (env === 'test' || env === 'testing') {
  envConfig = require('./testing')
}
else {
  envConfig = require('./dev')
}


module.exports = _.merge(baseConfig, envConfig)





