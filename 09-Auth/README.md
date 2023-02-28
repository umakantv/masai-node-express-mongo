
# Authentication

Board Link: https://excalidraw.com/#json=-FOBCQ6hr3G9hAqsmVVZU,P8kE4bz_OcQXfMfoSGD_nQ

## SETUP

Create a `.env` file with these variable

```env
JWT_SECRET = 'Whatever you want'
DB_CONNECTION_URL = 'mongodb://127.0.0.1:27017/blogs-example'
```


1. POST /auth/register
    We add user data to the database
2. POST /auth/login
3. GET /auth/loggedInUser  


```js
const app = express();

app.get('/', (req, res) => {})
app.get('/', (req, res) => {})

const authRouter = express.Router();

authRouter.post('/register', (req, res) => {})
authRouter.post('/login', (req, res) => {})
authRouter.get('/loggedInUser', (req, res) => {})

app.use('/auth', authRouter)

```

# JWT Token

```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2M2Y5YzBlNDY3ZWViMjRmZmZkY2UyZGQiLCJuYW1lIjoiSm9obiBEb2UiLCJlbWFpbCI6ImpvaG4uZG9lQGV4YW1wbGUuY29tIiwiaWF0IjoxNTE2MjM5MDIyfQ.DegnBPv3Uw3llcr_JaL6i4l128tOy451j4izAHKi2Iw
```

1. Header - algorithm, type
2. Payload/Claim - Anybody can decode this payload without the SECRET
```json
{
    "_id": "63f9c0e467eeb24fffdce2dd",
    "name": "John Doe",
    "email": "john.doe@example.com",
    "iat": 1516239022
}
```

3. Signature
Changes as we change the secret

Only the issuer can verify the token with the secret


## OAuth

Signin with Google, Facebook, Github, etc.

Remove Register and Login with email and password

We will register our application for Signin with Github

Github will provide:
- Oauth Client ID - Github will need this to identify which app user is trying to sign into.
- Oauth Client Secret - Is a secret that should never be shared with Frontend

Client ID: 0cbca4f1f45ac3d6c3e8
Client Secret: 9d6e26c687b3d34f08f39f307a3a3a21255037b3

----

https://docs.github.com/en/apps/oauth-apps/building-oauth-apps/authorizing-oauth-apps

On our Frontend we will show user the button to Signin with Github

This will take the user to the Github Login page/Consent Screen

If the user gives the permission, then the user is sent back to our application
using CALL BACK ROUTE (http://localhost:3000/github-signin).

http://localhost:3000/github-signin?code=66d37cf7868e6a2576b9

Github will give us a temporary code - access code(valid for 10 mins).

----

With this temporary code, we can't fetch user details from github.
We have to exchange this access code for access token (similar to our token but used to fetch user details from github).
We use Oauth Client ID and Oauth Client Secret

Once we get the user details from github, then we can check 
whether the user is already present in our db or not
If not present, then we will add the user to our db
otherwise we will add the user

Then we can create our own JWT auth token
This is equivalent to login API.

