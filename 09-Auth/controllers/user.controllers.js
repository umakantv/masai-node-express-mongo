const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const axios = require('axios');
const userModel = require("../database/user.model");

const JWT_SECRET = process.env.JWT_SECRET;

function generateToken(user) {
    return jwt.sign({
        _id: user._id,
        name: user.name,
        email: user.email,
        image: user.image
    }, JWT_SECRET);
}

async function fetchUser(req, res) {

    const {id} = req.params;

    const user = await userModel.findById(id)

    if (user) {
        let userResponse = user.toJSON()

        delete userResponse.password;

        return res.status(200).send({
            status: 'success',
            data: userResponse
        })

    } else {
        return res.status(500).send({
            status: 'error',
            message: 'User does not exist'
        })
    }
}

async function login(req, res) {

    const user = req.body;

    let {email, password} = user;

    let existingUser = await userModel.findOne({
        email
    })

    if (existingUser) {
        let match = bcrypt.compareSync(password, existingUser.password);

        if (match) {
            // produce a JWT token
            let token = generateToken(existingUser);

            return res.status(200).send({
                status: 'success',
                data: {
                    token
                }
            })
        } else {
            return res.status(400).send({
                status: 'error',
                message: 'Password is wrong'
            })
        }
    } else {

        return res.status(400).send({
            status: 'error',
            message: 'User does not exist with the given email'
        })
    }
}

async function getLoggedInUser(req, res) {

    const {user} = req;

    if (user) {
        return res.status(200).send({
            status: 'success',
            data: user
        })
    } else {
        return res.status(400).send({
            status: 'error',
            message: 'User not logged in'
        })
    }
}

async function register(req, res) {
    const user = req.body;

    let {name, email, password} = user;

    let existingUser = await userModel.findOne({
        email
    })

    if (existingUser) {
        return res.status(400).send({
            status: 'error',
            message: 'User already exists with the given email'
        })
    } else {
        password = bcrypt.hashSync(password);
        let user = await userModel.create({
            name, email, password
        })

        user = user.toJSON();

        delete user.password;

        return res.status(200).send({
            status: 'success',
            data: user
        })
    }
}

async function githubSignin(req, res) {

    try {
        const {code} = req.query
    
        // 1 Exchange code with access token
    
        let client_id = process.env.GITHUB_OAUTH_CLIENT_ID;
        let client_secret = process.env.GITHUB_OAUTH_CLIENT_SECRET;
        let url = `https://github.com/login/oauth/access_token?client_id=${client_id}&client_secret=${client_secret}&code=${code}`;
    
        let response = await axios.post(url);
    
        const result = new URLSearchParams(response.data);
    
        const accessToken = result.get('access_token');
    
        let url2 = 'https://api.github.com/user';
    
        response = await axios.get(url2, {
            headers: {
                'Authorization': `Bearer ${accessToken}`
            }
        });

        const userDetails = response.data;

        let existingUser = await userModel.findOne({
            authType: 'github',
            username: userDetails.login
        });

        if (!existingUser) {
            existingUser = await userModel.create({
                authType: 'github',
                name: userDetails.name,
                username: userDetails.login,
                image: userDetails.avatar_url,
                email: userDetails.email,
            })
        }
        
        let token = generateToken(existingUser);

        return res.status(200).send({
            status: 'success',
            data: {
                token
            }
        })

    } catch(err) {

        console.error(err)
        return res.status(400).send({
            status: 'success',
            message: 'Something went wrong'
        })
    }
}

module.exports = {
    fetchUser,
    register,
    login,
    getLoggedInUser,
    githubSignin
}