import { connect } from 'mongoose';

export default async function connectDatabase() {

    let DB_CONNECTION_URL = process.env.DB_CONNECTION_URL;

    await connect(DB_CONNECTION_URL);
    console.log('Connected to the database');
}
