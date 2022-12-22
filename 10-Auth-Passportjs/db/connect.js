
const mongoose = require('mongoose');
const config = require('../config');

async function connect() {
    // protocol://username:password@host:port/db_name

    console.log(config.DB_CONNECTION_URL)

    return new Promise((resolve, reject) => {
        mongoose.connect(config.DB_CONNECTION_URL, (err) => {
            if (err) {
                console.log('Error in connecting to database')
                return reject(err);
            }
            console.log('Connected to DB')
            resolve();
        })
    })
}

module.exports = connect;