import yelp from 'yelp-fusion'
import validate from '../middleware/validate'
import Joi from 'joi'
import _ from 'lodash'
import config from '../../config'

const _searchSchema = {
  location: Joi.string().max(50).required()
}

export const _searchYelp = (req, res) => new Promise((resolve, reject) => {
  yelp.client(config.yelp.api_key)
    .search({ term: 'bars', location: req.body.location })
    .then(response => {
      req.yelp_listings = _.take(
        response.jsonBody.businesses
          .map(business => _.pick(business, ['id', 'name', 'url', 'image_url', 'price', 'rating', 'location', 'phone'])), 
        15
      )
      return resolve() 
    })
    .catch(error => reject({ ...error, message: 'Yelp search failed' }) )
})


export const getYelpListings = [
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
  









