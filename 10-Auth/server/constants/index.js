
// const SECRET = "JHS*@NBFK)@NSOKC(#";
const SECRET = process.env.SECRET;

const GOOGLE_OAUTH_CLIENT_ID = process.env.GOOGLE_OAUTH_CLIENT_ID;
const DB_URI = process.env.DB_URI;
const PORT = process.env.PORT;

const GITHUB_OAUTH_CLIENT_ID = process.env.GITHUB_OAUTH_CLIENT_ID;
const GITHUB_OAUTH_CLIENT_SECRET = process.env.GITHUB_OAUTH_CLIENT_SECRET;

module.exports = {
    SECRET,

    // other secrets that we don't want to share in the code
    
    GOOGLE_OAUTH_CLIENT_ID,
    DB_URI,
    PORT,
    GITHUB_OAUTH_CLIENT_ID,
    GITHUB_OAUTH_CLIENT_SECRET,
    
}