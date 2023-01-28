
const mongoose = require('mongoose');
const config = require('../config/config');

async function connectDatabase() {

    const result = await mongoose.connect(config.DB_CONNECTION_URL);

    return result;
}

module.exports = connectDatabase;