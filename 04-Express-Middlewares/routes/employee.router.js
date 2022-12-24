
const express = require('express')
const { 
    getAllEmployees,
    getEmployeeById,
    addEmployee,
    updateEmployeeDataById,
    deleteEmployeeById
} = require('../employees');
const router = express.Router();


function routerMiddleware(req, res, next) {
    console.log('Employee routes')

    next();
}

router.use(routerMiddleware)

// READ
router.get('/employees', async (req, res, next) => {

    const employees = await getAllEmployees();

    // next();

    res.send({
        data: employees
    })
})

// READ
router.get('/employee/:id', async (req, res, next) => {

    const id = req.params.id;

    const employee = await getEmployeeById(Number(id));

    if (employee) {
        return res.send({
            data: employee
        })
    } else {
        return res.status(404).send({
            message: 'Employee with given id does not exist'
        })
    }

    next();

})

// CREATE
router.post('/employee', async (req, res) => {

    const employeeData = req.body;

    const employee = await addEmployee(employeeData);

    return res.send({
        data: employee
    });
})

// UPDATE
router.patch('/employee/:id', async (req, res) => {

    const id = req.params.id;

    const employeeData = req.body;

    const employee = await updateEmployeeDataById(Number(id), employeeData);

    return res.send({
        data: employee
    });
})

// DELETE
router.delete('/employee/:id', async (req, res) => {

    const id = req.params.id;

    const employee = await deleteEmployeeById(Number(id));

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

module.exports = {
    router
}
