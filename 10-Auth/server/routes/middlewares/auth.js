const { SECRET } = require("../../constants");
const User = require("../../database/user");
const jwt = require('jsonwebtoken');

async function auth(req, res, next) {
    
    let token = req.headers.token;

    if (token) {
        let decoded_user;
        try {
            decoded_user = jwt.verify(token, SECRET);

        } catch(ex) {
            console.log(ex)
            return res.status(400).send({
                error: "Invalid Token provided"
            })
        }

        const user = await User.findOne({
            email: decoded_user.email
        })

        if (user) {
            req.context.user = user;
        } else {
            return res.status(401).send({
                error: "You need to login to proceed."
            })
        }
    }

    next();
}

module.exports = auth;