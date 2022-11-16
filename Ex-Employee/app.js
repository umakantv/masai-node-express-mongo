import express from 'express';
import Employee from './employee.js';

const app = express();
app.use(express.json());

function catchErrors(req, res, next) {
    try {
        next()
    } catch(err) {

        // console.error(err)

        console.err('Error caught')

        return res.status(500).send({
            message: 'Internal Server Error Occurred, please try again later'
        })
    }
}

app.use(catchErrors)

const employee = new Employee();

/** Get all employees */
app.get('/employees', async (req, res) => {

    const employees = await employee.getAll();

    res.send({
        data: employees
    })
})

/** Get employee by id */ 
app.get('/employee/:id', async (req, res) => {

    const { id } = req.params;
    
    const info = await employee.getById(id);

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
app.post('/employee', async (req, res) => {

    const info = req.body;

    await employee.addEmployee(info);

    res.send({
        message: "Employee has been added"
    })
});

/** Update an employee */
app.patch('/employee/:id', async (req, res) => {

    const { id } = req.params;
    const info = req.body;

    await employee.updateInfo(id, info);

    res.send({
        message: "Employee has been updated"
    })
})

/** Delete an employee */
app.delete('/employee/:id', async (req, res) => {

    const id = req.params.id;
    
    try {
        await employee.deleteEmployee(id);

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