import formatErrorMessage from '../utils/formatErrorMessage'
import { isEmpty, equals, isEmail } from 'validator'

export default (data) => new Promise((resolve, reject) => {
  
  let message

  if (isEmpty(data.email)) {
    message = 'Email is required'
  }
  if (!isEmail(data.email)) {
    message = message ? message : 'Email is invalid'
  }
  if (isEmpty(data.password)) {
    message = message ? message : 'Password is required'
  }
  if (isEmpty(data.passwordConfirmation)) {
    message = message ? message : 'Password confirmation is required'
  }
  if (!equals(data.password, data.passwordConfirmation)) {
    message = message ? message : 'Passwords must match'
  }

  return !message ? resolve(data) : reject(formatErrorMessage(message))
}) 