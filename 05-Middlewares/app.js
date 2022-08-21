const express = require('express')

const app = express()
let count = 0;
let users = [];

// Log each and every request
function logger(req, res, next) {
    // This should be called from inside any previous middlware
    console.log(new Date(), req.method, req.url); // req log
    next(); // once the next middlware is executed
    // then rest of this current middlware will be executed
}

function countRequest(req, res, next) {
    count++;
    console.log('Req #', count); // req count log
    next();
}


// Register Request handler - 4
app.all('/users/posts/*', (req, res, next) => {
    // res.status(404).send('Not found')

    console.log(404, 'Not Found');

    next();
})



// Apply First Middlware
app.use(express.json());

// Apply Second Middleware
app.use(logger)

// Register Request handler - 1
app.post('/user', (req, res, next) => {
    users.push(req.body.user);

    res.send('User added');

    next();
})

// Register Request handler - 5
app.post('/user', (req, res, next) => {
    
    console.log('Rest of the POST /user')
    next();
})


// Apply Third middleware
app.use(countRequest);


// Register Request handler - 2
app.get('/user/:username', (req, res, next) => {
    res.send({
        username: req.params.username
    })
    next();
})

// Register Request handler - 3
app.get('/users', (req, res, next) => {

    res.send({
        users
    })

    next();
})

const PORT = 3002;
app.listen(PORT, () => {
    console.log(`Server started on http://localhost:/${PORT}`)
})