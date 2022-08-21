const mongoose = require('mongoose');

async function connectDatabase() {
    return new Promise((resolve, reject) => {
        const uri = 'mongodb://127.0.0.1:27017/example-dbs'
        mongoose.connect(uri, (err) => {
            if (err) {
                console.error('Error connecting to Database', err);
                return reject(err);
            }
            console.log('Successfully connected to database.')
            resolve();
        })
    })
}


module.exports = connectDatabase;