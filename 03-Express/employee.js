
import fs from 'fs'

class Employee {

    constructor() {

        this.path = "employees.json";

        // const content = fs.readFileSync(this.path, {
        //     encoding: 'utf-8'
        // });

        fs.readFile(this.path, {
            encoding: 'utf-8',
        }, (err, content) => {
            if (err) {
                console.log(err.message)
            } else {
                this.data = JSON.parse(content);
            }
        });

    }

    saveData() {

        const content = JSON.stringify(this.data, null, 2);

        fs.writeFile(this.path, content, {
            encoding: 'utf-8'
        });
    }

    addEmployee(info) {
        // info = { name: "Umakant Vashishta", age: 30, role: "Software Developer", email: "abc@company.com" }
        
        // Create an Employee Id
        let id = 1;
        const employees = this.data.employees;

        employees.forEach(employee => {
            
            if (id <= employee.id) {
                id = employee.id + 1;
            }
        })

        info.id = id;

        employees.push(info);

        this.saveData();
    }

    getAll() {
        const employees = this.data.employees;

        return employees;
    }

    getById(id) {
        const employees = this.data.employees;

        const employee = employees.find(item => item.id === id);

        return employee;
    }

    findEmployeeIndex(id) {
        
        let index = null;
        
        const employees = this.data.employees;

        employees.find((item, idx) => {
            if (item.id === id) {
                index = idx;
            }

            return item.id === id;
        });

        return index;
    }

    updateInfo(id, updatedFields) { // 3, { email: "rohan.khurana@go.com" }
        // TODO:
        
        const index = this.findEmployeeIndex(id);

        if (index === null) {
            throw new Error('Employee does not exist');
        }

        let employee = this.data.employees[index];

        // update the properties passed in updatedFields

        employee = {
            ...employee, // existing data
            ...updatedFields, // overwrite keys with updated values
        }

        this.data.employees[index] = employee;

        this.saveData();

        return employee;

    }

    deleteEmployee(id) {
        
        let index = this.findEmployeeIndex(id);

        if (index === null) {
            throw new Error('Employee does not exist');
        }

        const employees = this.data.employees;
        employees.splice(index, 1);

        this.data.employees = employees;
        
        this.saveData();

    }
}

export default Employee;