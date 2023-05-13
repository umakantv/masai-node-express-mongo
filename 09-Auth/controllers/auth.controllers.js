import UserModel from "../db/User.model.js";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { getAccessToken, getUserProfile } from "../services/github.js";

// We are not supposed to hard code this
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;

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

    if (!bcrypt.compareSync(password, user.password)) {
        throw new Error('Password is wrong.')
    }

    user = user.toJSON()
    delete user.password;

    let token = generateToken({
        _id: user._id,
        name: user.name,
        email: user.email,
        image: user.image,
        // expiresAt: new Date("2023-05-12") // 5 days expiry or so
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
        name, email, 
        password: bcrypt.hashSync(password, 10),
    })

    // return user public info with id
    user = user.toJSON()
    delete user.password;

    return user;
}

export async function githubSignin(code) {

    // Exchange this code to get access token
    // https://docs.github.com/en/apps/oauth-apps/building-oauth-apps/authorizing-oauth-apps#2-users-are-redirected-back-to-your-site-by-github

    let accessToken = await getAccessToken(code)

    // Use the access token to get the user profile
    // https://docs.github.com/en/apps/oauth-apps/building-oauth-apps/authorizing-oauth-apps#3-use-the-access-token-to-access-the-api
    let userProfile = await getUserProfile(accessToken)

    // Check if this user is already added into our database
    let user = await UserModel.findOne({
        authMode: 'github',
        githubUsername: userProfile.login,
    })

    if (!user) {
        user = await UserModel.create({
            name: userProfile.name,
            email: userProfile.email,
            authMode: 'github',
            githubUsername: userProfile.login,
            image: userProfile.avatar_url,
        })
    }

    user = user.toJSON();
    delete user.password;

    let token = generateToken({
        _id: user._id,
        name: user.name,
        email: user.email,
        image: user.image,
        // expiresAt: new Date("2023-05-12") // 5 days expiry or so
    })

    return {token, user}

}

export async function getUserById(id) {

    let user = await UserModel.findById(id);

    user = user.toJSON()
    delete user.password;

    return user
}

export function verifyToken(token) {
    return jwt.verify(token, JWT_SECRET_KEY);
}