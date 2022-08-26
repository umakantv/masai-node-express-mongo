const User = require('../database/user');
const jwt = require('jsonwebtoken');
const { OAuth2Client } = require('google-auth-library');
const { SECRET, GOOGLE_OAUTH_CLIENT_ID, GITHUB_OAUTH_CLIENT_ID,
    GITHUB_OAUTH_CLIENT_SECRET } = require('../constants');
const bcrypt = require('bcryptjs')
const axios = require('axios').default;
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


// this is like loging in with with google -
// google will have user account
// google will create this token and provide us on frontend
// we have to verify it with google on server 
// before we create any user based on this token
async function googleSignin(req, res) {
    const { token } = req.body; // email, name, picture

    let ticket;
    try {
        // verify the token
        ticket = await googleOauthClient.verifyIdToken({
            idToken: token,
            audience: GOOGLE_OAUTH_CLIENT_ID,
        });
    } catch (ex) {
        return res.status(400).send({
            message: 'Google Signin Failed'
        })
    }

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

async function githubSignin(req, res) {
    const {code} = req.body;

    // we first have to use this code to get access token
    let url = `https://github.com/login/oauth/access_token?client_id=${GITHUB_OAUTH_CLIENT_ID}&client_secret=${GITHUB_OAUTH_CLIENT_SECRET}&code=${code}`
    
    axios.post(url)
    .then(response => {

        const data = response.data;

        const access_token = data.split('&')[0].split('=')[1];
    
        // then we use access token to get user details
        axios.get('https://api.github.com/user', {
            headers: { 
                Authorization: `Bearer ${access_token}`,
                'Content-Type': 'application/json'
            }
        })
        .then(async (user_response) => {
            const userData = user_response.data;
        
            const {name, login: githubUsername, avatar_url: image} = userData;
        
            // If first time github signin
        
            let user = await User.findOne({ 
                githubUsername
            });
        
            // then we store in out db
            if (!user) {
                // first time signin with google
                user = await User.create({
                    name,
                    githubUsername,
                    image,
                    authType: 'github-oauth',
                    verified: true,
                })
            }
        
            // after verifying github signin, we take over from here
            let encryptedToken = generateAuthToken(user);
        
            return res.send({
                data: {
                    token: encryptedToken
                }
            });
        }).catch(err => {
            console.error('Error in github user details request', err)
    
            return res.status(400).send({
                message: 'Github Signin Failed'
            })
        });
    
    })
    .catch(err => {
        console.error('Error in github access token request', err)

        return res.status(400).send({
            message: 'Github Signin Failed'
        })
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
    githubSignin,
}