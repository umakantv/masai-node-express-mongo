require('dotenv').config();
const { OAuth2Client } = require('google-auth-library');
const { GOOGLE_OAUTH_CLIENT_ID } = require('../constants');
const googleOauthClient = new OAuth2Client(GOOGLE_OAUTH_CLIENT_ID);

async function test() {

    // verify the token
    const ticket = await googleOauthClient.verifyIdToken({
        idToken: '',
        audience: GOOGLE_OAUTH_CLIENT_ID,
    });

}

test()