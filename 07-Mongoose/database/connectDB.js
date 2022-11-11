import mongoose from "mongoose";

// Step 1. Connect to DB
export async function connectDatabase() {
    return new Promise((resolve, reject) => {
        // protocol://hostname:port/db_name
        // protocol://username@password:hostname:port/db_name
        mongoose.connect('mongodb://127.0.0.1:27017/employees-exercise', (err) => {
            if (err) {
                console.log('Error conencting to DB')
                reject(err)
            } else {
                console.log('Successfully connected to DB')
                resolve()
            }
        })
    })
}
