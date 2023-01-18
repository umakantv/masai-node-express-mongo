
const {faker} = require('@faker-js/faker')
const connectDatabase = require('../database/connectDatabase');
const { Employee } = require('../database/Employee');
const crypto = require('crypto');

const designations = [
    'Software Engineer',
    'Marketing Associate',
    'Sales Lead',
    'Operations Head'
]

const genders = ['male', 'female', 'other'];

async function generateFakeEmployeeData(count = 500) {

    const employees = [];

    for(let i = 0; i < count; i++) {

        const gender = genders[crypto.randomInt(0, 3)];

        const employee = {
            name: faker.name.fullName({
                gender: gender
            }),
            gender: gender,
            designation: designations[crypto.randomInt(0, 4)],
            dateOfBirth: faker.date.between('1990-01-01T00:00:00.000Z', '2004-12-01T00:00:00.000Z'),
            dateOfJoining: faker.date.between('2018-01-01T00:00:00.000Z', '2023-01-18T00:00:00.000Z'),
            hobbies: ['swimming', 'volleyball'],
            profileImage: faker.internet.avatar(),
            isMarried: crypto.randomInt(0, 2) > 0 ? true : false,
            isVisuallyImpared: crypto.randomInt(0, 10) > 8 ? true : false,
            phone: faker.phone.number('+91 ## ## ### ###'),
            email: faker.internet.email(),
            password: faker.internet.password(),
        }

        employees.push(employee);
    }

    Employee.insertMany(employees);

}


connectDatabase()
.then(() => generateFakeEmployeeData(500))
