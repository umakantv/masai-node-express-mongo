# Complete Auth flow

In this tutorial we learn how to secure APIs with JWT tokens

For unauthorized users
* Login
* Register
* Signin with Github
* Get Posts
* Get Post by ID

For Authorized user (with valid JWT token)
* Get Loggedin User
* Create Post
* Update Post
* Delete Post


## `.env` file
Add these values in the `.env` file
```
DB_CONNECTION_URL=

JWT_SECRET_KEY=

GITHUB_OAUTH_CLIENT_ID=
GITHUB_OAUTH_CLIENT_SECRET=

```