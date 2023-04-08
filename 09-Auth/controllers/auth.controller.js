const User = require("../db/user.model")
const {faker} = require('@faker-js/faker')
const jwt = require('jsonwebtoken')
const axios = require('axios')
const bcrypt = require('bcryptjs')

const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;
const GITHUB_CLIENT_ID = process.env.GITHUB_CLIENT_ID;
const GITHUB_CLIENT_SECRET = process.env.GITHUB_CLIENT_SECRET;

function generateToken(payload) {
    return jwt.sign(payload, JWT_SECRET_KEY);
}

function verifyToken(token) {
    let payload = jwt.verify(token, JWT_SECRET_KEY);

    return payload;
}

async function register(name, email, password) {

    let existing = await User.findOne({
        email
    })

    if (existing) {
        throw new Error('User already exists with the given email')
    }

    let user = await User.create({
        name,
        email,
        password: bcrypt.hashSync(password, 10), // encrypt before storing in database
        image: faker.internet.avatar(),
    })

    user = user.toJSON();

    delete user.password; // before we send it as API response

    return user;
}

async function login(email, password) {

    let user = await User.findOne({
        email
    })

    if (!user) {
        throw new Error('User does not exist with the given email')
    }

    if (!bcrypt.compareSync(password, user.password)) {
        throw new Error('Password is incorrect')
    }

    // generate the token without the password in the payload
    user = user.toJSON();
    delete user.password;

    const token = generateToken(user);

    return {token, user};

}

async function loggedInUser(token) {

    // whether the token is valid or not

    let user = verifyToken(token);

    // if it is valid, who is the logged in user
    return user;
}

async function githubSignin(code) {

    let url = `https://github.com/login/oauth/access_token?client_id=${GITHUB_CLIENT_ID}&client_secret=${GITHUB_CLIENT_SECRET}&code=${code}`

    const response = await axios.get(url, {
        headers: {
            'accept': 'application/json'
        }
    });

    const accessToken = response.data.access_token

    let profileUrl = 'https://api.github.com/user'

    let profileResponse = await axios.get(profileUrl, {
        headers: {
            'authorization': `Bearer ${accessToken}`
        }
    })

    const {
        login: githubUsername,
        name,
        avatar_url: image,
        email,
    } = profileResponse.data;

    console.log(name, githubUsername);

    let user = await User.findOne({
        githubUsername,
        authMode: 'github'
    })

    if (!user) {
        user = await User.create({
            githubUsername,
            authMode: 'github',
            name, image, email
        });
    }

    user = user.toJSON();
    delete user.password;

    const token = generateToken(user);

    return {token, user};
}

module.exports = {
    register,
    login,
    loggedInUser,
    githubSignin,
}