import Joi from 'joi'

export default (schema) => (prop) => (req, res) => new Promise((resolve, reject) => {
  Joi.validate(req[prop], schema)
    .then(() => { return resolve({message: 'Valid schema'}) })
    .catch(error => { return reject({ ...error, message: error.details[0].message }) })
})





