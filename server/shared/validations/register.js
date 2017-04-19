import validator from 'validator'
import _ from 'lodash'

export default function validateRegistrationInput (data) {
  const errors = {}

  if (validator.isEmpty(data.email)) {
    errors.email = 'This field is required'
  }
  if (!validator.isEmail(data.email)) {
    errors.email = 'Email is invalid'
  }
  if (validator.isEmpty(data.password)) {
    errors.password = 'This field is required'
  }
  if (validator.isEmpty(data.passwordConfirmation)) {
    errors.passwordConfirmation = 'This field is required'
  }
  if (!validator.equals(data.password, data.passwordConfirmation)) {
    errors.passwordConfirmation = 'Passwords must match'
  }

  return {
    errors: errors,
    isValid: _.isEmpty(errors)
  }
}
