const { merge } = require('lodash')

let env = process.env.NODE_ENV

let baseConfig = {
  port: 3000,
  host: '0.0.0.0'
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


module.exports = merge(baseConfig, envConfig)





