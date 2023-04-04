const User = require("../db/user.model")
const {faker} = require('@faker-js/faker')
const jwt = require('jsonwebtoken')

const JWT_SECRET_KEY = "kjhodwiu0283je029jd20i30i23kd";

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
        password, // encrypt before storing in database
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

    if (user.password !== password) {
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

module.exports = {
    register,
    login,
    loggedInUser,
}