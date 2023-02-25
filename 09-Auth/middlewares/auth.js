const { verifyToken, getUserById } = require("../controllers/auth.controllers");

async function authMiddleware(req, res, next) {
    try {
        const headers = req.headers;

        const authHeader = headers['authorization'];

        if (authHeader) {

            const token = authHeader.split(' ').pop();

            const payload = verifyToken(token);

            const user = await getUserById(payload._id);

            req.loggedInUser = user; // 

            next();

        } else {
            return res.status(400).send({
                message: 'User is not logged in'
            })
        }
    } catch(err) {
        console.error(err);

        return res.status(500).send({
            error: 'Something went wrong'
        })
    }
}

module.exports = authMiddleware;