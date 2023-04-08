
const express = require('express');
const { getCommentsByPostId, addCommentForPost } = require('../controllers/comment.controllers');

const authMiddleware = require('../middlewares/auth');

const commentRouter = express.Router();

commentRouter.get('/:postId', async (req, res) => {
    
    try {
        const {postId} = req.params;

        const comments = await getCommentsByPostId(postId);

        return res.send({
            data: comments
        });

    } catch(err) {
        console.error(err);

        return res.status(500).send({
            error: 'Something went wrong'
        })
    }
})

commentRouter.post('/:postId', authMiddleware, async (req, res) => {
    try {
        const {postId} = req.params;

        const {content} = req.body;

        const comment = await addCommentForPost({
            content,
            postId,
            user: req.user,
        });

        return res.send({
            data: comment
        });

    } catch(err) {
        console.error(err);

        return res.status(500).send({
            error: 'Something went wrong'
        })
    }
})

module.exports = commentRouter;

