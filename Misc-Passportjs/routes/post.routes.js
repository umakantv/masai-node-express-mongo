
const express = require('express');
const { addPost, getAllPosts, deletePostById } = require('../controllers/post.controller');
const auth = require('../middlewares/auth');

const postRouter = express.Router()

postRouter.get('/', async (req, res) => {
    try {

        let {
            page = 1, 
            pageSize = 10
        } = req.query;

        const {
            posts, postCount
        } = await getAllPosts({
            page: Number(page),
            pageSize: Number(pageSize)
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

    } catch(err) {
        console.error(err.message);
        return res.status(500).send({
            error: 'Something went wrong'
        })
    }
})

postRouter.delete('/:id', async (req, res) => {
    try {

        const id = req.params.id

        const post = await deletePostById(id);

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
