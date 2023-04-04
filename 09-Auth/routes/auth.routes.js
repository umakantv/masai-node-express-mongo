
const express = require('express');
const { register, login } = require('../controllers/auth.controller');
const auth = require('../middlewares/auth');

const authRouter = express.Router()

authRouter.post('/register', async (req, res) => {
    try {
        const data = req.body;

        const user = await register(data.name, data.email, data.password);

        return res.send({
            data: user
        })

    } catch(err) {
        console.error(err.message);
        return res.status(500).send({
            error: 'Something went wrong'
        })
    }
})


authRouter.post('/login', async (req, res) => {
    try {
        const data = req.body;

        const {user, token} = await login(data.email, data.password);

        return res.send({
            data: {
                token,
                user
            }
        })

    } catch(err) {
        console.error(err.message);
        return res.status(500).send({
            error: 'Something went wrong'
        })
    }
})

authRouter.get('/loggedInUser', auth, async (req, res) => {
    try {

        const user = req.user;

        return res.send({
            data: user
        })

    } catch(err) {
        console.error(err.message);

        return res.status(500).send({
            error: 'Something went wrong'
        })
    }
})


module.exports = authRouter;
