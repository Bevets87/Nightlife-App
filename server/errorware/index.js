const catchAll = require('./catchAll')

module.exports = (app) => {
  app.use(catchAll)
}
