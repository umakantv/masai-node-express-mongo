
const {faker} = require('@faker-js/faker')
const connect = require('../db/connect')
const cryto = require('crypto')
const { Employees } = require('../db/employees')

const designations = [
    'Software Engineer',
    'Marketing Associate',
    'Sales Executive'
]

connect()
.then(async () => {
    const count = 4000;

    const employees = []

    for (let i = 0; i < count; i++) {
        const employee = {
            name: faker.name.fullName(),
            designation: designations[cryto.randomInt(0, 3)],
            dateOfBirth: faker.date.between("1960-01-01", "2003-12-30"),
            dateOfJoining: faker.date.between("2005-01-01", "2022-12-16"),
            hobbies: ['swimming'],
            password: faker.internet.password(),
            profileImage: faker.internet.avatar(),
            isMarried: Math.random() < 0.5 ? true : false,
            isVisuallyImpared: Math.random() < 0.5 ? true : false,
            phone: faker.phone.number(),
            email: faker.internet.email()
        }

        employees.push(employee);
    }

    await Employees.insertMany(employees);
    console.log('Added employees')
})