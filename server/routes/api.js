import express from 'express'

import { handle_create_yelpApi } from '../controllers/yelpApiController'

let router = express.Router()

router.post('/', handle_create_yelpApi)

export default router
