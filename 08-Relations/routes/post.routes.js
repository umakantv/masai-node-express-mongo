
const express = require('express')
const router = express.Router()

const postControllers = require('../controllers/posts.controllers');

// READ
router.get('/posts', async (req, res) => {

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
router.get('/post/:id', async (req, res) => {

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
router.post('/:userId/post', async (req, res) => {

    const postData = req.body;

    const userId = req.params.userId;

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
router.patch('/:userId/post/:id', async (req, res) => {

    const id = req.params.id;
    const userId = req.params.userId;

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
router.delete('/:userId/post/:id', async (req, res) => {

    const id = req.params.id;
    const userId = req.params.userId;

    let post = null;
    try {
        post = await postControllers.deletePost(id);
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

module.exports = router;
