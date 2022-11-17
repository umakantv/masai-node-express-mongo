const userModel = require("../database/user.model");
const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET;

async function auth(req, res, next) {

    let token = req.headers.authorization || '';

    token = token.split(' ')[1];

    if (token) {

        try {

            const result = jwt.verify(token, JWT_SECRET);
    
            let user = await userModel.findById(result._id);
    
            user = user.toJSON();
    
            delete user.password;
    
            req.user = user;

        } catch(err) {
            console.log('Error in verifying the token', err);
        }
    }

    next();
}

module.exports = auth;