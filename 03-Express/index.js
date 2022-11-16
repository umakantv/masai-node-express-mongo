
import cors from 'cors'
import express from 'express'
import { addEmployee, deleteEmployee, getAllEmployees, getEmployee } from './employees.js'

const app = express()

// This will instruct express that all req.body should be parsed as json
app.use(express.json())

// cors issue in browser when implmenting with react
app.use(cors())

// Register any request handlers
// GET /
app.get('/', (req, res) => {
    res.send({
        status: 'error',
        data: 'Welcome to Employee Registeration System API'
    })
})

// GET '/employee/:id'
app.get('/employee/:id', (req, res) => {

    try {

        let {id} = req.params;

        if (isNaN(parseInt(id))) {
    
            return res.status(400).send({
                status: 'error',
                error: 'Invalid Id'
            })
    
        } else {
    
            id = parseInt(id);
            const employee = getEmployee(id);
    
            if (employee) {
    
                return res.status(200).send({
                    status: 'success',
                    data: employee
                })
            } else {
                return res.status(404).send({
                    status: 'error',
                    error: 'Not found'
                })
            }
        }
    } catch(ex) {
        console.error(ex);

        return res.status(500).send({
            status: 'error',
            error: 'Internal Server Error'
        })
    }
})

// POST '/employee'
app.post('/employee', (req, res) => {

    const data = req.body;
    // Joi
    if (data.name && data.designation && data.department) {

        const employee = addEmployee(data);
        return res.status(200).send({
            staus: 'success',
            data: employee
        })

    } else {
        return res.status(400).send({
            status: 'error',
            error: 'Incomplete data'
        })
    }
})

// DELETE '/employee/:id'
app.delete('/employee/:id', (req, res) => {

    try {

        let {id} = req.params;

        if (isNaN(parseInt(id))) {
    
            return res.status(400).send({
                status: 'error',
                error: 'Invalid Id'
            })
    
        } else {
    
            id = parseInt(id);
            const employee = deleteEmployee(id);
    
            if (employee) {
    
                return res.status(200).send({
                    status: 'success',
                    data: employee
                })
            } else {
                return res.status(404).send({
                    status: 'error',
                    error: 'Not found'
                })
            }
        }
    } catch(ex) {
        console.error(ex);

        return res.status(500).send({
            status: 'error',
            error: 'Internal Server Error'
        })
    }
})


// DELETE '/employee/:id'
app.get('/employees', (req, res) => {

    const employees = getAllEmployees()

    return res.send({
        status: 'success',
        data: employees
    })
})


async function wait(seconds) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve();
        }, seconds * 1000);
    })
}

/**
 * Question:
 * 
 * If we make two requests as follows exactly one after another without any delay at T0
 * http://localhost:3050/wait?seconds=10
 * http://localhost:3050/wait?seconds=5
 * 
 * 1. The first request ends at T0+10 seconds, Second at T0+15 seconds
 * 2. The first request ends at T0+10 seconds, Second at T0+5 seconds
 * 
 */
app.get('/wait', async (req, res) => {
    await wait(req.query.seconds);
    res.send('Done')
})


app.listen(3050, () => {
    console.log('http://localhost:3050');
})
