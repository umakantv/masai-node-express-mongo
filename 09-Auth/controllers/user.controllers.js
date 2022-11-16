const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const userModel = require("../database/user.model");

const JWT_SECRET = process.env.JWT_SECRET;

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
            let token = jwt.sign({
                _id: existingUser._id,
                name: existingUser.name,
                email: existingUser.email,
                image: existingUser.image
            }, JWT_SECRET);

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

    try {

        console.log(req.headers);
        let token = req.headers.authorization || '';

        token = token.split(' ')[1];

        if (token) {

            const result = jwt.verify(token, JWT_SECRET);

            let user = await userModel.findById(result._id);

            user = user.toJSON();

            delete user.password;

            return res.send({
                status: 'success',
                data: user
            })
        } else {

            return res.status(400).send({
                status: 'error',
                message: 'User not logged in'
            })
        }
    
    } catch(err) {
        return res.status(500).send({
            status: 'error',
            message: 'Something went wrong'
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

module.exports = {
    fetchUser,
    register,
    login,
    getLoggedInUser
}