import express from 'express';
import { addEmployee, deleteEmployeeById, getAllEmployees, getEmployeeById, udpateEmployeeById } from './employees.js';

const app = express()

app.use(express.json());

app.get('/api/employees', async (req, res) => {
    try {
        const employees = await getAllEmployees()
    
        return res.send({
            data: employees
        })
    } catch(err) {
        console.error(err.message)
        return res.status(500).send({
            message: 'Something went wrong, please try again later'
        })
    }
})

app.get('/api/employees/:id', async (req, res) => {
    try {
        const id = parseInt(req.params.id)

        if (isNaN(id)) {
            return res.status(400).send({
                message: 'Not a valid id'
            })
        }

        const employee = await getEmployeeById(id)

        if (employee) {

            return res.send({
                data: employee
            })
        } else {
            return res.status(404).send({
                data: 'Employee does not exist'
            })
        }
    
    } catch(err) {
        console.error(err.message)
        return res.status(500).send({
            message: 'Something went wrong, please try again later'
        })
    }
})

app.post('/api/employees', async (req, res) => {
    try {

        let employee = req.body;

        console.log('Req body:', employee)

        employee = await addEmployee(employee)
    
        // 201 - Created
        return res.status(201).send({
            data: employee
        })
    } catch(err) {
        console.error(err.message)
        return res.status(500).send({
            message: 'Something went wrong, please try again later'
        })
    }
})

app.patch('/api/employees/:id', async (req, res) => {
    try {
        const id = parseInt(req.params.id)

        if (isNaN(id)) {
            return res.status(400).send({
                message: 'Not a valid id'
            })
        }

        const data = req.body;

        const employee = await udpateEmployeeById(id, data)

        if (employee == -1) {
            return res.status(404).send({
                data: 'Employee does not exist'
            })
        } else {
            return res.send({
                data: employee
            })
        }
    
    } catch(err) {
        console.error(err.message)
        return res.status(500).send({
            message: 'Something went wrong, please try again later'
        })
    }
})

app.delete('/api/employees/:id', async (req, res) => {
    try {
        const id = parseInt(req.params.id)

        if (isNaN(id)) {
            return res.status(400).send({
                message: 'Not a valid id'
            })
        }
        const removedEmployee = await deleteEmployeeById(id)

        if (removedEmployee == -1) {
            return res.status(404).send({
                data: 'Employee does not exist'
            })
        } else {
            return res.send({
                data: removedEmployee
            })
        }

    } catch(err) {
        console.error(err.message)
        return res.status(500).send({
            message: 'Something went wrong, please try again later'
        })
    }
})

app.listen(3002, () => {
    console.log('Server running at http://localhost:3002');
})