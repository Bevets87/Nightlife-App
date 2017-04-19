import express from 'express'

import { handle_user_registration, handle_user_login} from '../controllers/userControllers'

let router = express.Router()

router.post('/register', handle_user_registration)
router.post('/login', handle_user_login)

export default router
