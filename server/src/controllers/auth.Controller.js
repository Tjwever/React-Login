const User = require('../models/user.Schema')
const jwt = require('jsonwebtoken')
const asyncWrapper = require('../middlware/asyncWrapper')

const generateToken = (user) => {
    return jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
        expiresIn: '24h',
    })
}

const login = asyncWrapper(async (req, res) => {
    const { email, password } = req.body

    if (!email || !password) {
        return res
            .status(400)
            .json({ message: 'All fields are required, dum dum' })
    }

    const user = await User.findOne({ email }).exec()

    if (!user) {
        //if no user
        return res.status(400).json({ msg: 'User does not exist' })
    }

    const isPasswordCorrect = await user.comparePassword(password)
    if (!isPasswordCorrect) {
        //if password is incorrect
        return res.status(401).json({ msg: 'You have a dum dum password' })
    }

    const basicUser = {
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
        auth_level: user.auth_level,
    }

    const token = generateToken(user)

    res.status(200).json({
        status: 'ok',
        user: basicUser,
        token: token,
        msg: 'login success',
    })
})

const refresh = asyncWrapper(async (req, res) => {})

module.exports = {
    login,
}
