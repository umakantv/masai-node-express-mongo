
# OAuth

Sign in with Google
Sign in with Facebook
Sign in with Github
Sign in with Twitter
Sign in with Microsoft
Sign in with Apple

Scope of the Oauth:
Default: Identity
    * name, email, image, gender


Advantage:

1. User doesn't have to signup
2. You don't have to verify their email
3. User doesn't have remember the credentials

Steps: 
1. We have to register our application on these identity provides
   * CLIENT_ID - Public (ID of our application for Google/Github)
   * CLIENT_SECRET - This must always remain secret and should be stored on our server - in `.env`
2. We have to show the user the option to login with Google
3. We have to take the user to Google Sign in page
4. User can allow the permission (first time)
   * This application wants to use your google account to sign in
5. Google will send the user back to our application (Two possible outcomes) with access code or error
   * We don't have user details at this point we only access code
   * We have to exchange this code for user details by calling Oauth APIs
   * But we need CLIENT_SECRET to call this API
   * That means we can call only from backend
6. We have to store the user's details on our application
   * Name
   * Email
   * Image
   * Login-Method

Github Oauth

https://docs.github.com/en/developers/apps/building-oauth-apps/authorizing-oauth-apps


![](https://www.figma.com/file/Be0D3XKVIL5LpKH5csYtCu/User-Auth-Flow?node-id=799%3A145&t=f8rEtnXKThtM8MbJ-4)
