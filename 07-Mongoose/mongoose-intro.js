const mongoose = require('mongoose');

// We are connecting to the pt-web-10 database
mongoose.connect('mongodb://127.0.0.1:27017/pt-web-10');

// collections
// students
// lectures
// instructors
// assignments

// name: Student -> collection name: people (default: students)
// schema: object that is like a blueprint to your data
// collection name: students
const Student = mongoose.model('Student', {
    name: String,
    gender: String,
    shirt_size: String,
    language: String,
    age: Number,
    dateOfBirth: Date,
    friends: [String],
}, 'students')
// if the collection does not exist, it will create the collection

/**
 
Student.create // We dont have Student.insertOne
Student.insertMany

Student.find
Student.findOne
Student.findById

Student.updateOne
Student.updateMany
Student.findByIdAndUpdate

Student.deleteOne
Student.deleteMany
Student.findByIdAndDelete
*/

async function testReadAndCount() {
    const students = await Student.find().sort({
        name: 1, age: -1
    });

    console.log(students.length)

    const englishSpeakingStudentCount = await Student.countDocuments({
        language: 'English',
        gender: 'Female'
    });

    console.log(englishSpeakingStudentCount);
}

// testReadAndCount();

async function testCreate() {
    // const student = await Student.create({
    //     name: 'Vikrant',
    //     gender: 'Male',
    //     shirt_size: 'X',
    //     language: 'Hindi',
    //     age: 27,
    //     dateOfBirth: new Date('1996-01-01'),
    //     friends: ['Meghna', 'Tarun', 'Piyush']
    // }) // insertOne and insertMany

    // console.log(student)

    const students = await Student.insertMany([
        {
            name: 'Meghna',
            gender: 'Female',
            shirt_size: 'M',
            language: 'Hindi',
            age: 27,
            dateOfBirth: new Date('1996-01-01'),
            friends: ['Vikrant', 'Tarun', 'Piyush']
        },
        {
            name: 'Tarun',
            gender: 'Male',
            shirt_size: 'S',
            language: 'Hindi',
            age: 27,
            dateOfBirth: new Date('1996-01-01'),
            friends: ['Meghna', 'Tarun', 'Piyush']
        }
    ]) // insertMany

    console.log(students)
}

// testCreate()

async function testUpdate() {
    let id = "64552267415020ae5a0c7407"

    // const response = await Student.updateOne({
    //     _id: id,
    // }, {
    //     // $set: {
    //     //     language: 'Marathi',
    //     //     name: 'Tarun Shinde'
    //     // },
    //     // $push: {
    //     //     friends: 'Ankur'
    //     // },
    //     // $inc: {
    //     //     age: -4
    //     // }
    // })

    // console.log(response)

    // const response = await Student.updateMany({
    //     dateOfBirth: {
    //         $exists: false
    //     },
    // }, {
    //     $set: {
    //         dateOfBirth: new Date('2000-01-01') // set current date - age
    //     }
    // })

    const response = await Student.updateMany({
        dateOfBirth: {
            $exists: true
        },
    }, {
        $unset: {
            age: true
        },
    })
    console.log(response)
}

// testUpdate()

async function testDelete() {
    let id = "64552267415020ae5a0c7407";

    let student = await Student.findByIdAndDelete(id);

    // {
    //   _id: new ObjectId("64552267415020ae5a0c7407"),
    //   name: 'Tarun Shinde',
    //   gender: 'Male',
    //   shirt_size: 'S',
    //   language: 'Marathi',
    //   dateOfBirth: 1996-01-01T00:00:00.000Z,
    //   friends: [ 'Meghna', 'Tarun', 'Piyush', 'Ankur' ],
    //   __v: 0
    // }
    // console.log(student)

    const response = await Student.deleteMany({
        shirt_size: 'M',
        gender: {
            $not: {
                $eq: 'Female'
            }
        }
    })

    // { acknowledged: true, deletedCount: 1 }
    console.log(response)
}

// testDelete();