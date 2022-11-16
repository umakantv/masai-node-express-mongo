import express from 'express';
import connectDatabbase from './database/index.js';

const app = express();
app.use(express.json());

connectDatabbase()
.then(() => {
    app.listen(3001, () => {
        console.log('Server is listening on http://localhost:3001')
    });
})
