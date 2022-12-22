
const express = require('express')
const postRouter = express.Router()
const auth = require('../middleware/auth');

const postControllers = require('../controllers/posts.controllers');

// READ
postRouter.get('/posts', async (req, res) => {

    const {
        page = 1,
        pageSize = 20,
        sortBy = 'dateOfJoining',
        sortOrder = 'desc',
        search = ''
    } = req.query

    const {totalPosts, posts} = await postControllers.findPaginated({
        search, page, pageSize, sortBy, sortOrder
    });

    res.send({
        totalRecords: totalPosts,
        data: posts
    })
})

// READ
postRouter.get('/post/:id', async (req, res) => {

    const id = req.params.id;

    let post = null;
    try {
        post = await postControllers.findById(id);
    } catch(err) {
        console.error(err.message);

        return res.status(500).send({
            // message: 'Server ran into an unexpected error'
            message: err.message
        })
    }

    if (post) {
        return res.send({
            data: post
        })
    } else {
        return res.status(404).send({
            message: 'Post with given id does not exist'
        })
    }

})

// CREATE
postRouter.post('/post', auth, async (req, res) => {

    const postData = req.body;

    const userId = req.user._id;

    let post = null;
    try {
        post = await postControllers.createPost(userId, postData);
    } catch(err) {
        console.error(err.message);

        return res.status(500).send({
            message: err.message // 'Server ran into an unexpected error'
        })
    }

    return res.send({
        data: post
    });
})

// UPDATE
postRouter.patch('/post/:id', auth, async (req, res) => {

    const id = req.params.id;
    const userId = req.user._id;

    const postData = req.body;

    let post = null;
    try {
        post = await postControllers.updatePost(userId, id, postData);
    } catch(err) {
        console.error(err.message);

        return res.status(500).send({
            message: err.message // 'Server ran into an unexpected error'
        })
    }

    return res.send({
        data: post
    });
})

// DELETE
postRouter.delete('/post/:id', auth, async (req, res) => {

    const id = req.params.id;
    const userId = req.user._id;

    let post = null;
    try {
        post = await postControllers.deletePost(userId, id);
    } catch(err) {
        console.error(err.message);

        return res.status(500).send({
            message: err.message // 'Server ran into an unexpected error'
        })
    }

    if (post) {
        return res.send({
            data: post
        })
    } else {
        return res.status(404).send({
            message: 'Post with given id does not exist'
        })
    }
})

module.exports = postRouter;
