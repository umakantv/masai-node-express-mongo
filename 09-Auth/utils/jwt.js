import jwt from 'jsonwebtoken'


export function sign(payload) {
    
    const SECRET = process.env.JWT_SECRET;

    return jwt.sign(payload, SECRET, {

        expiresIn: '5d',

    })
    

}

export function verify(token) {

    const SECRET = process.env.JWT_SECRET;

    try {
        return jwt.verify(token, SECRET);
    } catch(err) {
        throw new Error('Error in verifying the token');
    }
}

export function decode(token) {
    return jwt.decode(token);
}