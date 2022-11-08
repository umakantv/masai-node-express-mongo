
const express = require('express')
const multer  = require('multer')
const upload = multer({ dest: 'uploads/' })

const employeeRouter = require('./employeeRoutes');

const app = express();

function logger(req, res, next) {

    console.log(new Date(), req.method, req.url);  // Log 1
    // next is a function
    // next gives control to the next handler in pipeline
    next();
}

app.use(express.json());
app.use(logger);

let count = 0;

function countRequests(req, res, next) {
    count++;
    console.log('Got', count, 'requests');
    next();
}

app.use('/', employeeRouter);

app.get('/users', (req, res, next) => {

    console.log('Inside GET users handler')  // Log 2
    res.send([3, 4, 5]);

    next();
})

app.use(countRequests);


app.post('/submit', upload.single('avatar'), (req, res) => {

    const file = req.file;

    console.log('mimetype', file.mimetype);
    console.log('originalname', file.originalname);
    console.log('size', file.size);

    return res.send({
        message: 'Form submitted'
    })
})


// GET DELETE POST PUT PATCH
app.all('/hello', (req, res, next) => {

    console.log('Inside hello handler')  // Log 3
    return res.send({
        message: 'Hello there'
    })
})

app.get('/*', express.static('public'));

app.listen(3050, () => {
    console.log('Listening on http://localhost:3050')
})