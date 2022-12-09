

const express = require('express');
const cors = require('cors');
const { getAllEmployees, getEmployeeById, addEmployee, updateEmployeeDataById, deleteEmployeeById } = require('./employees');

const app = express();

app.use(cors()); // to allow response in browser from other host
app.use(express.json()); // to read req body as json data

app.use(express.static('build'));

// READ
app.get('/employees', async (req, res) => {

    const employees = await getAllEmployees();

    res.send({
        data: employees
    })

    console.log('Reponse has been sent')
})

// READ
app.get('/employee/:id', async (req, res) => {

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

})

// CREATE
app.post('/employee', async (req, res) => {
    const employeeData = req.body;

    const employee = await addEmployee(employeeData);

    return res.send({
        data: employee
    });
})

// UPDATE
app.patch('/employee/:id', async (req, res) => {

    const id = req.params.id;

    const employeeData = req.body;

    const employee = await updateEmployeeDataById(Number(id), employeeData);

    return res.send({
        data: employee
    });
})

// DELETE
app.delete('/employee/:id', async (req, res) => {

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

// GET /hello
app.get('/hello', (req, res, next) => {
    res.send('Hello there')
})

// GET /
app.get('/', (req, res) => {
    res.send({
        message: 'Welcome to Fibonacci API'
    })
})


const port = Number(process.argv[2]) || 3001;

app.listen(port, () => {
    console.log(`Server listening on http://localhost:${port}`);
})