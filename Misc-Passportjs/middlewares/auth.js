const { loggedInUser } = require('../controllers/auth.controller');

async function auth(req, res, next) {
    try {
        const headers = req.headers;

        const authHeader = headers.authorization; // Bearer eyJ...

        if (authHeader) {

            const [prefix, token] = authHeader.split(' ');

            if (prefix === 'Bearer' && token) {

                try {
                    const user = await loggedInUser(token);

                    req.user = user;

                    next();

                } catch(err) {
                    return res.status(400).send({
                        error: "Bad token"
                    })
                }

            } else {
                return res.status(400).send({
                    error: "Unidentified token provided"
                })
            }

        } else {
            return res.status(400).send({
                error: "Token not present"
            })
        }

    } catch(err) {
        console.error(err.message);

        return res.status(500).send({
            error: 'Something went wrong'
        })
    }
}

module.exports = auth;