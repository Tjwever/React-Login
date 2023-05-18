const express = require('express')
const router = express.Router()
const {
    register,
    // login,
    getAll,
    getByID,
    getByEmail,
    updateUserInfo,
    del,
} = require('../controllers/user.Controller')
const { deleteOne } = require('../models/user.Schema')
const verifyJWT = require('../middleware/verifyJWT')

router.post('/register', register)

router.use(verifyJWT)

router.get('/', getAll)

router.get('/:id', getByID)

router.get('/email/:email', getByEmail)

router.patch('/:id', updateUserInfo)

router.delete('/:id', del)

module.exports = router
