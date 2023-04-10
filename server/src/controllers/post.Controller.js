const Post = require('../models/post.Schema')
const User = require('../models/user.Schema')
const asyncWrapper = require('../middlware/asyncWrapper')


const create = asyncWrapper( async (req, res) => {
    const post = await Post.create(req.body);
    res.status(201).json({ status: 'ok', data: post, msg: 'post created' })
})


const getAll = asyncWrapper( async (req, res) => {
    // const posts = await Post.find({}).populate('user').populate('comments')
    const posts = await Post.find({}).populate('user')
    const sorted = posts.sort((a,b)=> new Date(b.time_stamp).getTime() - new Date(a.time_stamp).getTime())
    res.status(200).json({ status: 'ok', data: sorted })
})

const getByID = asyncWrapper( async (req, res) => {
    const { id:postID } = req.params
    // const post = await Post.findOne({ _id: postID }).populate('user').populate('comments')
    const post = await Post.findOne({ _id: postID }).populate('user')
    if (!post) {
        return res.status(400).json({msg: `no post with id ${postID}`}) 
    }
    res.status(200).json({ data: post }) 
})

const getPostsByUserID = asyncWrapper( async (req, res) => {
    const { userID } = req.params
    const posts = await Post.find({user: userID})
    if (!posts) {
        return res.status(400).json({msg: `no posts by user with id ${userID}`}) 
    }
    const sorted = posts.sort((a,b)=> new Date(b.time_stamp).getTime() - new Date(a.time_stamp).getTime())
    res.status(200).json({ status: 'ok', data: sorted, amt: posts.length  })
})


const update = asyncWrapper( async (req, res) => {
    const { id: postID } = req.params;
    const post = await Post.findByIdAndUpdate({ _id: postID }, req.body, {
        new:true,
        runValidators:true
    });
    if (!post) {
        return res.status(404).json({ msg:`No post with id ${postID}` })    
    }
    res.status(200).json({ msg: 'post updated', data: post }) 
})

const addLike = asyncWrapper( async (req, res) => {
    const { id: postID } = req.params;
    const post = await Post.findByIdAndUpdate({ _id: postID }, { $inc:{ likes:1 } }, {
        new:true,
        runValidators:true
    });
    res.status(200).json({ msg: 'like added', data: post })
})

const userlikes = asyncWrapper( async (req, res) => {
    const userID = req.params.user
    const postID = req.params.post
    const user = await User.findOne({ _id: userID })
    if (!user) {
        res.send('no user found')
        return;
    }
    let post = await Post.findOne({ _id: postID })
    if (!post) {
        res.send('no post found')
        return;
    }
    let liked;
    if (post.likedBy.includes(userID)){   //if likedBy list includes userID it will decrement like counter and remove name from list
        post = await Post.findByIdAndUpdate({ _id: postID }, { $inc:{ likes: -1 } }, {
            new:true,
            runValidators:true
        });
        post = await Post.findOneAndUpdate({ _id: postID }, { $pull : { likedBy: userID } }, {
            new:true,
            runValidators:true
        });
        liked = 'like removed'
    } else {
        post = await Post.findByIdAndUpdate({ _id: postID }, { $inc:{ likes: 1 } },  {
            new:true,
            runValidators:true
        });
        post = await Post.findOneAndUpdate({ _id: postID }, { $push : { likedBy: userID } }, {
            new:true,
            runValidators:true
        });
        liked = 'like added'
    }
    res.status(200).json({msg: liked, user, post})

})


const getTotalLikes = async ( req, res) => {
    const userID  = req.params.user
    try {
        const match = [
            { $group: { _id: "$user", sum: { $sum: "$likes" }}}
        ]
        const totalLikes = await Post.aggregate(match)
        const byUser = totalLikes.filter(x => x._id.toString() == userID )
        res.json({likes: byUser[0].sum}) 
    } catch (error) {
        res.json({msg: error})
    }
    
}



const del = asyncWrapper( async (req, res) => {
    const { id:postID } = req.params;
    const post = await Post.findOneAndDelete({ _id: postID });   
    if (!post) {
        return res.status(404).json({ msg:`No post with id ${postID}` })    
    }
    res.status(201).json({ msg:'post deleted', post });  
})




module.exports = {
    create,
    getAll,
    getByID,
    getPostsByUserID,
    update,
    del,
    addLike,
    userlikes,
    getTotalLikes
}