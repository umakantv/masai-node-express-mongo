const mongoose = require('mongoose');
const { Schema, model } = mongoose;

// mongoose.Schema  - Class
// mongoose.model   - function that returns a Class
// mongoose.connect

async function connectDatabase() {
    return new Promise((resolve, reject) => {
        const uri = 'mongodb://127.0.0.1:27017/example-dbs'
        mongoose.connect(uri, (err) => {
            if (err) {
                console.error('Error connecting to Database', err);
                return reject(err);
            }
            console.log('Successfully connected to database.')
            resolve();
        })
    })
}

// CRUD for todo

// Schema - create an instance of mongoose.Schema class
const TodoSchema = new Schema({
    task: String,
    createdAt: Date
});

// Model - mongoose.model
const Todo = model('Todo', TodoSchema);
// create a collection named todos if it doesn't exist

async function test() {
    await connectDatabase();

    // Create
    // const todo = await Todo.create({
    //     task: 'PQRS',
    //     createdAt: new Date(),
    // })

    // Read
    const todos = await Todo.find({
        _id: {
            $nin: ['630100b13b4be5e8be978a78', '630100b8b996b3d635581f9d']
        },
    });
    console.log(todos)

    // Update
    // Filter documents and update the first one
    // await Todo.findOneAndUpdate(
    //     {
    //         // filters
    //         _id: '6300ff7d50defdb8ec25ae26'
    //     }, 
    //     {
    //         // update fields
    //         task: 'Get First Aid Kit'
    //     }
    // );

    // await Todo.updateMany({
    //     _id: {
    //         $nin: ['630100b13b4be5e8be978a78', '630100b8b996b3d635581f9d']
    //     },
    // }, {
    //     task: 'Will delete this as well'
    // })

    // await Todo.deleteOne({
    //     _id: '6300ff7000b446417d4f081f'
    // })

    // await Todo.deleteMany({
    //     _id: {
    //         $nin: ['630100b13b4be5e8be978a78', '630100b8b996b3d635581f9d']
    //     },
    // })



}

test();