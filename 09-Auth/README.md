
# Authentication

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