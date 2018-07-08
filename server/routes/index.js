import userRouter from './user'
import barRouter from './bar'
import path from 'path'

export default (app) => {
  app.use('/api/users', userRouter)
  app.use('/api/bars', barRouter)

  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../../build', 'index.html'))
  })
  

}