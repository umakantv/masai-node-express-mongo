
# Auth

[Flow Diagram](https://www.figma.com/file/Be0D3XKVIL5LpKH5csYtCu/User-Auth-Flow?type=whiteboard&node-id=0-1)


![](flow.png)

[Drawing Board](https://excalidraw.com/#json=rMI6JHtBal15kmhTkVbYY,9Mw7xQFVy9sZteOgBFuNRg)

You have to login for the following actions:

- Create a blog post (POST /api/posts)
- Like a post
- Add a comment
- Delete your own post
  - No-one should not be able to delete anyone else's post


## Which user is making a request?
How is server going to verify that this is the user

> POST /api/posts
```json
{
    "title": "NOT A FAKE NEWS",
    "content": "Rumors and blah blah",
    // How is server going to verify that this is the user
    // "author": {
    //     "userId": "abcdef",
    //     "name": "Abhishek",
    //     "image": "https://example.com/image.png"
    // }
}
```

Req headers: 
"Authorization": security-token // `Bearer sakdjfoiwsdhjfwnfnsidmnfoasmdf`

## Where does the Frontend application get this security token?

When user logs in to to the application, server will generate this token
and remember that user `abcdef` has token `sakdjfoiwsdhjfwnfnsidmnfoasmdf`

> POST /api/auth/login
```json
// Request body
{
    "email": "abcdef@example.com",
    "password": "password"
}

// Response
{
    "securityToken": "sakdjfoiwsdhjfwnfnsidmnfoasmdf"
}
```

Frontend application will store this token in cookies or local-storage
and send this token in all subsequent api request in the request headers

## How does server generate the token

Server will produce JWT - JSON Web Token

We need to encrypt user info in the security token

```json
{
    "_id": "645a662d0ae63a9a73bad469",
    "name": "Umakant",
    "email": "umakant@example.com",
    "password": "password", // DON'T ADD SENSITIVE INFO
    "iat": 1516239022
}
```

eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NDVhNjYyZDBhZTYzYTlhNzNiYWQ0NjkiLCJuYW1lIjoiVW1ha2FudCIsImVtYWlsIjoidW1ha2FudEBleGFtcGxlLmNvbSIsImlhdCI6MTUxNjIzOTAyMn0.aXNqjtOdmSdWqBMSnM4IjeWg39ZND2CWzKArG4KTOOc

We need a SECRET KEY to produce these tokens
Secret Key: YOUR_VERY_PRIVATE_SECRET

## How will we identify the user from this token

* Anyone can decrypt these tokens to check the payload without the secret key that was used to generate the token
* But NOONE will be able to generate the tokens with the same signature