
const express = require('express');
const { getPostById, addPost, getAllPosts, deletePostById } = require('../controllers/post.controller');
const auth = require('../middlewares/auth');

const postRouter = express.Router()

postRouter.get('/', async (req, res) => {
    try {

        let {
            page = 1, 
            pageSize = 10,
            search,
            sortBy,
            sortOrder
        } = req.query;

        const {
            posts, postCount
        } = await getAllPosts({
            page: Number(page),
            pageSize: Number(pageSize),
            search, sortBy, sortOrder
        });

        res.send({
            data: {
                records: posts,
                totalRecords: postCount
            }
        })
    } catch(err) {
        console.error(err.message);
        return res.status(500).send({
            error: 'Something went wrong'
        })
    }
})

postRouter.get('/:id', async (req, res) => {
    try {

        const post = await getPostById(req.params.id);

        return res.send({
            data: post
        })
    } catch(err) {
        console.error(err.message);
        return res.status(500).send({
            error: 'Something went wrong'
        })
    }
})

// Only the logged in user should be allowed to add the post
postRouter.post('/', auth, async (req, res) => {
    try {
        const data = req.body;

        const user = req.user;

        data.author = {
            userId: user._id,
            name: user.name,
            image: user.image
        }

        const post = await addPost(data);

        return res.send({
            data: post
        });

    } catch(err) {
        console.error(err.message);
        return res.status(500).send({
            error: 'Something went wrong'
        })
    }
})

postRouter.patch('/:id', (req, res) => {
    try {

        return res.status(500).send({
            message: 'Not Implemented'
        })
    } catch(err) {
        console.error(err.message);
        return res.status(500).send({
            error: 'Something went wrong'
        })
    }
})

postRouter.delete('/:id', auth, async (req, res) => {
    try {

        const id = req.params.id;

        const post = await deletePostById(id, req.user);

        return res.send({
            data: post
        });

    } catch(err) {
        console.error(err.message);
        return res.status(500).send({
            error: 'Something went wrong'
        })
    }
})

module.exports = postRouter;
