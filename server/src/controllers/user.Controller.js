const User = require('../models/user.Schema')
const jwt = require('jsonwebtoken')
const asyncWrapper = require('../middlware/asyncWrapper')

const generateToken = (user) => {
    return jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
        expiresIn: '24h',
    })
}

const register = asyncWrapper(async (req, res) => {
    const { first_name, last_name, email, password, auth_level } = req.body
    // Check required fields
    // if (!first_name || !last_name || !email || !password || !birthday || !location) {
    //     return res.status(400).json({ msg: "Please enter all fields" });
    // }
    const user = await User.create({ ...req.body })
    const token = generateToken(user)

    res.status(201).json({
        status: 'ok',
        data: user,
        token: token,
        msg: 'new user registered',
    })
})

const login = asyncWrapper(async (req, res) => {
    const { email, password } = req.body

    const user = await User.findOne({ email })

    if (!user) {
        //if no user
        return res.status(400).json({ msg: 'user does not exist' })
    }

    const isPasswordCorrect = await user.comparePassword(password)
    if (!isPasswordCorrect) {
        //if password is incorrect
        return res.status(400).json({ msg: 'incorrect password' })
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

const getByEmail = asyncWrapper(async (req, res) => {
    const { email } = req.params
    const user = await User.findOne({ email: email })
    if (!user) {
        //if no token found (either expired or does not exist)
        res.json({ msg: 'no user found' })
        return
    }
    const initials = user.first_name.charAt(0) + user.last_name.charAt(0)
    res.status(200).json({ status: 'ok', data: [user], init: initials })
})

const getAll = asyncWrapper(async (req, res) => {
    const users = await User.find({}).select(
        'first_name last_name email auth_level createdAt'
    )
    res.status(200).json({ status: 'ok', data: users })
})

const getByID = asyncWrapper(async (req, res) => {
    const { id: userID } = req.params
    const user = await User.findOne({ _id: userID })
    if (!user) {
        return res.status(400).json({ msg: `no user with id ${userID}` })
    }
    res.status(200).json({ data: user })
})

const updateUserInfo = asyncWrapper(async (req, res) => {
    const { id: userID } = req.params
    const user = await User.findByIdAndUpdate({ _id: userID }, req.body, {
        new: true,
        runValidators: true,
    })
    if (!user) {
        return res.status(404).json({ msg: `No user with id ${userID}` })
    }
    res.status(200).json({ user })
})

const del = asyncWrapper(async (req, res) => {
    const { id: userID } = req.params
    const user = await User.findOneAndDelete({ _id: userID })
    if (!user) {
        return res.status(404).json({ msg: `No user with id ${userID}` })
    }
    res.status(201).json({ msg: 'user deleted', user })
})

module.exports = {
    register,
    login,
    getAll,
    getByID,
    getByEmail,
    updateUserInfo,
    del,
}
