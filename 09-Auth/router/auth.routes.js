
import express from 'express'
import { githubSignin, login, register } from '../controllers/auth.controllers.js'
import { getUserFromRequest } from '../middlewares/auth.js';

const authRouter = express.Router();

authRouter.post('/register', async (req, res) => {
    try {
        const data = req.body;

        // validation: maybe we can check if name, email and password are present

        if (!(data.name && data.email && data.password)) {
            return res.status(400).send({
                message: 'Name, email and password are required'
            })
        }

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

authRouter.get('/github-signin/:code', async (req, res) => {
    try {
        let code = req.params.code

        let {token, user} = await githubSignin(code);

        return res.send({
            data: {user, token} // instead of user profile, we should generate and send auth token
        })

    } catch(err) {
        return res.status(500).send({
            message: err.message
        });
    }
})

authRouter.get('/loggedInUser', getUserFromRequest, async (req, res) => {
    try {
        let {loggedInUser} = req;

        return res.send({
            data: loggedInUser
        })

    } catch(err) {
        return res.status(500).send({
            message: err.message
        });
    }
})

export default authRouter