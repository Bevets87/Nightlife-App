const jwt = require('jsonwebtoken')
const config = require('../../config')

const _hasToken = (req, res) => new Promise((resolve, reject) => {
  const token = req.headers.authorization
  if (token) {
    req.token = token
    return resolve({ message: 'Token present'})
  } else {
    return reject({ message: 'No token present'})
  }  
})

const _validateToken = (req, res) => new Promise((resolve, reject) => {
  jwt.verify(req.token, config.jwt.secret, (error, decoded) => {
    if (error) { 
      return reject({ ...error, message: 'Invalid token' }) 
    }
    else { 
      req.user = decoded
      return resolve({ message: 'Valid token'}) 
    } 
  })
})

const requireAuth = (!(process.env.NODE_ENV === 'testing')) 
  ? [ 
    (req, res, next) => {
      _hasToken(req, res)
        .then(() => next())
        .catch((error) => res.status(401).json(error))
    },
    (req, res, next) => {
      _validateToken(req, res)
        .then(() => next())
        .catch((error) => res.status(400).json(error))
    }
  ] : (req, res, next) => next()


module.exports = {
  _hasToken, _validateToken, requireAuth
}
 