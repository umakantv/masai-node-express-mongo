
const express = require('express');
const { fetchPosts, addPost, getPost } = require('../controllers/posts.controllers');
const authMiddleware = require('../middlewares/auth');

const postRouter = express.Router();

postRouter.get('/', async (req, res) => {

    try {
        let {page = 1, pageSize = 10, search = ''} = req.query;

        page = parseInt(page);
        pageSize = parseInt(pageSize);

        const {posts, totalPosts} = await fetchPosts({
            page, pageSize, search
        });

        return res.send({
            data: {
                records: posts,
                totalRecords: totalPosts,
            }
        })

    } catch(err) {
        console.error(err);

        return res.status(500).send({
            error: 'Something went wrong'
        })
    }
})

postRouter.post('/', authMiddleware, async (req, res) => {

    try {
        const {loggedInUser} = req; // guaranteed that user is logged in

        let {title, content} = req.body;

        const post = await addPost({
            title, content, 
            userId: loggedInUser._id
        });

        return res.send({
            data: post
        })


    } catch(err) {
        console.error(err);

        return res.status(500).send({
            error: 'Something went wrong'
        })
    }
})

postRouter.get('/:id', async (req, res) => {

    try {

        let {id} = req.params;

        const post = await getPost(id);

        return res.send({
            data: post
        })

    } catch(err) {
        console.error(err);

        return res.status(500).send({
            error: 'Something went wrong'
        })
    }
})

module.exports = postRouter;
