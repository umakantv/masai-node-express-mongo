
const mongoose = require('mongoose')

// Connect to the db

async function connectDatabase() {

    try {

        await mongoose.connect('mongodb://127.0.0.1:27017/mongoose-demo');
        // await mongoose.connect('mongodb+srv://pt-web-8-b:pt-web-8-b@cluster0.zc6pidl.mongodb.net/mongoose-demo?appName=mongosh+1.6.0');
    
        console.log('Connected to database')

    } catch(err) {
        console.error('Could not connect to the database');
    }
}

/**
 * Model Name - String -> Point to a collection
 * 
 * Schema - Object -> Blueprint of the data that you want to store
 */
const User = mongoose.model('User', {
    name: String,
    gender: String,
    email: String,
    password: String,
    dateOfBirth: Date,
    verifiedEmail: Boolean,
    followersCount: Number,
})

/**
    User.create()

    User.find()
    User.findOne()
    User.findById()


    User.updateOne()
    User.updateMany()
    User.findByIdAndUpdate()

    User.findByIdAndDelete()
    User.deleteOne()
    User.deleteMany()

 */


async function create() {

    // const users = await User.create([
    //     {
    //         name: 'Varun Kumar',
    //         gender: 'male',
    //         email: 'arun.kumar@example.com',
    //         password: 'some-pass',
    //         dateOfBirth: new Date('1992-03-09'),
    //         verifiedEmail: true,
    //         followersCount: 34,
    //     },
    //     {
    //         name: 'Tarun Kumar',
    //         gender: 'male',
    //         email: 'arun.kumar@example.com',
    //         password: 'some-pass',
    //         dateOfBirth: new Date('1992-03-09'),
    //         verifiedEmail: true,
    //         followersCount: 34,
    //     }
    // ]);

    // console.log(users);

    const user = new User({
        name: 1099,
        gender: 'male',
        email: 'arun.kumar@example.com',
        followersCount: 34,
    })

    console.log(user);

    await user.save();
}

async function read() {
    const users = await User.find({
        name: {
            $lte: 'M'
        }
    })

    // console.log(users);

    // let user = await User.findById('63f7804d7cc2a')

    // console.log(user);

    let user = await User.findOne({
        $or: [
            {
                name: 'Varun Kumar',
            },
            {
                gender: 'male'
            }
        ]
    })

    console.log(user)
}

async function update() {
    let user = await User.findByIdAndUpdate('63f7804d7cc2a4d0a51e4d3c', {
        $set: {
            name: 'PQR Arora',
            gender: 'female',
            email: 'gauri.kapoor@example.com'
        }
    })

    user = await User.findById('63f7804d7cc2a4d0a51e4d3c');

    console.log(user);

    // User.updateOne
    // User.updateMany
}

async function deleteDocuments() {

    // let user = await User.findByIdAndDelete('63f7804d7cc2a4d0a51e4d3c')

    // console.log(user);

    // User.deleteOne
    let users = await User.deleteMany({
        gender: 'male'
    })

    console.log(users)
}

connectDatabase()
.then(deleteDocuments)
