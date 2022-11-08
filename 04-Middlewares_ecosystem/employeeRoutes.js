
const express = require('express')

const router = express.Router()

const { addEmployee, deleteEmployee, getAllEmployees, getEmployee } = require('./employees.js')

// GET '/employee/:id'
router.get('/employee/:id', (req, res) => {

    try {

        let {id} = req.params;

        if (isNaN(parseInt(id))) {
    
            return res.status(400).send({
                status: 'error',
                error: 'Invalid Id'
            })
    
        } else {
    
            id = parseInt(id);
            const employee = getEmployee(id);
    
            if (employee) {
    
                return res.status(200).send({
                    status: 'success',
                    data: employee
                })
            } else {
                return res.status(404).send({
                    status: 'error',
                    error: 'Not found'
                })
            }
        }
    } catch(ex) {
        console.error(ex);

        return res.status(500).send({
            status: 'error',
            error: 'Internal Server Error'
        })
    }
})

// POST '/employee'
router.post('/employee', (req, res) => {

    const data = req.body;
    // Joi
    if (data.name && data.designation && data.department) {

        const employee = addEmployee(data);
        return res.status(200).send({
            staus: 'success',
            data: employee
        })

    } else {
        return res.status(400).send({
            status: 'error',
            error: 'Incomplete data'
        })
    }
})

// DELETE '/employee/:id'
router.delete('/employee/:id', (req, res) => {

    try {

        let {id} = req.params;

        if (isNaN(parseInt(id))) {
    
            return res.status(400).send({
                status: 'error',
                error: 'Invalid Id'
            })
    
        } else {
    
            id = parseInt(id);
            const employee = deleteEmployee(id);
    
            if (employee) {
    
                return res.status(200).send({
                    status: 'success',
                    data: employee
                })
            } else {
                return res.status(404).send({
                    status: 'error',
                    error: 'Not found'
                })
            }
        }
    } catch(ex) {
        console.error(ex);

        return res.status(500).send({
            status: 'error',
            error: 'Internal Server Error'
        })
    }
})


// DELETE '/employee/:id'
router.get('/employees', (req, res) => {

    const employees = getAllEmployees()

    return res.send({
        status: 'success',
        data: employees
    })
})

module.exports = router;
