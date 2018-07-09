const express = require('express')
const { getBars, addPatron, removePatron } = require('../controllers/bar')
const { getYelpListings } = require('../services/yelp')
const { requireAuth } = require('../middleware/auth')

const router = express.Router()

router.post('/', getYelpListings, getBars)
router.post('/patron', requireAuth, addPatron)
router.post('/patron/remove', requireAuth, removePatron)

module.exports = router 