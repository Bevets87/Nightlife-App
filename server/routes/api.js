import express from 'express'

import { handle_get_listings } from '../controllers/listingControllers'

let router = express.Router()

router.post('/', handle_get_listings)

export default router
