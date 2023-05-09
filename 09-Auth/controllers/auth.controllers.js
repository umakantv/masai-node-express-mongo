import UserModel from "../db/User.model.js";
import jwt from 'jsonwebtoken';

const JWT_SECRET_KEY = 'jkahsf823ndrowunxcwe089jn0123d92u3n';

function generateToken(userInfo) {
    return jwt.sign(userInfo, JWT_SECRET_KEY)
}

export async function login(email, password) {

    let user = await UserModel.findOne({
        email
    })

    if (!user) {
        throw new Error('User with given email is not present.')
    }

    // check password, TODO: we will store the encrypted
    if (user.password !== password) {
        throw new Error('Password is wrong.')
    }

    user = user.toJSON()
    delete user.password;

    let token = generateToken({
        _id: user._id,
        name: user.name,
        email: user.email,
        image: user.image,
    })

    return {user, token};
}

export async function register(name, email, password) {
    // application logic for registeration goes here

    // first check if the email is already taken

    let already = await UserModel.findOne({
        email
    })

    if (already) {
        throw new Error('User with given email is already present');
    }

    // if not, then add a new user with this email

    let user = await UserModel.create({
        name, email, password
    })

    // return user public info with id
    user = user.toJSON()
    delete user.password;

    return user;
}