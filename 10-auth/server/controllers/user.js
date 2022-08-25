const User = require("../database/user");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');
const { sendEmail } = require("../helpers/sendEmail");

const SECRET_KEY = '9h823rniunwef90';

async function register(req, res) {

    let {
        email, name, password
    } = req.body;

    const user = await User.findOne({
        email
    })

    if (user) {
        return res.status(400).send({
            response: 'error',
            message: 'Email already used'
        })
    }

    setTimeout(() => {
        User.findOneAndUpdate({
            email
        }, {
            verifiedEmailOtp: null, // clear
        })
    }, 15 * 60 * 1000)

    // encrypt the password
    password = bcrypt.hashSync(password, 10);

    let otp = crypto.randomInt(10000, 100000)

    await User.create({
        name,
        email,
        password,
        verifyEmailOtp: otp,
        verifiedEmail: false,
    });

    // send a verification email to user

    sendEmail({
        email,
        subject: 'Verify Email Address',
        html: `<b>Use OTP ${otp} to verify your email address.</b><br>Cheers`
    })

    return res.send({
        response: 'success',
        message: 'User registered successfully, verify email'
    })
}

async function login(req, res) {

    let {
        email, password
    } = req.body;

    const user = await User.findOne({
        email,
    });

    if (!user) {
        return res.status(404).send({
            response: 'error',
            message: 'Not any existing email'
        })
    }

    // check the password
    const matched = bcrypt.compareSync(password, user.password);

    if (matched) {
        // create a token

        const {
            name, email, verifiedEmail
        } = user;

        const token = jwt.sign({
            name, email, verifiedEmail
        }, SECRET_KEY);

        return res.send({
            response: 'success',
            token,
            user: {
                name, email, verifiedEmail
            }
        });

    } else {
        return res.status(400).send({
            response: 'error',
            message: 'Invalid password'
        })
    }

}

async function getLoggedInUser(req, res) {

    const token = req.headers['auth-token'];

    if (token) {
        // verify the token

        try {

            jwt.verify(token, SECRET_KEY);
        } catch(err) {
            return res.status(400).send({
                response: 'error',
                message: 'bad token'
            })
        }

        const decoded = jwt.decode(token);

        const user = await User.findOne({
            email: decoded.email
        })

        if(user) {
            const { name, email, verifiedEmail } = user;
    
            return res.send({
                user: {
                    name, email, verifiedEmail
                },
            })
        } else {
            return res.status(400).send({
                response: 'error',
                message: 'user not present'
            })
        }

    } else {
        return res.status(400).send({
            response: 'error',
            message: 'provide token'
        })
    }
}

async function verify(req, res) {
    const {otp, email} = req.body;

    const user = await User.findOne({
        email,
    });

    if (!user) {
        return res.status(404).send({
            response: 'error',
            message: 'Not any existing email'
        })
    }

    if (user.verifyEmailOtp == otp) {
        await User.findOneAndUpdate({
            email
        }, {
            verifiedEmail: true,
            verifyEmailOtp: null, // clear
        });

        return res.send({
            response: 'success',
            message: 'Email has been verified.'
        })
    } else {
        
        return res.status(400).send({
            response: 'error',
            message: 'otp does not match'
        })
    }

}

module.exports = {
    register,
    login,
    getLoggedInUser,
    verify,
}