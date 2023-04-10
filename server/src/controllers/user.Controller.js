const User = require('../models/user.Schema')
const Session = require('../models/session.Schema')
const { v4: uuidv4 } = require('uuid');
const asyncWrapper = require('../middlware/asyncWrapper')

const register = asyncWrapper( async (req, res) => {
    const { first_name, last_name, birthday, email, password, status, location, occupation, auth_level } = req.body;
    // Check required fields
    // if (!first_name || !last_name || !email || !password || !birthday || !location) {
    //     return res.status(400).json({ msg: "Please enter all fields" });
    // }
    const user = await User.create({ ...req.body })
    res.status(201).json({ status: 'ok', data: user, msg: 'new user registered' })
})

const login = asyncWrapper( async (req, res) => {
    const {email, password} = req.body

    const user = await User.findOne({ email }) 
    if (!user){ //if no user
        return res.status(400).json({ msg: 'user does not exist'})
    }

    const isPasswordCorrect = await user.comparePassword(password)
    if (!isPasswordCorrect){ //if password is incorrect
        return res.status(400).json({ msg: 'incorrect password' })
    }

    //create session
    const userSess = {userFirstName: user.first_name, user: user.email, userID: user._id, token: uuidv4()}
    const sess = await Session.create(userSess)
    
    res.status(200).json({ status: 'ok', session: userSess, msg: 'login success'})
})

const validateToken = asyncWrapper( async (req, res) => {
    const reToken = req.query.token
    const session = await Session.findOne({ token: reToken })
    if (!session) { //if no token found (either expired or does not exist)
        res.json({ msg: "Unauthorized" });
        return;
    }
    res.status(200).json({ msg: "authorized", session  });
})

const getByEmail = asyncWrapper( async (req, res) => {
    const { email } = req.params
    const user = await User.findOne({ email: email })
    if (!user) { //if no token found (either expired or does not exist)
        res.json({ msg: "no user found" });
        return;
    }
    const initials = user.first_name.charAt(0) + user.last_name.charAt(0)
    res.status(200).json({ status: 'ok', data: [user], init: initials })
})

const getAll = asyncWrapper( async (req, res) => {
    const users = await User.find({})
    res.status(200).json({ status: 'ok', data: users })
})

const getByID = asyncWrapper( async (req, res) => {
    const { id:userID } = req.params
    const user = await User.findOne({ _id: userID })
    if (!user) {
        return res.status(400).json({msg: `no user with id ${userID}`}) 
    }
    res.status(200).json({ data: user }) 
})

const updateUserInfo = asyncWrapper( async (req,res) => {
    const { id: userID } = req.params;
    const user = await User.findByIdAndUpdate({ _id: userID }, req.body, {
      new:true,
      runValidators:true
    });
    if (!user) {
      return res.status(404).json({ msg:`No user with id ${userID}` })    
    }
    res.status(200).json({ user }) 
  });

  const del = asyncWrapper( async (req, res) => {
    const { id:userID } = req.params;
    const user = await User.findOneAndDelete({ _id: userID });   
    if (!user) {
        return res.status(404).json({ msg:`No user with id ${userID}` })    
    }
    res.status(201).json({ msg:'user deleted', user });  
})





module.exports = {
    register,
    login,
    validateToken,
    getAll, 
    getByID,
    getByEmail,
    updateUserInfo,
    del,

}