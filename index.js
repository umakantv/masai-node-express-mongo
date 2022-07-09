const express = require('express')

const app = express();

app.use(logger);
app.use(countRequests);

// registering of routes
app.post('/user', createUserRouteHandler);
app.get('/post', postRouteHandler);
app.get('/user', userRouteHandler);
app.get('/', (req, res, next) => {
    res.send(`Welcome to our express API. This one was Req no. ${count}.`)
});

app.get('/*', (req, res) => {
    res.status(404).send("Not found")
});


function logger(req, res, next) {
    console.log(new Date(), req.method, req.path);
    next();
}

let count = 0;

function countRequests(req, res, next) {
    count++;
    next();
}

function userRouteHandler(req, res) {
    return res.send({ name: "Umakant" });
}

function postRouteHandler(req, res) {
    return res.send({ content: "Happy birthday Varun" });
}

function createUserRouteHandler(req, res, next) {
    res.send("User has been created");
}
app.listen(3000);