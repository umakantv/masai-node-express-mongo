const mongoose = require('mongoose')

// Connect to the db

async function connectDatabase() {

    try {

        await mongoose.connect('mongodb://127.0.0.1:27017/employees');
        // await mongoose.connect('mongodb+srv://pt-web-8-b:pt-web-8-b@cluster0.zc6pidl.mongodb.net/mongoose-demo?appName=mongosh+1.6.0');
    
        console.log('Connected to database')

    } catch(err) {
        console.error('Could not connect to the database');
    }
}

module.exports = connectDatabase;
