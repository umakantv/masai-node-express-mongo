
import fs from 'fs/promises'

const DATA_FILE = './employees.json'

export async function getAllEmployees() {
    let content = await fs.readFile(DATA_FILE, { encoding: 'utf-8'})

    let employees = JSON.parse(content);

    return employees;
}

export async function updateAllEmployees(employees) {
    let data = JSON.stringify(employees, null, 2);
    await fs.writeFile(DATA_FILE, data)
}

export async function getEmployeeById(id) {
    let employees = await getAllEmployees()

    let employee = employees.find(employee => employee.id == id)

    return employee;
}

export async function addEmployee(employee) {

    let employees = await getAllEmployees()

    let maxId = 0;

    employees.forEach(employee => {
        if (employee.id > maxId) {
            maxId = employee.id;
        }
    })

    employee.id = maxId + 1;

    employees.push(employee);

    await updateAllEmployees(employees)

    return employee;
}

export async function udpateEmployeeById(id, data) {
    let index = -1;

    let employees = await getAllEmployees()

    let idx = 0;
    for (const employee of employees) {

        if (employee.id == id) {
            index = idx;
            break;
        }
        idx++;
    }

    if (index == -1) {
        return -1;
    }

    let employee = employees[index];

    employee = {
        ...employee,
        ...data,

        id,
    }

    employees[index] = employee;

    await updateAllEmployees(employees);

    return employee;
}

export async function deleteEmployeeById(id) {
    let index = -1;

    let employees = await getAllEmployees()

    let idx = 0;
    for (const employee of employees) {

        if (employee.id == id) {
            index = idx;
            break;
        }
        idx++;
    }

    if (index == -1) {
        return -1;
    }

    let removedEmployee = employees.splice(index, 1);

    await updateAllEmployees(employees);

    return removedEmployee;
}