const mongoose = require('mongoose')

const CommentSchema = new mongoose.Schema({
    content: {
        type: String,
        max: 160,
        min: 1,
        required: true
    },
    post: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post',
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
    likedBy: [{
        type: String
    }],
    time_stamp: {
        type: Date,
        default:  Date.now
    }
})

module.exports = mongoose.model('Comment', CommentSchema)