
const express = require('express');
const connectDatabase = require('./db/connectDatabase');

const cors = require('cors')

const {
    getAllEmployees,
    addEmployee,
    updateEmployee,
    removeEmployee
} = require('./employees')

const app = express();

app.use(cors());

app.use(express.json());

app.get('/employee/all', async (req, res) => {

    try {

        const employees = await getAllEmployees();
    
        res.send({
            data: employees
        })

    } catch(err) {
        console.log(err.message)
        res.status(500).send({
            error: 'Something went wrong'
        })
    }

})

app.post('/employee', async (req, res) => {

    try {

        const data = req.body;

        let employee = await addEmployee(data);

        res.send({
            data: employee
        })

    } catch(err) {

        console.log(err.message)
        res.status(500).send({
            error: 'Something went wrong'
        })
    }
})

app.patch('/employee/:id', async (req, res) => {
    
    try {

        const id = req.params.id;
        const data = req.body;

        let employee = await updateEmployee(id, data);

        if (employee === -1) {
            return res.status(404).send({
                error: 'Employee with the given id does not exist'
            })
        }

        res.send({
            data: employee
        })

    } catch(err) {

        console.log(err.message)
        res.status(500).send({
            error: 'Something went wrong'
        })
    }
})

app.delete('/employee/:id', async (req, res) => {
    
    try {

        const id = req.params.id;

        let removedEmployee = await removeEmployee(id);

        if (removedEmployee === -1) {
            return res.status(404).send({
                error: 'Employee with the given id does not exist'
            })
        }

        res.send({
            data: removedEmployee
        })
    } catch(err) {

        console.log(err.message)
        res.status(500).send({
            error: 'Something went wrong'
        })
    }
})


connectDatabase()
.then(() => {
    app.listen(3000, () => {
        console.log('Server listening on http://localhost:3000')
    })
})