const User = require('../database/user');
const jwt = require('jsonwebtoken');
const { OAuth2Client } = require('google-auth-library');
const { SECRET, GOOGLE_OAUTH_CLIENT_ID } = require('../constants');
const bcrypt = require('bcryptjs')
const googleOauthClient = new OAuth2Client(GOOGLE_OAUTH_CLIENT_ID);
const { faker } = require('@faker-js/faker')

function generateAuthToken({_id, email, name, image}) {

    return jwt.sign({
        _id, email, name, image
        // we should put an expiry to this token
        // and check at the time of auth
    }, SECRET)
}

async function register(req, res) {
    const { user } = req.body; // email, name, and password

    let existingUser = await User.findOne({
        email: user.email
    })

    if (existingUser) {
        return res.status(400).send({
            error: "User already exists"
        })
    }

    let password = bcrypt.hashSync(user.password, 10);

    let userDoc = await User.create({
        email: user.email,
        name: user.name,
        password,
        image: faker.internet.avatar(),
    });

    userDoc = userDoc.toJSON()  // 

    delete userDoc.password;

    return res.send({
        data: userDoc,
    })
}


async function googleSignin(req, res) {
    const { token } = req.body; // email, name, picture

    // verify the token
    const ticket = await googleOauthClient.verifyIdToken({
        idToken: token,
        audience: GOOGLE_OAUTH_CLIENT_ID,
    });

    const { name, email, picture } = ticket.getPayload();

    let user = await User.findOne({ 
        email
    });

    if (!user) {
        // first time signin with google
        user = await User.create({
            name,
            email, 
            image: picture,
            authType: 'google-oauth',
            verified: true,
        })

    }

    // after verifying google signin, we take over from here
    let encryptedToken = generateAuthToken(user);

    return res.send({
        data: {
            token: encryptedToken
        }
    });
}

async function login(req, res) {
    let { email, password } = req.body

    let user = await User.findOne({
        email: email
    }, {
        password: 1,
        _id: 1,
        email: 1,
        name: 1,
    })

    if (user) {
        // match the password
        if (bcrypt.compareSync(password, user.password)) {
            // generate a secret token
            // encrypt user object {_id, email, name, picture}
            
            let encryptedToken = generateAuthToken(user);

            return res.send({
                data: {
                    token: encryptedToken
                }
            })
        } else {
            return res.send({
                error: "Password does not match."
            })
        }
    } else {
        return res.status(404).send({
            error: "User is not found"
        })
    }
}

async function getLoggedInUser(req, res, next) {
    const { context } = req;

    if (!context.user) {
        return res.status(400).send({
            error: "Token was not provided"
        })
    } else {
        return res.send({
            data: context.user
        })
    }

}

async function getAllUsers(req, res) {
    let users = await User.find();

    return res.send({
        data: users
    })
}

module.exports = {
    register,
    login,
    getLoggedInUser,
    getAllUsers,
    googleSignin,
}