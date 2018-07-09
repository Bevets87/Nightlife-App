const Bar = require('../models/bar')
const { find } = require('lodash')
const validate = require('../middleware/validate')
const Joi = require('joi')

const _patronSchema = {
  yelp_id: Joi.string().required(),
  email: Joi.string().email().required()
}


const _mapBarsToYelpListings = (bars) => (listing) => {
  const bar = find(bars, { yelp_id: listing.id })
  listing.going = bar ? bar.patrons.length : 0
  listing.patrons = bar ? bar.patrons : []
  return listing  
}


const addPatron = [ 
  (req, res, next) => {
    validate(_patronSchema)('body')(req, res)
      .then(() => { next() })
      .catch((error) => res.status(400).json(error))
  },
  (req, res) => {
    Bar.addPatron(req.body)
      .then((bar) => res.status(200).json(bar.toClient()))
      .catch(error => res.status(400).json({ ...error, message: 'Invalid patron' }))
  }
]
  
const removePatron = [
  (req, res, next) => {
    validate(_patronSchema)('body')(req, res)
      .then(() => { next() })
      .catch((error) => res.status(400).json(error))
  },
  (req, res) => {
    Bar.removePatron(req.body)
      .then((bar) => res.status(200).json(bar.toClient()))
      .catch((error) => res.status(400).json({ ...error, message: 'Invalid patron' }))
  }
]
  
const getBars = (req, res) => {
  Bar.findAllByYelpIds(req.yelp_listings.map(listing => listing.id))
    .then((bars) => res.status(200).json(req.yelp_listings.map(_mapBarsToYelpListings(bars))) )
    .catch((error) => res.status(400).json({ ...error, message: 'Unable to get bars' }))
} 

module.exports = {
  _patronSchema,
  addPatron, 
  removePatron, 
  getBars
}


