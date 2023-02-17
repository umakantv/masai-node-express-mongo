
const express = require('express')

const router = express.Router()

const {
    getAllEmployees,
    addEmployee,
    updateEmployee,
    removeEmployee
} = require('../employees')

function employeeRouterMiddleware(req, res, next) {
    console.log('Inside Employee Router Middleware');

    next();
}

function specificMiddlewares(req, res, next) {

    console.log('Applied only on specific requests')
    next();
}

router.use(employeeRouterMiddleware);

router.get('/all', specificMiddlewares, specificMiddlewares, specificMiddlewares, async (req, res) => {

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

router.post('/', async (req, res) => {

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

router.patch('/:id', async (req, res) => {
    
    try {

        const id = parseInt(req.params.id);
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

router.delete('/:id', async (req, res) => {
    
    try {

        const id = parseInt(req.params.id);

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

module.exports = router;