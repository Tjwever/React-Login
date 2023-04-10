const express = require('express');
const router = express.Router();

const {
    create,
    getAll,
    getByID,
    getCommentsByPostID,
    update,
    addLike,
    userlikes,
    getTotalCommentLikes,
    del,
} = require('../controllers/comment.Controller')

router.post('/', create);

router.get('/', getAll);

router.get('/:id', getByID);

router.get('/onPost/:postID', getCommentsByPostID)


router.patch('/:id', update)

router.patch('/like/:id', addLike);

router.patch('/userlikes/:user/:comment', userlikes) // use userID and commentID

router.delete('/:id', del)


module.exports = router