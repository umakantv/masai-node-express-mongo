import mongoose from "mongoose"

// Step 2. Define the Schema
const employeeSchema = new mongoose.Schema({
    name: String,
    // gender: String, // shorthand definition
    gender: {
        type: String,
        required: true,
        enum: ['Male', 'Female', 'Other']
    },
    company: String,
    department: String,
    salary: Number,
})

// Step 3. Create a model using the schema related to the collection
const employeeModel = mongoose.model('employees', employeeSchema) // employees

export default employeeModel;