
const mongoose = require('mongoose')

async function connectDatabase() {

    const result = await mongoose.connect('mongodb://127.0.0.1:27017/auth-example');

    return result;
}

module.exports = connectDatabase;