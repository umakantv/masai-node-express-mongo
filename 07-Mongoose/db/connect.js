
const mongoose = require('mongoose')

async function connect() {
    // protocol://username:password@host:port/db_name

    // return 1;

    return new Promise((resolve, reject) => {
        mongoose.connect('mongodb://localhost:27017/employees', (err) => {
            if (err) {
                console.log('Error in connecting to database')
                return reject(err);
            }
            resolve();
        })
    })
}

module.exports = connect;