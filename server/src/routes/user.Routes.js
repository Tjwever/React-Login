const express = require('express');
const router = express.Router();

const {
    register,
    login,
    validateToken,
    getAll,
    getByID,
    getByEmail,
    updateUserInfo,
    del,
} = require('../controllers/user.Controller');
const { deleteOne } = require('../models/user.Schema');


router.post('/register', register);

router.post('/login', login);

router.get('/validate', validateToken)

router.get('/', getAll)

router.get('/:id', getByID)

router.get('/email/:email', getByEmail)

router.patch('/:id', updateUserInfo)

router.delete('/:id', del)

module.exports = router