import express from 'express';
import Employee from './employee.js';

const app = express();
app.use(express.json());

const employee = new Employee('employees.json');

/** Get all employees */
app.get('/employees', (req, res) => {

    const employees = employee.getAll();

    res.send({
        data: employees
    })
})

/** Get employee by id */ 
app.get('/employee/:id', (req, res) => {

    const id = parseInt(req.params.id);
    
    const info = employee.getById(id);

    if (info) {
        return res.send({
            data: info
        })
    } else {
        return res.status(404).send({
            message: "Employee does not exist."
        })
    }

})

/** Create an employee */
app.post('/employee', (req, res) => {

    const info = req.body;

    employee.addEmployee(info);

    res.send({
        message: "Employee has been added"
    })
});

/** Update an employee */
app.patch('/employee/:id', (req, res) => {
    // TODO:
})

/** Delete an employee */
app.delete('/employee/:id', (req, res) => {

    const id = parseInt(req.params.id);
    
    try {
        employee.deleteEmployee(id);

        return res.send({
            message: "Employee has been deleted"
        })

    } catch(ex) {

        res.status(500).send({
            message: ex.message
        })
    }

})

app.listen(3001, () => {
    console.log('Server is listening on http://localhost:3001')
});