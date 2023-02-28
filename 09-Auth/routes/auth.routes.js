
const express = require('express');
const config = require('../config');
const axios = require('axios');
const { register, login, signinWithGithub } = require('../controllers/auth.controllers');
const authMiddleware = require('../middlewares/auth');


const authRouter = express.Router();

authRouter.post('/register', async (req, res) => {

    try {
        const {
            name, email, 
            password
        } = req.body;
    
        const user = await register(name, email, password);

        return res.send({
            message: 'Registeration successful, please login',
            data: user
        })

    } catch(err) {
        console.error(err);

        return res.status(500).send({
            error: 'Something went wrong'
        })
    }
})

authRouter.post('/login', async (req, res) => {
    
    try {
        const {
            email, password
        } = req.body;
    
        const data = await login(email, password);

        return res.send({
            message: 'Login successful',
            data
        })

    } catch(err) {
        console.error(err);

        return res.status(500).send({
            error: 'Something went wrong'
        })
    }
})

authRouter.get('/loggedInUser', authMiddleware, async (req, res) => {
    try {

        const {loggedInUser} = req;

        return res.send({
            data: loggedInUser
        })

    } catch(err) {
        console.error(err);

        return res.status(500).send({
            error: 'Something went wrong'
        })
    }

})

authRouter.get('/signinWithGithub/:code', async (req, res) => {

    try {

        const code = req.params.code;

        // We exchange this code for an access token

        const url = `https://github.com/login/oauth/access_token?client_id=${config.GITHUB_CLIENT_ID}&client_secret=${config.GITHUB_CLIENT_SECRET}&code=${code}`;

        let response = await axios.post(url, null, {
            headers: {
                'Accept': 'application/json'
            }
        });

        const {access_token} = response.data;

        if (!access_token) {
            throw new Error('Access Code may be expired.');
        }

        // With access token we get the user details
    
        let url2 = 'https://api.github.com/user';

        let userDetailsReponse = await axios.get(url2, {
            headers: {
                'Authorization': `Bearer ${access_token}`
            }
        });

        const {
            login, avatar_url, email, 
            name
        } = userDetailsReponse.data;

        const data = await signinWithGithub({
            name, email, avatar_url, login
        })

        return res.send({
            message: 'Login with github successful',
            data
        });

    } catch(err) {
        console.error(err.message);

        return res.status(500).send({
            error: 'Something went wrong'
        })
    }
})

module.exports = authRouter;