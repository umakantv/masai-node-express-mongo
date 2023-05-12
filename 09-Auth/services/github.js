
import axios from 'axios'

const GITHUB_CLIENT_ID = process.env.GITHUB_CLIENT_ID;
const GITHUB_CLIENT_SECRET = process.env.GITHUB_CLIENT_SECRET;

export async function getAccessToken(code) {
    const response = await axios.post('https://github.com/login/oauth/access_token', {
        code,
        client_id: GITHUB_CLIENT_ID,
        client_secret: GITHUB_CLIENT_SECRET
    }, {
        headers: {
            'Accept': 'application/json'
        }
    })

    console.log('Access token response', response.data)

    return response.data.access_token;
}

export async function getUserProfile(accessToken) {
    const response = await axios.get('https://api.github.com/user', {
        headers: {
            'Accept': 'application/json',
            'Authorization': `Bearer ${accessToken}`
        }
    })

    console.log('User Profile response', response.data)

    return response.data;
}