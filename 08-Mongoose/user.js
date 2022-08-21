const mongoose = require('mongoose');
const connectDatabase = require('./db');
const { Schema, model } = mongoose;


const subjectSchema = new Schema({
    name: String,
    score: {
        type: Number,
        min: 0,
        max: 100,
    },
})
const preparedSchema = {
    name: {  // shorthand method to describe your document properties
        type: String,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    verifiedEmail: Boolean,
    role: String,
    subjects: [subjectSchema]

    // subjects: {
    //     type: Array,
    //     childrenSchema: {
    //         type: Object,
    //         // childrenSchema: {
    //         //     name: {
    //         //         type: String,
    //         //         required: true,
    //         //         minlength: 2,
    //         //         maxlength: 10,
    //         //     },
    //         //     score: {
    //         //         type: Number,
    //         //         min: 0,
    //         //         max: 100,
    //         //         required: true
    //         //     }
    //         // }
    //     }
    // }

}

if (2 % 2 == 0) {
    preparedSchema['email'] = {
        type: String,
    }
}

// Schema - create an instance of mongoose.Schema class
const schema = new Schema(preparedSchema, {
    timestamps: true
    // automatically manage - createdAt and updatedAt timestamp fields
});

// Model - mongoose.model
const User = model('User', schema);

async function test() {
    await connectDatabase();

    // CREATE
    const user = await User.create({
        name: 123,
        // email: 'umakant0@gmail.com',
        password: 'random-password', // this is not how we store passwords in database
        verifiedEmail: 0,
        role: 'Student',
        subjects: [
            {
                name: null,
                score: 72,
            },
            {
                name: 'React Frontend',
                score: 65,
            },
        ]

        
    })

    // READ

    const users = await User.find({
        // _id: '6301070d2e892ee49b414fa6'
    })

    console.log(users)

    // String(123)


}

test();