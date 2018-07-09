const userRouter = require('./user')
const barRouter = require('./bar')
const path = require('path')

module.exports = (app) => {
  app.use('/api/users', userRouter)
  app.use('/api/bars', barRouter)

  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../../build', 'index.html'))
  })
  

}