import mongoose from 'mongoose'
import winston from 'winston'
import config from '../../config'

mongoose.Promise = global.Promise

export default {
  connect() {
   
    mongoose.connect(config.db.url)
      
    return mongoose.connection
      .once('open', () => {
        winston.info(`db connected to ${config.db.url}`)
        return Promise.resolve() 
      }) 
      .on('error', err => {
        winston.error(err.message)
        return Promise.reject()
      })

    
  },
  disconnect() {
    
    mongoose.disconnect()

    return mongoose.connection
      .once('close', () => { 
        winston.info(`db disconnected from ${config.db.url}`)
        return Promise.resolve() 
      })
      .on('error', err => { 
        winston.error(err.message)
        return Promise.reject()
      })

    

  },
  getConnection() {
    return mongoose.connection
  }

}