import express from 'express'
import { addPost } from '../controllers/post.controllers.js'
import { getUserFromRequest } from '../middlewares/auth.js';

const postRouter = express.Router();

postRouter.post('/', getUserFromRequest, async (req, res) => {
    try {
        const post = req.body

        if (!(post.title && post.content)) {
            return res.status(400).send({
                message: 'Both title and content are required'
            })
        }

        let {loggedInUser} = req

        let addedPost = await addPost(post, loggedInUser)

        return res.send({
            data: addedPost
        })

    } catch (error) {
        return res.status(500).send({
            message: error.message
        })
    }
})

export default postRouter