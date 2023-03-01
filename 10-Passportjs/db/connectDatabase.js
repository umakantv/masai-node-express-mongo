const mongoose = require('mongoose')

// Connect to the db

async function connectDatabase() {

    try {

        await mongoose.connect('mongodb://127.0.0.1:27017/passport-auth-example');
    
        console.log('Connected to database')

    } catch(err) {
        console.error('Could not connect to the database');
    }
}

module.exports = connectDatabase;
