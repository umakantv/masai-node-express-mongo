
function logger(req, res, next) {
    next(); // next function in the middleware chain

    console.log(new Date(), req.method, req.url) // 1
}
module.exports = logger;