const { User } = require("../database/User")
const jwt = require('jsonwebtoken');
const config = require("../config/config");
const axios = require('axios')

function generateToken(user) {
    const { _id, name, email, image} = user;

    return jwt.sign({
        _id, name, email, image
    }, config.JWT_SECRET_KEY);

}

async function register(req, res) {
    try {
        const {
            name, email, password
        } = req.body;

        if (!name || !email || !password) {
            return res.status(400).send({
                error: 'Incomplete data'
            })
        }

        let user = await User.findOne({
            email
        })

        if (user) {
            return res.status(400).send({
                error: 'User with email already exists'
            })
        }

        user = await User.create({
            name, email, 
            signinMethod: 'email-password',
            password // TODO: change this to encrypted password
        });

        return res.send({
            message: 'Registration successful'
        })

    } catch(err) {
        return res.status(500).send({
            error: 'Something went wrong'
        })
    }
}

async function login(req, res) {
    try {

        const {
            email, password
        } = req.body;

        let user = await User.findOne({
            email, 
        })

        if (!user) {
            return res.status(400).send({
                error: 'User with email does not exist'
            })
        }

        if (user.password !== password) { // TODO: to check encrypted value
            return res.status(400).send({
                error: 'Wrong password'
            })
        }

        // Create JWT token
        const token = generateToken(user);
        const { _id, name, image } = user;

        return res.send({
            message: 'Login successful',
            data: {
                token,
                user: {
                    _id, name, email, image
                }
            }
        })

    } catch(err) {
        console.log(err);
        return res.status(500).send({
            error: 'Something went wrong'
        })
    }
}

async function signinWithGitub(req, res) {
    try {
        
        const code = req.params.code;

        // exchange the code with access token
        const url = `https://github.com/login/oauth/access_token`

        let response = await axios.post(url, null, {
            params: {
                client_id: config.GITHUB_OAUTH_CLIENT_ID,
                client_secret: config.GITHUB_OAUTH_CLIENT_SECRET,
                code: code
            },
            headers: {
                'Accept': 'application/json',
            }
        });

        let accessToken = response.data.access_token;
        if (!accessToken) {
            console.log(response.data);
            throw new Error('Something went wrong')
        }

        let url2 = 'https://api.github.com/user';

        response = await axios.get(url2, {
            headers: {
                'authorization': `Bearer ${accessToken}`
            }
        });

        let user = response.data;

        let existingUser = await User.findOne({
            signinMethod: 'github-oauth',
            githubUsername: user.login
        });

        if (!existingUser) {
            existingUser = await User.create({
                name: user.name,
                email: user.email,
                image: user.avatar_url,
                signinMethod: 'github-oauth',
                githubUsername: user.login
            });
        }

        // Create JWT token
        const token = generateToken(existingUser);
        const { _id, name, image, email } = existingUser;

        return res.send({
            message: 'Login with github successful',
            data: {
                token,
                user: {
                    _id, name, email, image
                }
            }
        })


    } catch(err) {

        console.error(err);
        return res.status(500).send({
            error: 'Something went wrong'
        })
    }
}

async function getLoggedInUser(req, res) {
    try {
        const user = req.user;

        return res.send({
            data: user
        })


    } catch(err) {
        return res.status(500).send({
            error: 'Something went wrong'
        })
    }
}

module.exports = {
    register,
    login,
    signinWithGitub,
    getLoggedInUser
}