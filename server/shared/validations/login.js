import validator from 'validator'
import _  from 'lodash'

export default function validateLoginInput (data) {
  const errors = {}

  if (validator.isEmpty(data.email)) {
    errors.email = 'This field is required'
  }
  if (validator.isEmpty(data.password)) {
    errors.password = 'This field is required'
  }

  return {
    errors: errors,
    isValid: _.isEmpty(errors)
  }
}
