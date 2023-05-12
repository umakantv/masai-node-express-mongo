# OAuth

https://excalidraw.com/#json=x92nXRjCFqhZIMGb6pH9Q,cp_n9NShLH3PGbIB04lWQg

https://excalidraw.com/#json=Gd649av7ZBij1OxmyIpDU,OqSDV_WgcctY2qaiScDZJA

https://www.figma.com/file/Be0D3XKVIL5LpKH5csYtCu/User-Auth-Flow?node-id=0-1&t=5olqgHzkRODtIniF-0


OAuth Identity Provider

* Google
* Github
* LinkedIn
* Microsoft
* Facebook
* etc

### Login with Google
Since google has already verified the user, you don't have to

### Login with Github


We, as developers, have to register our application on
the OAuth platforms
We provide a callback URL - https://pt-web.com/signin-with-google

Agreement
Consent - http://localhost:3000/github-signin?code=b26a942519668db53ad1 (Callback URL we provided)
No Consent - http://localhost:3000/github-signin?status=failure&reason="User did not allow"

CLIENT ID - string that will help the platform to identify which application 
is the user trying to sign into

FIGMA - Google Oauth CLIENT ID
532352704633-6pkces9iboppp465idnovkcqtlsa8j7t.apps.googleusercontent.com

Github Client ID:
36094d9c506d788d6b49

Github Client Secret:
52c90e4c0********a7941a31

access_token=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&scope=&token_type=bearer

CLIENT SECRET - This is also string that is used to communicate with plaform's APIs - for eg to fetch the user details/profile details
This should never be revealed to anybody
WE HAVE TO KEEP IT SAFE at the backend

We need to make an API call to auth platform to fetch USER PROFILE with
- client id
- client secret
- and temporary code that we get in the callback URL

After we fetch the user details by making an API call from the server

```json
{
    "name": "ABC",
    "email": "abc@example.com",
    "profile_pic": "https://...",
}
```

We need to check if the this is the first time
then we need to add the user to our database

We are replacing:
- register
- login



https://github.com/login/oauth/authorize?client_id=a4aac465ef9ca7723a9a

http://localhost:3000/github-signin?code=4fdeb507d1b2cb431d62