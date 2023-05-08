const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

const UserSchema = new mongoose.Schema(
    {
        first_name: {
            type: String,
            trim: true,
            required: true,
            min: 2,
            max: 20,
        },
        last_name: {
            type: String,
            trim: true,
            required: true,
            min: 2,
            max: 20,
        },
        email: {
            type: String,
            trim: true,
            required: true,
            match: [
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                'Please enter valid email',
            ],
            unique: true,
        },
        password: {
            type: String,
            min: 6,
            required: true,
        },
        auth_level: {
            type: String,
            default: 'basic',
        },
        active: {
            type: Boolean,
            default: true
        }
    },
    { timestamps: true }
)

UserSchema.pre('save', async function () {
    //generates random hashes data
    //combined hashed data with our password string to encrypt
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
})

UserSchema.methods.comparePassword = async function (candidatePassword) {
    const isMatch = await bcrypt.compare(candidatePassword, this.password)
    return isMatch
}

module.exports = mongoose.model('User', UserSchema)
