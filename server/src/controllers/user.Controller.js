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
    if (!first_name || !last_name || !email || !password) {
        return res.status(400).json({ msg: 'Please enter all fields' })
    }

    const duplicate = await User.findOne({ first_name }).lean().exec()

    if (duplicate) {
        return res.status(409).json({ msg: 'Duplicate user' })
    }

    const user = await User.create({ ...req.body })
    const token = generateToken(user)

    const {
        first_name: new_first_name,
        last_name: new_last_name,
        email: new_email,
        auth_level: new_auth_level,
        createdAt: new_createdAt,
    } = user.toObject()

    res.status(201).json({
        status: 'ok',
        data: {
            first_name: new_first_name,
            last_name: new_last_name,
            email: new_email,
            auth_level: new_auth_level,
            createdAt: new_createdAt,
        },
        token: token,
        msg: `${new_first_name} has been registered as a new user!`,
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
    const users = await User.find({})
        .select('first_name last_name email auth_level createdAt')
        .lean()
    if (!users?.length) {
        return res.status(400).json({ msg: 'Day aint no users' })
    }
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
    // const { email } = req.body
    const user = await User.findByIdAndUpdate({ _id: userID }, req.body, {
        new: true,
        runValidators: true,
    })

    // const duplicate = await User.findOne({ email }).lean().exec()

    // if (duplicate && duplicate?._id.toString() !== id) {
    //     return res.status(409).json({ msg: 'Duplicate user' })
    // }

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
    getAll,
    getByID,
    getByEmail,
    updateUserInfo,
    del,
}
