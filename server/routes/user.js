const express = require('express')
const { signup, signin, getMe } = require('../controllers/user')
const { requireAuth } = require('../middleware/auth')

const router = express.Router()

router.post('/', signup)
router.post('/signin', signin)

router.get('/me', requireAuth, getMe)

module.exports = router 