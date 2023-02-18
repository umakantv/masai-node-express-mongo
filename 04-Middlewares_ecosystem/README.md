
# Middleware Ecosystem

Board Link: https://excalidraw.com/#json=kaBDunBh2PVF0gf_UFZ48,S-fCKumoyOVwhaAXcgV9Zw

## What is a middleware?

Some action between two actions

Action 1 -> Middleware -> Action 2
Action A -> Middleware -> Action B
Action X -> Middleware -> Action Y

```js
// Higher Order Function

express.json = function () {
    return function (req, res, next) {

    }
}

express.static = function(path) {
    return function (req, res, next) {
        const filename = req.url;
    }
}
```

https://www.npmjs.com/package/morgan

# For File upload
https://www.npmjs.com/package/multer