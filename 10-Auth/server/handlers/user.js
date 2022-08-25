const User = require('../database/user')
const jwt = require('jsonwebtoken');
const { OAuth2Client } = require('google-auth-library')
const { SECRET } = require('../constants');
const googleOauthClient = new OAuth2Client(process.env.GOOGLE_OAUTH_CLIENT_ID);

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

    let userDoc = await User.create(user);

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
        audience: process.env.CLIENT_ID,
    });

    const { name, email, picture } = ticket.getPayload();

    const user = await User.findOne({ 
        email
    });

    if (user) {
        // after verifying google signin, we take over from here
        let encryptedToken = generateAuthToken(user);

        return res.send({
            data: {
                token: encryptedToken
            }
        });

    } else {
        // first time signin with google
        await User.create({
            name,
            email, 
            image: picture,
            authType: 'google-oauth',
            verified: true,
        })
    }
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
        if (user.password === password) {
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