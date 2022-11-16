import express from 'express';

const app = express();

let count = 0;

// It is just to log the request
function logger(req, res, goToNextFunction) {
    goToNextFunction();
    console.log(new Date(), req.method, req.url);
}


function countRequests(req, res, next) {
    next();
    count++;
}

const hello = (req, res, goToNextFunction) => {

    res.send({
        message: 'Hello back'
    })
}

const helloWithName = (req, res, goToNextFunction) => {

    const {name} = req.params;
    res.send({
        message: 'Hello, ' + name
    })
}

// Middleware
app.use(logger)
app.use(countRequests)
app.use(express.json()) // this middleware converts request body into json
// We have instructed EXPRESS to call this function 
// without matching any req method and endpoint


app.get('/hello', hello)
app.get('/hello/:name', helloWithName)


const customerRouter = express.Router();

function customerRouterMiddleware(req, res, next) {
    console.log('Customer Router')
    next();
}
customerRouter.use(customerRouterMiddleware);

customerRouter.get('/all', hello)
customerRouter.get('/:id', hello)
customerRouter.post('/', hello)
customerRouter.patch('/:id', hello)
customerRouter.delete('/:id', hello)


const orderRouter = express.Router();

function orderRouterMiddleware(req, res, next) {
    console.log('Order Router');
    next();
}
orderRouter.use(orderRouterMiddleware);

orderRouter.get('/all', hello)
orderRouter.get('/:id', hello)
orderRouter.post('/', hello)
orderRouter.patch('/:id', hello)
orderRouter.delete('/:id', hello)


app.use('/customer', customerRouter);
app.use('/order', orderRouter);


const port = 3001;
app.listen(port, () => {
    console.log(`Server started at http://localhost:${port}`);
})