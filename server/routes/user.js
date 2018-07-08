import express from 'express'
import { signup, signin, getMe } from '../controllers/user'
import { requireAuth } from '../middleware/auth'

const router = express.Router()

router.post('/', signup)
router.post('/signin', signin)

router.get('/me', requireAuth, getMe)

export default router 