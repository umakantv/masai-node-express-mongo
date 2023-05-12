import express from 'express'
import { addPost, getPostById, getPosts } from '../controllers/post.controllers.js'
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

postRouter.get('/:id', async (req, res) => {
    try {
        const id = req.params.id

        let post = await getPostById(id)

        if (!post) {
            return res.status(404).send({
                message: 'Post does not exist'
            })
        }

        return res.send({
            data: post
        })

    } catch (error) {
        return res.status(500).send({
            message: error.message
        })
    }
})

// api/posts?search=nodejs&page=1&pageSize=10
postRouter.get('/', async (req, res) => {
    try {
        let {
            page = 0,
            pageSize = 5,
            search = "",
            sortBy = "createdAt", sortOrder = "desc"
        } = req.query

        page = parseInt(page)
        pageSize = parseInt(pageSize)

        let {posts, totalPosts} = await getPosts({
            page, pageSize, search, sortBy, sortOrder
        })

        return res.send({
            data: {
                records: posts,
                totalRecords: totalPosts,
            }
        })

    } catch (error) {
        return res.status(500).send({
            message: error.message
        })
    }
})

export default postRouter