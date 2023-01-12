
const express = require('express');
const { getAllEmployees, addEmployee, udpateEmployeeById, deleteEmployeeById } = require('./employees');

const app = express();

app.use(express.json());

app.get('/employees', async (req, res) => {

    try {
        const employees = await getAllEmployees();

        return res.send({
            data: employees
        })
    } catch(err) {
        console.error(err.message)

        return res.status(500).send({
            message: 'Unexpected error'
        })
    }
})

app.post('/employees', async (req, res) => {
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


app.patch('/employee/:id', async (req, res) => {
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


app.delete('/employee/:id', async (req, res) => {
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

const port = process.argv[2] || 3035;

app.listen(port, () => {
    console.log(`Server listening to http requests on http://localhost:${port}`)
})