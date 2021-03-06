const User = require('../models/user')
const { pick } = require('lodash')
const validate = require('../middleware/validate')
const Joi = require('joi')

const _signupSchema = {
  email: Joi.string().min(5).max(255).email().required(),
  password: Joi.string().min(5).max(255).required(),
  passwordConfirmation: Joi.any().valid(Joi.ref('password')).required().options({ language: { any: { allowOnly: 'Must match password' } } })
}

const _signinSchema = {
  email: Joi.string().min(5).max(255).email().required(),
  password: Joi.string().min(5).max(255).required(),
}

const _isNewEmail = (req, res) => new Promise((resolve, reject) => {
  User.findOne({email: req.body.email})
    .then(user => !user ? resolve({message: 'Email is new'}) : reject({message: 'Email exists'})) 
    .catch(error => reject(error))
})

const _getByEmail = (req, res) => new Promise((resolve, reject) => {
  User.findOne({ email: req.body.email })
    .then(user => {
      if (user) { req.user = user; return resolve({ message: 'Added user by email'}) }
      else { return reject({ message: 'Invalid email'}) }
    })
    .catch(error => reject(error))
})
 
const _getById = (req, res) => new Promise((resolve, reject) => {
  User.findById(req.user._id)
    .then(user => {
      req.user = user
      return resolve({ message: 'Added user by id' })
    })
    .catch(error => reject({ ...error, message: 'Invalid id' }))
})

const _createOne = (req, res) => new Promise((resolve, reject) => {
  const user = new User(pick(req.body, ['email', 'password']))
  user.save()
    .then(user => {
      req.user = user
      return resolve()
    })
    .catch(error => reject({ ...error, message: 'Unable to create user' }))
})

const _validatePassword = (req, res) => new Promise((resolve, reject) => {
  req.user
    .checkPassword(req.body.password)
    .then(isValid => isValid ? resolve({message: 'Valid password'}) : reject({message: 'Invalid email or password'}))
    .catch(error => reject(error))
})



const  signup = [
  (req, res, next) => {
    validate(_signupSchema)('body')(req, res)
      .then(() => next())
      .catch(error => res.status(400).json(error))
  },
  (req, res, next) => {
    _isNewEmail(req, res)
      .then(() => next())
      .catch(error => res.status(400).json(error))
  },
  (req, res) => {
    _createOne(req, res)
      .then(() => {
        res.setHeader('x-auth-token', req.user.generateAuthToken())
        res.status(200).json(req.user.toClient())
      })
      .catch(error => res.status(400).json(error))
  }
]

const signin = [
  (req, res, next) => {
    validate(_signinSchema)('body')(req, res)
      .then(() => next())
      .catch(error => res.status(400).json(error))
  },
  (req, res, next) => {
    _getByEmail(req, res)
      .then(() => next())
      .catch(error => res.status(400).json(error))
  },
  (req, res) => {
    _validatePassword(req, res)
      .then(() => {
        res.setHeader('x-auth-token', req.user.generateAuthToken())
        res.status(200).json(req.user.toClient())
      }) 
      .catch(error => res.status(400).json(error))
  }
]

const getMe = (req, res) => {
  _getById(req, res)
    .then(() => res.status(200).json(req.user.toClient()))
    .catch((error) => res.status(400).json(error))
}



module.exports = {
  _signinSchema,
  _signupSchema,
  _isNewEmail, 
  _getByEmail, 
  _getById, 
  _createOne, 
  _validatePassword, 
  signin, 
  signup, 
  getMe
}
  

  





  



