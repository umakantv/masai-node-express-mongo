
import connectDatabbase from './database/index.js';
import employeeModel from './database/employee.js';

class Employee {

    constructor() {
        connectDatabbase()
        .catch((err) => {
            console.log(err.message);
        })
    }

    async addEmployee(info) {
        // info = { name: "Umakant Vashishta", age: 30, role: "Software Developer", email: "abc@company.com" }
        
        // Create an Employee Id
        await employeeModel.create(info);
    }

    async getAll() {
        
        return employeeModel.find();
    }

    async getById(id) {
        
        return employeeModel.findById(id);
    }

    async updateInfo(id, updatedFields) {

        return employeeModel.findByIdAndUpdate(id, updatedFields);
    }

    async deleteEmployee(id) {
        return employeeModel.findByIdAndDelete(id);
    }
}

export default Employee;