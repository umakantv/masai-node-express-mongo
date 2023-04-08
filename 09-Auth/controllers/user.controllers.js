
const User = require("../db/user.model");

async function getUserById(userId) {
    let user = await User.findById(userId)

    if (user) {
        user = user.toJSON()

        delete user.password;
    }

    return user;
}

module.exports = {
    getUserById
}