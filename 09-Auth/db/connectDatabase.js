const mongoose = require('mongoose');
const config = require('../config');

// Connect to the db

async function connectDatabase() {

    try {

        await mongoose.connect(config.DB_CONNECTION_URL);
    
        console.log('Connected to database')

    } catch(err) {
        console.error('Could not connect to the database');
    }
}

module.exports = connectDatabase;
