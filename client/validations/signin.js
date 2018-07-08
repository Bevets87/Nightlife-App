import formatErrorMessage from '../utils/formatErrorMessage'
import { isEmpty, isEmail } from 'validator'

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

  return !message ? resolve(data) : reject(formatErrorMessage(message))
})