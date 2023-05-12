import express from 'express'
import { getCommentsByPostId, addComment } from '../controllers/comment.controllers.js'
import { getUserFromRequest } from '../middlewares/auth.js';

const commentRouter = express.Router();

commentRouter.post('/', getUserFromRequest, async (req, res) => {
    try {
        const comment = req.body

        if (!(comment.comment && comment.postId)) {
            return res.status(400).send({
                message: 'Both comment and postId are required'
            })
        }

        let {loggedInUser} = req

        let addedComment = await addComment(comment, loggedInUser)

        return res.send({
            data: addedComment
        })

    } catch (error) {
        return res.status(500).send({
            message: error.message
        })
    }
})

commentRouter.get('/:postId', async (req, res) => {
    try {
        const {postId} = req.params

        let comments = await getCommentsByPostId(postId)

        return res.send({
            data: comments
        })

    } catch (error) {
        return res.status(500).send({
            message: error.message
        })
    }
})

export default commentRouter