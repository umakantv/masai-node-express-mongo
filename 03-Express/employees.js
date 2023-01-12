const fs = require('fs/promises')

async function getAllEmployees() {
    const data = await fs.readFile('./employees.json', {
        encoding: 'utf-8'
    })

    return JSON.parse(data);
}

async function updateAllEmployees(employees) {
    const data = JSON.stringify(employees, null, 4)

    await fs.writeFile('./employees.json', data, {
        encoding: 'utf-8'
    })
}

async function addEmployee(data) {
    const employees = await getAllEmployees()

    let maxId = -1;

    for(const employee of employees) {
        if (employee.id > maxId) {
            maxId = employee.id
        }
    }

    const newEmployee = {
        ...data,
        id: maxId + 1,
    }

    employees.push(newEmployee)

    await updateAllEmployees(employees);
    
    return newEmployee;
}

async function udpateEmployeeById(id, data) {
    const employees = await getAllEmployees()

    let index = -1;

    let i = 0;
    for(const employee of employees) {
        if (employee.id == id) {
            index = i;
            break;
        }
        i++;
    }

    if (index === -1) {
        // employee does not exist
        throw new Error('Employee does not exist')
    } else {
        let employee = employees[index];

        employee = {
            ...employee,
            ...data,
            id: employee.id
        }

        employees[index] = employee;

        await updateAllEmployees(employees);

        return employee;
    }
}

async function deleteEmployeeById(id) {
    const employees = await getAllEmployees()

    let index = -1;

    let i = 0;
    for(const employee of employees) {
        if (employee.id == id) {
            index = i;
            break;
        }
        i++;
    }
    if (index === -1) {
        // employee does not exist
        throw new Error('Employee does not exist')
    } else {

        const deletedEmployees = employees.splice(index, 1);

        await updateAllEmployees(employees);

        return deletedEmployees[0];
    }
}


module.exports = {
    getAllEmployees,
    addEmployee,
    udpateEmployeeById,
    deleteEmployeeById,
}