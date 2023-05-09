
import express from 'express'
import { login, register } from '../controllers/auth.controllers.js'

const authRouter = express.Router();

authRouter.post('/register', async (req, res) => {
    try {
        const data = req.body;

        // validation: maybe we can check if name, email and password are present

        const user = await register(data.name, data.email, data.password)

        return res.send({
            data: user
        })
    } catch(err) {
        return res.status(500).send({
            message: err.message
        });
    }
})

authRouter.post('/login', async (req, res) => {

    try {
        const data = req.body;

        const {user, token} = await login(data.email, data.password)

        return res.send({
            data: {user, token}
        })
    } catch(err) {
        return res.status(500).send({
            message: err.message
        });
    }
})


authRouter.get('/loggedInUser', (req, res) => {})

export default authRouter