
# Authentication

Drawing Board: https://excalidraw.com/#json=0mBXae5jO-rG5QT6Av7P9,wl-Xl-_OE6fHAIVb9mjFnA

Sessions and JWT Tokens

User, Post, Comment

Post Routes

GET /posts -> Send paginated results for all posts
GET /post/:id -> Get the single post
POST /create -> Create a Post (restricted for Logged in users)

```json
{
    "title": "CLI tools you won't be able to live without 🔧",
    "content": "As developers, we spend a lot of our time in the terminal. There's a lot of helpful CLI tools, which can make your life in the command line easier, faster and generally more fun.

    This post outlines my top 50 must-have CLI tools, which I've come to rely on. If there's anything I'm missing - do let me know in the comments :)

    At the end of the article, I've included some scripts to help you automate the installation and updating of these tools on various systems/ distros.",

    "author": {
        "userId": "lissy93",
        "name": "Alicia Sykes",
        "image": "https://res.cloudinary.com/practicaldev/image/fetch/s--VpR-xpfa--/c_fill,f_auto,fl_progressive,h_90,q_auto,w_90/https://dev-to-uploads.s3.amazonaws.com/uploads/user/profile_image/44940/c48f6904-fc82-46a3-8ed7-b2baac65cf9c.jpg"
    }

}
```

For Logged In User

* Server should not allow Client to send `author` details
* Server should inject these details before adding the post in DB

For each request, 
* Is the user logged-in
* Who is logged-in user

Server identifies using headers

Server will prepare this token when user logs in
Client has to store this and send this token in each request

token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c"


"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c" -> lissy93

1. GET /user/loggedInUser
   * `token` -> if this token in request is valid -> Server will give user details
   * `token` -> if this is invalid -> Server will give error message
   * If no token token is present then Server will say not logged in
2. POST /user/login -> `token`
3. POST /user/register
4. POST /post 
   * if `token` is present in req header, then server will identify the logged in user and it will store `author` details according to the token


# Authorization

Two users are there
Both are logged in

One of them has bought subscription - User 1
Another's subscription has expired - User 2

/post/1
/post/2
/post/3
/post/4
/post/5
/post/6
/post/7
/post/8
/post/9
/post/10
/post/11 -> 401 Unauthorized


- 10 free posts
Privilege/Permission control


Store management

View Inventory -> 4 Items for P1, 5 Items for P2
Change Data Inventory -> 
