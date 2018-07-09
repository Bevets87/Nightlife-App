const mongoose = require('mongoose')
const config = require('../../config')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [ true, 'Email or password is required' ],
    unique: true
  },
  password: {
    type: String,
    required: [ true, 'Email or password is required' ] 
  },
  createdAt: {
    type: Date,
    expires: '48h',
    default: Date.now
  }
})

userSchema.pre('save', function(next) {
  this.hashPassword(this.password)
    .then(hash => {
      this.password = hash 
      next()
    })
    .catch(error => next(error))
})

userSchema.methods.generateAuthToken = function() {
  return jwt.sign({ _id: this._id }, config.jwt.secret, { expiresIn: config.jwt.expiration })
}

userSchema.methods.checkPassword = function(password) {
  return bcrypt.compare(password, this.password)
}

userSchema.methods.hashPassword = function(password) {
  return bcrypt.genSalt(10)
    .then(salt => bcrypt.hash(password, salt))
}

userSchema.methods.toClient = function() {
  return this.email 
}

module.exports = mongoose.model('User', userSchema)








