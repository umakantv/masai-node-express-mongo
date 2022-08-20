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
        type: locationSchema,
    },
    students: [{
        year: Number,
        number: Number,  // number of students
    }]
})

// PRE middlewares
univerisitySchema.pre('save', (next) => {

    console.log("Action 1 before saving a document")
    next(); // Run next middlware in series
})

univerisitySchema.pre('validate', (next) => {

    console.log("Action 1 before validating a document")
    next(); // Run next middlware in series

    console.log("Action 2 after calling next middleware in the chain")
})

univerisitySchema.pre('validate', (next) => {

    console.log("MW 2 before validating a document")
    next(); // Run next middlware in series
})

univerisitySchema.post('validate', () => {

    console.log("MW 1 after validating a document")
})

// We are getting a class returned
const UniverisityModel = mongoose.model('University', univerisitySchema)  // you have/want a collection named univeristies
// Student -> students

async function test() {
    // const allUniversities = await UniverisityModel.find()
    // console.log(allUniversities)


    const newUniversity = new UniverisityModel({
        name: "IIT Mandi",
        city: "Mandi",
        country: "India",
        ranking: 8,
        location: {
            type: "Point"
        },
        students: [{
            year: 2024,
            number: 2000
        }]
    })

    // let errors = newUniversity.validateSync();

    await newUniversity.save() // adds data to database, but validate the data first 

    console.log("Document saved to DB!")
}

test();