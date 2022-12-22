
require('dotenv').config()

const config = {
    DB_CONNECTION_URL: process.env.DB_CONNECTION_URL,
    JWT_SECRET_KEY: process.env.JWT_SECRET_KEY,
    GITHUB_OAUTH_CLIENT_ID: process.env.GITHUB_OAUTH_CLIENT_ID,
    GITHUB_OAUTH_CLIENT_SECRET: process.env.GITHUB_OAUTH_CLIENT_SECRET,
}

module.exports = config