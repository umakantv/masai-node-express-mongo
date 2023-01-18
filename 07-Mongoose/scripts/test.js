
const mongoose = require('mongoose')
const connectDatabase = require('../database/connectDatabase')

const Student = mongoose.model('Student', {
   name: String,
   dateOfBirth: String,
   gender: String,
   admissionNumber: Number,
   graduated: Boolean,
   batch: String,
   courses: [String], // ['backend', 'react']
}) // Student -> students

const Lecture = mongoose.model('Lecture', { // lectures
        
})

/**
    Student is a class that has useful functions to query DB collection - students

    Student.findById
    Student.find
    Student.findOne
    Student.create - insertOne
    Student.insertMany
    Student.updateOne
    Student.updateMany
    Student.findByIdAndUpdate
    Student.deleteOne
    Student.deleteMany
    Student.findByIdAndDelete
*/

async function test() {
    console.log('DB queries through Student Model')

    /**

    // Create a single student

    let student = await Student.create({
        name: 'Rahul Sharma',
        dateOfBirth: new Date('2001-04-05'),
        gender: 'male',
        admissionNumber: 453,
        graduated: false,
        batch: 'pt-web-8',
        courses: ['javascript', 'react', 'backend']
    })
    
    let student = await Student.findById('63c807e7b55a7b6f14fe393b');
 
    let students = await Student.find({
        name: 'Rahul Sharma',
    })
    

    await Student.updateMany({
        batch: 'pt-web-8',
    }, {
        $set: {
            courses: [ 'javascript', 'dsa', 'react', 'backend', 'full-stack' ],
        }
    })

    // Not the updated result
    let student = await Student.findByIdAndUpdate("63c807e7b55a7b6f14fe393b", {
        $set: {
            dateOfBirth: new Date('2001-05-07'),
        }
    })

    // Fetch again to get the updated object
    student = await Student.findById("63c807e7b55a7b6f14fe393b")

    console.log(student);

    */

    let result = await Student.deleteMany({
        batch: 'pt-web-8'
    });

    console.log(result)

    let students = await Student.find()

    console.log(students)
}

connectDatabase()
.then(test)
.catch((err) => {
    console.log('Error connecting to database', err.message)
})