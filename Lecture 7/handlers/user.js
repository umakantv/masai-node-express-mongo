const User = require('../database/user')


async function createUser(req, res) {
    const { user } = req.body;

    let userDoc = await User.create(user);

    return res.send({
        data: userDoc,
    })
}

async function getAllUsers(req, res) {
    let users = await User.find();

    return res.send({
        data: users
    })
}

module.exports = {
    createUser,
    getAllUsers,
}