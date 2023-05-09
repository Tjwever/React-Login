const User = require('../models/user.Schema')
const jwt = require('jsonwebtoken')
const asyncWrapper = require('../middleware/asyncWrapper')
const asyncHandler = require('express-async-handler')

const accessToken = (user) => {
    return jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
        expiresIn: '15m',
    })
}

const refreshToken = (user) => {
    return jwt.sign({ id: user.id }, process.env.JWT_REFRESH_SECRET, {
        expiresIn: '1d',
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

    const token = accessToken(user)

    res.cookie('jwt', refreshToken(user), {
        httpOnly: true,
        secure: true,
        sameSite: 'None',
        maxAge: 7 * 24 * 60 * 1000,
    })

    res.status(200).json({
        status: 'ok',
        user: basicUser,
        token: token,
        msg: 'login success',
    })
})

const refresh = (req, res) => {
    const cookies = req.cookies

    console.log(cookies)

    if (!cookies?.jwt) {
        return res.status(401).json({ msg: 'Unauthorized' })
    }

    const refreshToken = cookies.jwt

    jwt.verify(
        refreshToken,
        process.env.JWT_REFRESH_SECRET,
        asyncHandler(async (err, decoded) => {
            if (err) return res.status(403).json({ message: 'Forbidden' })

            const user = await User.findOne({ id: decoded.id }).exec()

            console.log('======================================')
            console.log(user)
            console.log('======================================')

            if (!user) {
                return res
                    .status(401)
                    .json({ message: 'No User exists.  Unauthorized' })
            }

            const requiredToken = accessToken(user)

            res.json({ requiredToken })
        })
    )
}

const logout = asyncWrapper(async (req, res) => {
    const cookies = req.cookies
    if (!cookies?.jwt) {
        return res.sendStatus(204)
    }
    res.clearCookie('jwt', {
        httpOnly: true,
        sameSite: 'None',
        secure: true,
    })
    res.json({ msg: 'Cookie eatened by The Cookie Monster' })
})

module.exports = {
    login,
    refresh,
    logout,
}
