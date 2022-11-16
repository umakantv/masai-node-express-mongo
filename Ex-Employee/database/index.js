
import mongoose from 'mongoose'

async function connectDatabbase() {
    const connection = 'mongodb://127.0.0.1:27017/ems'

    return new Promise((resolve, reject) => {
        mongoose.connect(connection)
        .then(() => {
            console.log('Connected to database');
            resolve();
        })
        .catch((err) => {
            console.log('Could not connect to database')
            reject(err);
        })
    })
}

export default connectDatabbase;