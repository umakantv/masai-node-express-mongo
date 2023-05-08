import { connect } from 'mongoose';

export default async function connectDatabase() {

    await connect('mongodb://127.0.0.1:27017/relations-10');
    console.log('Connected to the database');
}
