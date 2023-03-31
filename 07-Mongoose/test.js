
const mongoose = require('mongoose')
const {faker} = require('@faker-js/faker')
const crypto = require('crypto')

async function connectDatabase() {
    // If the database does not exist - it will be created for us
    await mongoose.connect('mongodb://127.0.0.1:27017/pt-web-9-mongoose')

    console.log('Connected to DB')
}

// Define a model

// the users collection will be created if it does not exist
const User = mongoose.model('User', { // User -> users (plural)
    name: String, // property: type
    email: String,
    password: String,
    gender: String,
    dateOfBirth: {
        type: Date,
        required: true
    },
    active: Boolean,
    salary: Number,
    friends: [String],
}) // you can explicitly provide the name of the collection

// User.create({})
// User.create([{}, {}, {}])

// User.find()
// User.findById()
// User.findOne()

// User.findByIdAndUpdate()
// User.findOneAndUpdate()
// User.updateOne()
// User.updateMany()

// User.deleteOne()
// User.deleteMany()
// User.findByIdAndDelete()
// User.findOneAndDelete()


async function create() {
    const user = await User.create({
        name: faker.name.fullName(),
        email: faker.internet.email(),
        password: faker.internet.password(),
        gender: 'male',
        dateOfBirth: faker.date.birthdate(),
        active: true,
        salary: crypto.randomInt(1000, 5000),
        friends: [
            faker.name.fullName(),
            faker.name.fullName(),
            faker.name.fullName(),
        ]
    })

    console.log(user)

    let users = []

    for (let i = 0; i < 10; i++) {
        users.push({
            name: faker.name.fullName(),
            email: faker.internet.email(),
            password: faker.internet.password(),
            gender: 'female',
            dateOfBirth: faker.date.birthdate(),
            active: true,
            salary: crypto.randomInt(1000, 5000),
            friends: [
                faker.name.fullName(),
                faker.name.fullName(),
                faker.name.fullName(),
            ]
        })
    }

    users = await User.create(users)

    console.log(users)
}

async function read() {
    // const users = await User.find({
    //     $or: [
    //         {
    //             gender: 'female',
    //         },
    //         {
    //             gender: 'male',
    //         }
    //     ]
    // });

    // console.log(users)
    // console.log(users.length)

    let user = await User.findById("6426f8b6ec15d52dd05c2420")

    if (user) {
        console.log(user);
    } else {
        console.log("User does not exist");
    }


    // user = await User.findOne({
    //     gender: "male",
    //     salary: {
    //         $lte: 2500
    //     }
    // })
    // console.log(user);
}

async function update() {
    let user = await User.findByIdAndUpdate("6426f8b6ec15d52dd05c2419", {
        $set: {
            friends: [
                faker.name.fullName(),
                faker.name.fullName(),
                faker.name.fullName(),
            ]
        }
    })

    console.log(user) // the value is before what is being updated

    // let user = await User.updateOne({
    //     _id: "6426f8b6ec15d52dd05c2419"
    // }, {
    //     $set: {
    //         friends: [
    //             faker.name.fullName(),
    //             faker.name.fullName(),
    //             faker.name.fullName(),
    //         ]
    //     }
    // })

    /**
     {
        acknowledged: true,
        modifiedCount: 1,
        upsertedId: null,
        upsertedCount: 0,
        matchedCount: 1
    }
     */
    
    user = await User.findById("6426f8b6ec15d52dd05c2419")
    console.log(user)

    const response = await User.updateMany({
        salary: {
            $gte: 3000,
        }
    }, {
        $set: {
            salary: 4000
        }
    })

    console.log(response)
}

async function deleteDocs() {

    // const user = await User.findByIdAndDelete("6426fb92ba41acd6cb30a19c")

    // console.log(user) // user = deleted document

    const response = await User.deleteOne({ _id: "6426fb92ba41acd6cb30a19c"})

    // console.log(response) // { acknowledged: true, deletedCount: 0 }

    // const result = await User.deleteMany({ salary: 4000 })
    // const result = await User.deleteMany({ salary: { 
    //     $gte: 4000,
    //     $in: [5000, 4500]
    // } })

}


connectDatabase()
.then(deleteDocs)