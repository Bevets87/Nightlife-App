import winston from 'winston'

export default (error, req, res, next) => {
  winston.error(error.message)
  res.status(500).json(error)
}

