const express = require('express')
const router = express.Router()
const loginLimiter = require('../middleware/loginLimiter')

const { login, refresh, logout } = require('../controllers/auth.Controller')

router.route('/login').post(loginLimiter, login)

router.get('/refresh', refresh)

router.post('/logout', logout)

module.exports = router
