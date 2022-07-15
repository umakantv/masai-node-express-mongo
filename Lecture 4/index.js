const mongoose = require('mongoose');

// make the connection

mongoose.connect("mongodb://localhost:27017/university").then((connectionResponse) => {
    console.log("Database Connection was successful...")
}).catch(() => {
    console.log("Database Connection was not successful...")
})

const locationSchema = new mongoose.Schema({
    type: String,
    coordinates: [{
        type: Number
    }]
})

// creating an instance of mongoose.Schema
const univerisitySchema = new mongoose.Schema({
    // name: String, // straight-forward of defining fields in schema
    name: { // more detailed method of defining fields
        type: String,
        required: false,
        default: "",
        validate: {
            validator: (value) => {
                // return true or false
                console.log("Validating name", value)
                if (value.length > 3) {
                    return true;
                }
                return false;
            },
            message: "Something wrong with name"
        }
    },
    city: String,
    country: String,
    location: {
        type: {
            type: String,
            required: true
        },
        coordinates: [Number]
    },
    students: {
        type: Array,
        childSchema: {
            year: Number,
            number: Number,  // number of students
        }
    }
})

univerisitySchema.pre('validate', () => {
    console.log("MW 1 before validate")
})
univerisitySchema.post('validate', () => {
    console.log("MW 2 after validate")
})

univerisitySchema.pre('save', () => {
    console.log("MW 3 before save")
})

univerisitySchema.post('save', () => {
    console.log("MW 4 after save")
})

univerisitySchema.pre('remove', () => {
    console.log("MW 5 before remove")
})
univerisitySchema.post('remove', () => {
    console.log("MW 6 after remove")
})

// We are getting a class returned
const UniverisityModel = mongoose.model('University', univerisitySchema)  // you have/want a collection named univeristies
// Student -> students

async function test() {

    const newUniversity = new UniverisityModel({
        name: "IIT Kanpur",
        city: "Kanpur",
        country: "India",
        ranking: 8,
        location: {
            type: "Point",
            coordinates: [12, 3, -54]
        },
        students: [{
            year: 2024,
            number: 2000
        }]
    })
    await newUniversity.save() // adds data to database, but validate the data first 
    await newUniversity.remove();

    // console.log("Document saved to DB!")

}

test();