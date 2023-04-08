
const mongoose = require('mongoose')

const DB_CONNECTION_URL = process.env.DB_CONNECTION_URL

async function connectDatabase() {
    await mongoose.connect(DB_CONNECTION_URL)

    console.log('Connected to DB')
}

module.exports = connectDatabase;