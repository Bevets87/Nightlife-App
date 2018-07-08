import express from 'express'
import { getBars, addPatron, removePatron } from '../controllers/bar'
import { getYelpListings } from '../services/yelp'
import { requireAuth } from '../middleware/auth'

const router = express.Router()

router.post('/', getYelpListings, getBars)
router.post('/patron', requireAuth, addPatron)
router.post('/patron/remove', requireAuth, removePatron)

export default router 