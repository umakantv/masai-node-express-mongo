const userModel = require("../database/user.model");

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
        return res.status(404).send({
            status: 'error',
            message: 'User does not exist'
        })
    }
}

async function addUser(req, res) {
}

module.exports = {
    fetchUser,
    addUser
}