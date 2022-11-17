

# Sessions

* The first time any client makes the first request to our server, `express-session` is going to initiate the session data which is private to that client and is mapped to an `id`. That `id` is passed to the client in cookies through `Set-Cookie` header in the response.
* When browser sees the `Set-Cookie` header in response, it is going to store that in the cookie storage.
* In all subsequent requests, client will send the `cookie` in req headers.
* `express-session` is going to identify the client based on the id in the cookie.
* It will then set the `session` property in `req` object. We can update or read from `res.session` object.
* This session is private to each client and is identified using the id in the cookie from that client, we can verify this by making a request to ther server from different browsers.
* By default, `express-session` stores these cookies in memory, which means if our server dies, the session data for all client goes away.

* We can use a persistent storage for cookies as well, like a json file or separate dedicated mongodb collection for session-data.
  
You can read more about different options you can use from `express-sessions` here: https://www.npmjs.com/package/express-session

## Expiry

We can give the expiry option to `express-session` middleware like so.

```js
app.use(session({
    resave: false,
    saveUninitialized: false,
    secret: '123908209301923',
    cookie: {
        maxAge: 5 * 24 * 60 * 60 * 1000 // 5 days
    }
}))
```



happy coding :)