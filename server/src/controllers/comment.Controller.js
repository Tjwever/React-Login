const Comment = require('../models/comment.Schema')
const asyncWrapper = require('../middlware/asyncWrapper')
const Post = require('../models/post.Schema')
const User = require('../models/user.Schema')


const create = asyncWrapper( async (req, res) => {
    const comment = await Comment.create(req.body);
    const postId = req.body.post
    const post = await Post.findOneAndUpdate({ _id: postId }, { $push : { comments: comment._id } }, {
        new:true,
        runValidators:true
    });
    res.status(201).json({ status: 'ok', data: comment, msg: 'comment created' })
})

const getAll = asyncWrapper( async (req, res) => {
    const comments = await Comment.find({}).populate('user').populate('post')
    res.status(200).json({ status: 'ok', data: comments })
})

const getByID = asyncWrapper( async (req, res) => {
    const { id:commentID } = req.params
    const comment = await Comment.findOne({ _id: commentID }).populate('user').populate('post')
    if (!comment) {
        return res.status(400).json({msg: `no comment with id ${commentID}`}) 
    }
    res.status(200).json({ status: 'ok', data: comment }) 
})

const getCommentsByPostID = asyncWrapper( async (req, res) => {
    const { postID } = req.params
    const comments = await Comment.find({post: postID}).populate('user')
    if (!comments) {
        return res.status(400).json({msg: `no comments on post with id ${postID}`}) 
    }
    const sorted = comments.sort((b,a)=> new Date(b.time_stamp).getTime() - new Date(a.time_stamp).getTime())
    res.status(200).json({ status: 'ok', data: sorted  })
})

const update = asyncWrapper( async (req, res) => {
    const { id: commentID } = req.params;
    const comment = await Comment.findByIdAndUpdate({ _id: commentID }, req.body, {
        new:true,
        runValidators:true
    });
    if (!comment) {
        return res.status(404).json({ msg:`No comment with id ${commentID}` })    
    }
    res.status(200).json({ msg: 'comment updated', data: comment }) 
})

const addLike = asyncWrapper( async (req, res) => {
    const { id: commentID } = req.params;
    const comment = await Comment.findByIdAndUpdate({ _id: commentID }, { $inc:{ likes:1 } }, {
        new:true,
        runValidators:true
    });
    res.status(200).json({ msg: 'like added', data: comment })
})

const userlikes = asyncWrapper( async (req, res) => {
    const userID = req.params.user
    const commentID = req.params.comment
    const user = await User.findOne({ _id: userID })
    if (!user) {
        res.send('no user found')
        return;
    }
    let comment = await Comment.findOne({ _id: commentID })
    if (!comment) {
        res.send('no post found')
        return;
    }
    let liked;
    if (comment.likedBy.includes(userID)){   //if likedBy list includes userID it will decrement like counter and remove name from list
        comment = await Comment.findByIdAndUpdate({ _id: commentID }, { $inc:{ likes: -1 } }, {
            new:true,
            runValidators:true
        });
        comment = await Comment.findOneAndUpdate({ _id: commentID }, { $pull : { likedBy: userID } }, {
            new:true,
            runValidators:true
        });
        liked = 'like removed'
    } else {
        comment = await Comment.findByIdAndUpdate({ _id: commentID }, { $inc:{ likes: 1 } },  {
            new:true,
            runValidators:true
        });
        comment = await Comment.findOneAndUpdate({ _id: commentID }, { $push : { likedBy: userID } }, {
            new:true,
            runValidators:true
        });
        liked = 'like added'
    }
    // const userID = session
    res.status(200).json({msg: liked, user, comment})

})



const del = asyncWrapper( async (req, res) => {
    const { id:commentID } = req.params
    const comment = await Comment.findOneAndDelete({ _id: commentID });   
    if (!comment) {
        return res.status(404).json({ msg:`No comment with id ${commentID}` })    
    }
    res.status(200).json({ msg:' comment deleted', comment });  
})



module.exports = {
    create,
    getAll,
    getByID,
    getCommentsByPostID,
    update,
    addLike,
    userlikes,
    del
}