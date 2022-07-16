const mongoose = require('mongoose')

async function connectDatabase() {
    const dbUri = "mongodb://localhost:27017/ptweb4"

    try {
        await mongoose.connect(dbUri)

        console.log('Connected to Database');
    } catch (error) {
        console.log('Error connecting to database')
        throw error
    }
}

module.exports = connectDatabase;