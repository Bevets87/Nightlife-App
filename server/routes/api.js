import express from 'express'

import { handle_get_listings } from '../controllers/listingControllers'
import { handle_get_bars, handle_create_bar } from '../controllers/barControllers'

let router = express.Router()

router.post('/', handle_get_listings)

router.get('/bars', handle_get_bars)
router.post('/bars', handle_create_bar)

export default router
