import express from 'express'

import { handle_get_listings, handle_get_attendees, handle_create_attendees, handle_update_attendees } from '../controllers/listingControllers'

let router = express.Router()

router.post('/', handle_get_listings)

router.get('/attendees', handle_get_attendees)
router.post('/attendees', handle_create_attendees)
router.put('/attendees/:id', handle_update_attendees)

export default router
