
# Server needs to implement these routes

1. `/register`
    - Takes email, password 
    - Sends email for verification (optional)
    - Returns success response

2. `login`
    - Takes email, password
    - Returns response with token ()

3. `/loggedInUser`
    - Check whether a user is logged in on that device
    - If so, we return response with the user details
    - Otherwise, we return empty response

4. `/loginWithGithub`