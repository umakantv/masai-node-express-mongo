
const express = require('express')
const router = express.Router()

const { getAllEmployees, getEmployeeById, addEmployee, updateEmployeeDataById, deleteEmployeeById } = require('../db/employees');


// READ
router.get('/employees', async (req, res) => {

    const {
        page = 1,
        pageSize = 20,
        sortBy = 'dateOfJoining',
        sortOrder = 'desc',
        search = ''
    } = req.query

    const {total, employees} = await getAllEmployees({
        search, page, pageSize, sortBy, sortOrder
    });

    res.send({
        totalRecords: total,
        data: employees
    })

    console.log('Reponse has been sent')
})

// READ
router.get('/employee/:id', async (req, res) => {

    const id = req.params.id;

    let employee = null;
    try {
        employee = await getEmployeeById(id);
    } catch(err) {
        console.error(err.message);

        return res.status(500).send({
            message: 'Server ran into an unexpected error'
        })
    }

    if (employee) {
        return res.send({
            data: employee
        })
    } else {
        return res.status(404).send({
            message: 'Employee with given id does not exist'
        })
    }

})

// CREATE
router.post('/employee', async (req, res) => {
    const employeeData = req.body;

    let employee = null;
    try {
        employee = await addEmployee(employeeData);
    } catch(err) {
        console.error(err.message);

        return res.status(500).send({
            message: 'Server ran into an unexpected error'
        })
    }

    return res.send({
        data: employee
    });
})

// UPDATE
router.patch('/employee/:id', async (req, res) => {

    const id = req.params.id;

    const employeeData = req.body;

    let employee = null;
    try {
        employee = await updateEmployeeDataById(id, employeeData);
    } catch(err) {
        console.error(err.message);

        return res.status(500).send({
            message: 'Server ran into an unexpected error'
        })
    }

    return res.send({
        data: employee
    });
})

// DELETE
router.delete('/employee/:id', async (req, res) => {

    const id = req.params.id;

    let employee = null;
    try {
        employee = await deleteEmployeeById(id);
    } catch(err) {
        console.error(err.message);

        return res.status(500).send({
            message: 'Server ran into an unexpected error'
        })
    }

    if (employee) {
        return res.send({
            data: employee
        })
    } else {
        return res.status(404).send({
            message: 'Employee with given id does not exist'
        })
    }
})

module.exports = router;
