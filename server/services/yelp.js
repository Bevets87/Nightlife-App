const yelp = require('yelp-fusion')
const validate = require('../middleware/validate')
const Joi = require('Joi')
const { take, pick } = require('lodash')
const config = require('../../config')

const _searchSchema = {
  location: Joi.string().max(50).required()
}

const _searchYelp = (req, res) => new Promise((resolve, reject) => {
  yelp.client(config.yelp.api_key)
    .search({ term: 'bars', location: req.body.location })
    .then(response => {
      req.yelp_listings = take(
        response.jsonBody.businesses
          .map(business => pick(business, ['id', 'name', 'url', 'image_url', 'price', 'rating', 'location', 'phone'])), 
        15
      )
      return resolve() 
    })
    .catch(error => reject({ ...error, message: 'Yelp search failed' }) )
})

const getYelpListings = [
  (req, res, next) => {
    validate(_searchSchema)('body')(req, res)
      .then(() => next())
      .catch(error => res.status(400).json(error))
  },
  (req, res, next) => {
    _searchYelp(req, res)
      .then(() => next())
      .catch(error => res.status(400).json(error))
  }
]

module.exports = {
  _searchYelp, getYelpListings
}
  









