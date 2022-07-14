const mongoose = require('mongoose')

async function connectDatabase() {
    const dbUri = "mongodb://localhost:27017/simple-ecommerce"

    try {
        const response = await mongoose.connect(dbUri);

        console.log("Database connection successful");
    } catch (ex) {
        console.error("Error in initiating a database connection", ex.message);
        throw ex;
    }
}

module.exports = connectDatabase;