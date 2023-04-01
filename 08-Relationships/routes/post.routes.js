
const express = require('express');
const { addPost, getAllPosts, deletePostById } = require('../controllers/post.controller');

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

postRouter.post('/', async (req, res) => {
    try {
        const data = req.body;

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
