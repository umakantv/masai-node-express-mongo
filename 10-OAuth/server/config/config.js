
const config = {
    JWT_SECRET_KEY: process.env.JWT_SECRET_KEY,
    DB_CONNECTION_URL: process.env.DB_CONNECTION_URL,
    GITHUB_OAUTH_CLIENT_ID: process.env.GITHUB_OAUTH_CLIENT_ID,
    GITHUB_OAUTH_CLIENT_SECRET: process.env.GITHUB_OAUTH_CLIENT_SECRET,
}

module.exports = config;