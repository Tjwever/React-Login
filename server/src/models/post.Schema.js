const mongoose = require('mongoose')

const PostSchema = new mongoose.Schema({
    content: {
        type: String,
        max: 160,
        min: 1,
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    likes: {
        type: Number,
        min: 0,
        default: 0
    },
    likedBy:[{
        type:String
        // type: mongoose.Schema.Types.ObjectId,
        // ref: "User",
    }],
    time_stamp: {
        type: Date,
        default:  Date.now
    },
    comments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comment'
    }]
})

module.exports = mongoose.model('Post', PostSchema)