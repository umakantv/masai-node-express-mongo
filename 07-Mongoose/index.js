
const express = require('express');
const { getEmployeesData, findEmployeeById, addEmployee, updateEmployeeById, deleteEmployeeById, connectDatabase } = require('./employees');
const cors = require('cors');
const { addEmployeeSchema } = require('./validators');

const app = express()

app.use(express.json()) // To read the req body as json

app.use(cors())

app.post('/employees', async (req, res) => {
    try {

        const body = req.body;

        // validate req body

        // let result = addEmployeeSchema.validate(body)

        // if (result.error) {
        //     return res.status(400).send({
        //         error: result.error.details[0].message
        //     })
        // }

        const employee = await addEmployee(body);

        return res.send({
            data: employee
        })

    } catch (err) {
        console.log(err);
        return res.status(500).send({
            error: "Something went wrong"
        })
    }
})

app.get('/employees', async (req, res) => {
    try {

        const employees = await getEmployeesData()

        return res.send({
            data: employees
        })
    } catch (err) {
        console.log(err);
        return res.status(500).send({
            error: "Something went wrong"
        })
    }
})

app.get('/employees/:id', async (req, res) => {
    try {

        const id = req.params.id

        const employee = await findEmployeeById(id)

        if (employee) {

            return res.send({
                data: employee
            })
        } else {
            return res.status(404).send({
                error: "Employee with given id does not exist"
            })
        }

    } catch (err) {
        console.log(err);
        return res.status(500).send({
            error: "Something went wrong"
        })
    }
})

app.patch('/employees/:id', async (req, res) => {
    try {

        const data = req.body;
        const id = req.params.id;

        const employee = await updateEmployeeById(id, data);

        if (employee) {

            return res.send({
                data: employee
            })
        } else {
            return res.status(404).send({
                error: "Employee with given id does not exist"
            })
        }

    } catch (err) {
        console.log(err);
        return res.status(500).send({
            error: "Something went wrong"
        })
    }
})

app.delete('/employees/:id', async (req, res) => {
    try {

        const id = req.params.id;

        const employee = await deleteEmployeeById(id);

        if (employee) {

            return res.send({
                data: employee
            })
        } else {
            return res.status(404).send({
                error: "Employee with given id does not exist"
            })
        }
    } catch (err) {
        console.log(err);
        return res.status(500).send({
            error: "Something went wrong"
        })
    }
})

const port = 3001;
connectDatabase()
.then(() => {
    app.listen(port, () => {
        console.log(`Server listening on http://localhost:${port}`)
    })
})