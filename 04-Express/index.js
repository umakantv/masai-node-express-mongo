const express = require('express')

const app = express();

// console.log(process)

app.get('/hello', (req, res) => {
    try {
        res.send({
            message: 'Welcome to express'
        });
    } catch(ex) {
        console.error('Error in hello', ex)
        res.status(500).send('Internal Server Error');
    }
})

app.get('/hello/:username', (req, res) => {
    const username = req.params.username;

    return res.send({
        message: 'hello, ' + username
    });
})

// hello/tarun/posts
app.get('/user/:username/posts', (req, res) => {
    const username = req.params.username;

    if (username !== 'tarun') {
        // assume this user does not exist in database
        return res.status(404).send('User does not exist.')
    }

    return res.send({
        posts: [
            {
                title: 'Hello'
            },
            {
                title: 'Bye'
            }
        ]
    });
})

app.get('/user/:username/post/:postId', (req, res) => {

    const {username, postId} = req.params;

    const {title, time} = req.query;

    if (username !== 'tarun') {
        // assume this user does not exist in database
        return res.status(404).send('User does not exist.')
    }

    return res.send({
        post: {
            id: postId,
            title: title || 'Hello World',
            time: time || new Date()
        }
    });
})

const PORT = 3020;
app.listen(3020, () => {
    console.log(`Server started at http://localhost:${PORT}`)
})