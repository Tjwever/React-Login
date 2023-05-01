const express = require('express')
const router = express.Router()

const { login } = require('../controllers/auth.Controller')

// router.post('/register', register)

router.post('/login', login)

// router.get('/refresh', refresh)

module.exports = router
