function logger(req, res, next) {

    console.log(new Date(), req.method, req.url);  // Log 1

    // next is a function
    // next gives control to the next handler in pipeline
    next();
}

module.exports = logger;