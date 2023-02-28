const User = require("../db/User.model")

const jwt = require('jsonwebtoken');
const config = require("../config");
const bcrypt = require('bcryptjs');

function generateToken(user) {
    let payload = {
        _id: user._id,
        email: user.email,
        name: user.name,
    }

    return jwt.sign(payload, config.JWT_SECRET)
}

function verifyToken(token) {
    const payload = jwt.verify(token, config.JWT_SECRET);

    return payload;

}

async function register(name, email, password) {

    const alreadyExisting = await User.findOne({
        email
    });

    if (alreadyExisting) {
        throw new Error('User already exists');
    }

    let user = await User.create({
        name, email, 
        password: bcrypt.hashSync(password)  // TODO: encrypted password
    });

    user = user.toJSON();

    delete user.password;

    return user;
}

async function login(email, password) {
    let user = await User.findOne({
        email
    })

    if (user) {

        user = user.toJSON();

        if (bcrypt.compareSync(password, user.password)) {

            // generate a token
            delete user.password;

            return {
                token: generateToken(user),
                user,
            }
        } else {
            throw new Error('Password does not match')
        }
    } else {
        throw new Error('User does not exist');
    }
}

async function getUserById(id) {
    let user = await User.findById(id);

    user = user.toJSON();

    delete user.password;

    return user;
}

async function signinWithGithub({
    name, email, avatar_url, login
}) {

    let user = await User.findOne({
        githubUsername: login,
        signinMethod: 'github'
    });

    if (!user) {
        // If the user is not present in the database - the first time the user signs in using github
        user = await User.create({
            signinMethod: 'github',
            githubUsername: login,
            name,
            email,
            image: avatar_url
        });
    }

    user = user.toJSON();

    delete user.password;

    return {
        token: generateToken(user),
        user,
    }
}

module.exports = {
    register,
    login,
    verifyToken,
    getUserById,
    signinWithGithub,
}