
const express = require('express');
const cors = require('cors');
const employeeRouter = require('./router/employee');
const morgan = require('morgan')
const multer  = require('multer')
const upload = multer({ dest: 'static/uploads/' })
const fs = require('fs/promises');
const app = express();

// Purpose of middlewares
// there is SOME COMMON LOGIC that we want to execute for ALL REQUESTS

// function cors() { // higher order functions
//     // 
//     return function(req, res, next) {
//         res.setHeader('Access-Control-Allow-Origin', '*');
//         next();
//     }
// }

app.use(express.json()); // convert request body to json
app.use(cors()); // Middleware to add response header for CORS issue
app.use(morgan('tiny'))

function logRequest(req, res, next) {
    next();
    console.log(new Date(), req.method, req.url); // 1
}

app.get('/hello', (req, res, next) => {
    console.log('In root path')

    res.send('Hello there')

    next();
})


app.post('/profile', upload.single('avatar'), (req, res) => {
    console.log('Request received', req.file);

    if (req.file) {

        try {
    
            const extension = req.file.mimetype.split('/').pop(); // image/jpg 
            console.log(extension);
            fs.rename(`./static/uploads/${req.file.filename}`, `./static/uploads/${req.file.filename}.${extension}`)
            return res.send(`<img src="http://localhost:3035/uploads/${req.file.filename}.${extension}">`)
        } catch (err) {
            console.log()
        }

    }

})

// app.use(logRequest);


// app.use('/auth', authRouter); /auth/login, /auth/register

app.use('/', employeeRouter);

app.use('/', express.static('static'));

const port = process.argv[2] || 3035;

app.listen(port, () => {
    console.log(`Server listening to http requests on http://localhost:${port}`)
})