
const mongoose = require('mongoose')

async function connectDatabase() {
    await mongoose.connect('mongodb://127.0.0.1:27017/pt-web-9-blogs')

    console.log('Connected to DB')
}

module.exports = connectDatabase;