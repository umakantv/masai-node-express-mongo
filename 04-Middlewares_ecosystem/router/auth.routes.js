
import express from 'express'
import {register} from '../controllers/auth.controllers.js'

const authRouter = express.Router();

authRouter.post('/register', (req, res) => {
    try {
        const data = req.body;

        // validation: maybe we can check if name, email and password are present

        const user = register(data.name, data.email, data.password)

        return res.send({
            data: user
        })
    } catch(err) {
        return res.status(500).send({
            message: err.message
        });
    }
})

authRouter.post('/login', (req, res) => {})
authRouter.get('/loggedInUser', (req, res) => {})

export default authRouter