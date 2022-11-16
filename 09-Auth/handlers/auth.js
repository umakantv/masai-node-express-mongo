import userModel from "../database/user.js";
import { sign } from '../utils/jwt.js'
import axios from 'axios';

// name, email, password
export async function register(req, res) {

    try {
        const {name, email, password} = req.body;
    
        // if the user with that email exists
        const alreadyExisting = await userModel.findOne({
            email
        })
    
        if (alreadyExisting) {
            console.log('User already exists', alreadyExisting)
            return res.status(400).send({
                status: 'error',
                message: 'Email is already taken.'
            })
        } else {
            // send email to verify the user
    
            let user = await userModel.create({
                name, email, password // store hash of the password, never store plain text password 
            })

            user = user.toJSON();

            delete user.password;
    
            return res.send({
                status: 'success',
                message: 'Account has been created.',
                data: user
            })
        }
    } catch(err) {

        return res.status(500).send({
            status: 'error',
            message: 'Unexpected error occured.',
        })
    }
}

// email, password
export async function login(req, res) {

    try {

        const {email, password} = req.body;
    
        // if the user with that email exists
        const user = await userModel.findOne({
            email
        }, {
            _id: 1,
            name: 1,
            email: 1,
            password: 1,
            image: 1,
        })

        if (user) {
            // we have to check the password that we recieved

            if (user.password !== password) {

                return res.status(400).send({
                    status: 'error',
                    message: 'Invalid password',
                })
            } else {

                // user login is validated
                // create the JWT token

                const token = sign(user.toJSON());

                return res.send({
                    status: 'success',
                    message: 'You are now logged in',
                    data: {
                        token
                    }
                })
            }

        } else {
            return res.status(404).send({
                status: 'error',
                message: 'Can\'t find a user with that email, please register.',
            })
        }

    } catch(err) {

        return res.status(500).send({
            status: 'error',
            message: 'Unexpected error occured.',
        })
    }
}

// token - eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MzM0NzVkYzdlOWIzNzc2M2MyZDgyZmQiLCJuYW1lIjoiVW1ha2FudCIsInBhc3N3b3JkIjoicGFzc3dvcmQiLCJlbWFpbCI6ImVtYWlsMkBleGFtcGxlLmNvbSIsImlhdCI6MTY2NDM4MjQ3NCwiZXhwIjoxNjY0ODE0NDc0fQ.iumQR3uTs0WA-KXeD8e-qM2OXqPH8CKfGs_kPiX0X7U
export async function loggedInUser(req, res) {

    try {
        if (req.user) { // request is validated
            return res.send({
                status: 'success',
                message: 'User is logged in',
                data: req.user,
            })

        } else {
            return res.status(400).send({
                status: 'error',
                message: 'User is not logged in.',
            })
        }
    } catch(err) {

        return res.status(500).send({
            status: 'error',
            message: 'Unexpected error occured.',
        })
    }
    
}

export async function loginWithGithub(req, res) {

    const GITHUB_CLIENT_ID = process.env.GITHUB_CLIENT_ID;
    const GITHUB_SECRET = process.env.GITHUB_SECRET;


    try {
        
        let {code} = req.query;

        if (code) {
            // Step 4a `https://github.com/login/oauth/access_token?client_id=<client-id>&client_secret=<client-secret>&code=<access-code>`

            let getAccessTokenURL = `https://github.com/login/oauth/access_token?client_id=${GITHUB_CLIENT_ID}&client_secret=${GITHUB_SECRET}&code=${code}`

            console.log(getAccessTokenURL)

            axios.post(getAccessTokenURL)
            .then(response => {
                const data = response.data;
                
                const variables = data.split('&')

                const access_token_data = variables[0];

                const access_token = access_token_data.split('=')[1];

                const getUserURL = 'https://api.github.com/user';

                axios.get(getUserURL, {
                    headers: {
                        'Authorization': `Bearer ${access_token}`,
                        'Content-Type': 'application/json'
                    }
                })
                .then(async (response) => {
                    // User is valid github user
                    const {data: userData} = response;

                    let {login: github_id, name, bio, avatar_url: image} = userData;

                    let user = await userModel.findOne({
                        github_id
                    })

                    if (!user) {
                        user = await userModel.create({
                            github_id,
                            name, 
                            about: bio,
                            image
                        })
                    }

                    // Similar to our login function

                    // user github singin is validated
                    // and user is added in the database if it was not present
                    
                    // create the JWT token

                    const token = sign(user.toJSON());

                    return res.send({
                        status: 'success',
                        message: 'You are now logged in',
                        data: {
                            token
                        }
                    })
                        
                })
                .catch((err) => {

                    console.log(err)

                    return res.status(400).send({
                        status: 'error',
                        message: 'Something went wrong while fetching user detail.',
                    })
                })
            })
            .catch((err) => {

                console.error(err);
                return res.status(400).send({
                    status: 'error',
                    message: 'Something went wrong while fetching access token.',
                })
            })

        } else {
            return res.status(400).send({
                status: 'error',
                message: 'Token is not present.',
            })
        }

    } catch(err) {

        return res.status(500).send({
            status: 'error',
            message: 'Unexpected error occured.',
        })
    }
    
}