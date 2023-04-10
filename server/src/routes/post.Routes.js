const express = require('express');
const router = express.Router();


const {
    create,
    getAll,
    getByID,
    getPostsByUserID,
    update,
    del,
    addLike,
    userlikes,
    getTotalLikes
} = require('../controllers/post.Controller')



router.post('/', create)   // note both are named /api/v1/post but one is a GET

router.get('/', getAll)

router.get('/:id', getByID)

router.get('/byUser/:userID', getPostsByUserID)

router.get('/likecount/:user', getTotalLikes)

router.patch('/:id', update)

router.delete('/:id', del)

router.patch('/like/:id', addLike)

router.patch('/userlikes/:user/:post', userlikes)



module.exports = router