import { connect } from 'mongoose';
import {config} from 'dotenv'

config()

export default async function connectDatabase() {

    let DB_CONNECTION_URL = process.env.DB_CONNECTION_URL;

    await connect(DB_CONNECTION_URL);
    console.log('Connected to the database');
}
