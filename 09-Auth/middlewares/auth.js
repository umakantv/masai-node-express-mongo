import { getUserById, verifyToken } from "../controllers/auth.controllers.js";

/**
 * This function will validate the auth token if present
 * and set the loggedin user from the request header
 * 
 * In all other cases where the token is absent or invalid
 * the request will be blocked by sending 401 response
 */
export async function getUserFromRequest(req, res, next) {
    let authHeader = req.headers['authorization'];

    if (authHeader) {
        let [type, token] = authHeader.split(' ')
    
        if (type == 'Bearer' && token) {
            try {
                let decodedUser = verifyToken(token)
    
                // check for decodedUser.expiresAt < new Date(0)
    
                let user = await getUserById(decodedUser._id)
    
                // Once we have identified the user
                // We want to use the user info in the application logic
                // so we add a new property in the request object
                // for next functions to get the loggedInUser
                req.loggedInUser = user;
    
                next();

                // This is important because we want to send the response
                // from the next function
                return;
    
            } catch(err) {
                console.error(err)
            }
        }
    }

    return res.status(401).send({
        message: "Not a logged in user"
    })
}