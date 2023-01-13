
const express = require('express')
const { getAllEmployees, addEmployee, udpateEmployeeById, deleteEmployeeById } = require('../employees');

const router = express.Router();

function auth(req, res, next) {
    // this will check user is logged in
    // only call next() if the user is logged in

    console.log('In Auth Middleware')

    let userLoggedIn = true;

    if (userLoggedIn) {
        next();
    } else {
        return res.status(402).send({
            message: 'Not logged in'
        })
    }
}

function isUserOwner(req, res, next) {
    // this will check user is logged in
    // only call next() if the user is owner user

    console.log('In User access Middleware')

    let isLoggedInUserOwner = true;

    if (isLoggedInUserOwner) {
        next();
    } else {
        return res.status(402).send({
            message: 'Not authorized for this action'
        })
    }
}

// router.use(auth) // this will apply auth middleware accross all requests of router

router.get('/employees', auth, isUserOwner, async (req, res, next) => {

    console.log('getAllEmployees called!'); // 2

    try {
        const employees = await getAllEmployees();

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

    next();
})

// ANY METHOD 
router.get('/employees', (req, res, next) => {
    console.log('Inside dummy ANY /employees handler')
    next();
})

router.get('/employees', async (req, res) => {

    // log who looked at the employee list
})

router.post('/employees', auth, isUserOwner, async (req, res) => {
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

router.patch('/employee/:id', auth, async (req, res) => {
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

router.delete('/employee/:id', auth, isUserOwner, async (req, res) => {
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

function logRequest(req, res, next) {
    next();
    console.log(new Date(), req.method, req.url); // 1
}

router.use(logRequest)

module.exports = router;