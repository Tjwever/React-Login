const mongoose = require('mongoose')
const { v4: uuidv4 } = require('uuid')
const SessionSchema = new mongoose.Schema({
    user: {
        type: String,
    },
    token: {
        type: String,
        // default: function(req) { return uuidv4(); }
    },
    lifetime: {
        type: Date,
        expires: 10800, // will delete record after this amount of seconds -- currently at 3 hours
        default: Date.now,
    },
    // expireAt: {
    //     type: Date,
    //     default: Date.now,
    //     // index: { expireAfterSeconds: 300 }
    // },
})

// SessionSchema.index({ expireAt: 1 }, { expireAfterSeconds: 180 });

module.exports = mongoose.model('Session', SessionSchema)
