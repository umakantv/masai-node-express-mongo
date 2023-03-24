const express = require('express')

const employeeRoutes = express.Router();

function auth(req, res, next) {

    // type of the user

    if (req.user.type !== 'admin') {
        // end the request right away
        return res.status(401).send('Unauthorized')
    }
    next();
}

function getAllEmployees(req, res) {
    return res.send({
        data: []
    })
}

function addEmployee(req, res) {
    return res.send({
        data: []
    })
}

employeeRoutes.use(auth);

employeeRoutes.get('/', getAllEmployees)
employeeRoutes.get('/:id', addEmployee) // inline middlewares
employeeRoutes.post('/', addEmployee) // inline middlewares
employeeRoutes.patch('/:id', addEmployee) // inline middlewares
employeeRoutes.delete('/:id', addEmployee) // inline middlewares

module.exports = employeeRoutes