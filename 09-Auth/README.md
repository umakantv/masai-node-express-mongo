
# Authentication

Board: https://excalidraw.com/#json=bvbiNk18BQrGz4x0bRTH9,xCWYbJXWhjNuWw3mRa-WIw

Whenever we get a request, we limit and restrict the response based on the user
who is making that request.

If I want to update my info - name, phone
Anyone can't do that.

So the server should have a way to identify me as the info (resources) owner

User, Post, Comment

* Authentication Flow
* JWT Tokens
  These are tokens created by server using payload and a SECRET.
  Then these tokens are passed to client.
  Anyone can take these tokens and look at the payload.
  But these token can't be tampered.

# OAuth

1. Github

  * Homepage URL - After user gives login permission - Github will redirect on our home page

  Step 1: `https://github.com/login/oauth/authorize?client_id=<client_id>`
  Step 2: `http://localhost:3000/github-oauth-success?code=<access-code>`
  Step 3: Client makes api call to `/verifyGithub` with access code.
  Step 4a: Server makes API call to github to verify the access code and get access token
  `https://github.com/login/oauth/access_token?client_id=<client-id>&client_secret=<client-secret>&code=<access-code>`
  This will respond with an access token 
  `access_token=<access-token>&scope=&token_type=bearer`
  Step 4b: Server uses access token to get user details
  `https://api.github.com/user` with Bearer token authorization
  Step 5: User is saved into db if not already and then we prepare our own JWT token as already do
