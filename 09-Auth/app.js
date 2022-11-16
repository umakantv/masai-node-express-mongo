import {config} from 'dotenv';

config()

// console.log(process.env.GITHUB_CLIENT_ID, process.env.GITHUB_SECRET)

import express from 'express';
import connectDatabbase from './database/index.js';
import auth from './middlewares/auth.js';
import authRouter from './routes/auth.js';

const app = express();
app.use(express.json());
app.use(auth);

app.use(authRouter);

app.get('/', app.use(express.static('static')))

connectDatabbase()
.then(() => {
    app.listen(3000, () => {
        console.log('Server is listening on http://localhost:3000')
    });
})
