import mongoose from 'mongoose'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import _ from 'lodash'
import { JWT_SECRET } from '../config'

import User from '../models/User'

import validateRegistrationInput from '../shared/validations/register'
import validateLoginInput from '../shared/validations/login'

const createToken = function(username) {
  return jwt.sign({user: username}, process.env.JWT_SECRET || JWT_SECRET ,{expiresIn: 60 * 60})
}

export const handle_user_registration = function (req, res) {
  console.log(req.body)
  const { errors, isValid } = validateRegistrationInput (req.body)
  const { password, email } = req.body

  if (isValid){
    User.findOne({email: email}, (err, user) => {
      if(err) return console.error(err)
      if(!user) {
        const passwordDigest = bcrypt.hashSync(password, 10)
        user = new User({
          password: passwordDigest,
          email: email
        })
        user.save((err, user) => {
          if(err) return console.error(err)
          console.log(user)
          res.status(201).json({
            email: user.email,
            token: createToken(user.email)
          })
        })
      } else if(user) {
        res.status(401).json({errors: {registrationForm: 'The email supplied is already registered!'}})
      }
    })
  }else {
    res.status(400).json({errors})
  }
}

export const handle_user_login = function (req, res) {
  const { errors, isValid } = validateLoginInput (req.body)
  const { email, password } = req.body

  if(isValid){
    User.findOne({email: email}, (err, user) => {
      if(user && bcrypt.compareSync(password, user.password)) {
        res.status(200).json({
          email: user.email,
          token: createToken(user.email)
        })
      } else if (!user) {
        res.status(401).json({
          errors: {loginForm: 'Invalid Credentials!'}
        })
      }
    })
  }
  else {
    res.status(400).json({errors})
  }
}
