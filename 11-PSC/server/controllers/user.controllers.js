const { UserModel } = require("../db/user");
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require("../config");
const axios = require('axios');

function generateToken(user) {
    if (user.password) {
        delete user.password
    }

    return jwt.sign(user, config.JWT_SECRET_KEY);
}

async function register({name, email, password}) {
    
    const existing = await UserModel.findOne({
        email
    })

    if (existing) {
        throw new Error('User already exists with the given email');
    }

    password = bcryptjs.hashSync(password);

    user = await UserModel.create({
        name, email, password,
        authType: 'email-password'
    });

    user = user.toJSON();

    delete user.password;

    return user;
}

async function login({email, password}) {

    const user = await UserModel.findOne({
        email,
        authType: 'email-password'
    })
    .select('_id name image email password')

    if (!user) {
        throw new Error('User does not exist with the given email');
    }

    const match = bcryptjs.compareSync(password, user.password);

    if (!match) {
        throw new Error('The password is incorrect');
    }

    // generate token
    const token = generateToken(user.toJSON());
    
    return token;
}

async function githubSignin(code) {

    let url = `https://github.com/login/oauth/access_token`;

    let response = await axios.post(url, {
        client_id: config.GITHUB_OAUTH_CLIENT_ID,
        client_secret: config.GITHUB_OAUTH_CLIENT_SECRET,
        code: code
    }, {
        headers: {
            'Accept': "application/json"
        }
    })

    const data = response.data;

    url = "https://api.github.com/user"

    response = await axios.get(url, {
        headers: {
            'Authorization': `Bearer ${data.access_token}`
        }
    })

    let userDetails = response.data

    let user = await UserModel.findOne({
        authType: 'github',
        githubUsername: userDetails.login
    })

    if (!user) {
        user = await UserModel.create({
            name: userDetails.name,
            image: userDetails.avatar_url,
            authType: 'github',
            githubUsername: userDetails.login
        })
    }

    user = user.toJSON();

    return generateToken(user);
}

async function getUserById(id) {
    const user = await UserModel.findById(id);

    return user;
}

module.exports = {
    register,
    login,
    githubSignin,
    getUserById,
}