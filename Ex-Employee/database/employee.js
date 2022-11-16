
import mongoose from 'mongoose'

const employeeSchema = new mongoose.Schema({ // Class
    name: String, 
    age: Number, 
    role: String, 
    email: String
})

const employeeModel = mongoose.model('Employee', employeeSchema, 'employees') // 'User' -> 'users'

export default employeeModel;