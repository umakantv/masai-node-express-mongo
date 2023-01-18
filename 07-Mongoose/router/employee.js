
const express = require('express')
const { getAllEmployees, addEmployee, udpateEmployeeById, deleteEmployeeById } = require('../controller/employees');

const router = express.Router();

router.get('/employees', async (req, res) => {

    const {
        page = 1,
        pageSize = 20,
    } = req.query;

    let limit = Number(pageSize);
    let skip = Number(pageSize) * (Number(page) - 1);

    try {
        const employees = await getAllEmployees({
            skip,
            limit
        });

        res.send({
            data: employees
        })
    } catch(err) {
        console.error(err.message)

        res.status(500);

        res.send({
            message: 'Unexpected error'
        })
    }

})


router.post('/employees', async (req, res) => {
    try {
        const employee = await addEmployee(req.body);
    
        return res.send({
            data: employee
        })
    } catch(err) {
        console.error(err.message)

        return res.status(500).send({
            message: 'Unexpected error'
        })
    }
})

router.patch('/employee/:id', async (req, res) => {
    try {
        const employee = await udpateEmployeeById(req.params.id, req.body);
    
        return res.send({
            data: employee
        })
    } catch(err) {
        console.error(err)

        if (err.message === 'Employee does not exist') {
            return res.status(404).send({
                message: 'Employee does not exist'
            })    
        }

        return res.status(500).send({
            message: 'Unexpected error'
        })
    }
})

router.delete('/employee/:id', async (req, res) => {
    try {
        const employee = await deleteEmployeeById(req.params.id);
    
        return res.send({
            data: employee
        })
    } catch(err) {
        console.error(err.message)

        return res.status(500).send({
            message: 'Unexpected error'
        })
    }
})

module.exports = router;