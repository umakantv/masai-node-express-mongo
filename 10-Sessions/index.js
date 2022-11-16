

import express from 'express';
import session from 'express-session';

const app = express();

app.use(session({
    resave: false,
    saveUninitialized: false,
    secret: '123908209301923',
    cookie: {
        maxAge: 5 * 24 * 60 * 60 * 1000 // 5 days
    }
}))

app.get('/visits', (req, res) => {

    // session is private to a client and is identified by id from that request
    if (req.session.visit) {
        req.session.visit++;
    } else {
        req.session.visit = 1;
    }
    res.send(`Visits: ${req.session.visit}`)
})

const port = 3001;
app.listen(port, () => {
    console.log(`Server is listening on http://localhost:${port}`)
});