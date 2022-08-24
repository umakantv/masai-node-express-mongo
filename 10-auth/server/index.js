const express = require('express');
const { getLoggedInUser, login, register } = require('./controllers/user');
const connectDatabase = require('./database');
const app = express();

const cors = require('cors')

app.use(cors());
app.use(express.json());

// Log each and every request
function logger(req, res, next) {
    // This should be called from inside any previous middlware
    console.log(new Date(), req.method, req.url); // req log
    next(); // once the next middlware is executed
    // then rest of this current middlware will be executed
}

app.use(logger);

app.post('/register', register)
app.post('/login', login)
app.get('/loggedInUser', getLoggedInUser)


const PORT = 3020;
connectDatabase().then(() => {
    app.listen(3020, () => {
        console.log(`Server started at http://localhost:${PORT}`)
    })
})
