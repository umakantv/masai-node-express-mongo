
const express = require('express');
const { register, login } = require('../controllers/auth.controllers');
const authMiddleware = require('../middlewares/auth');


const authRouter = express.Router();

authRouter.post('/register', async (req, res) => {

    try {
        const {
            name, email, 
            password
        } = req.body;
    
        const user = await register(name, email, password);

        return res.send({
            message: 'Registeration successful, please login',
            data: user
        })

    } catch(err) {
        console.error(err);

        return res.status(500).send({
            error: 'Something went wrong'
        })
    }
})

authRouter.post('/login', async (req, res) => {
    
    try {
        const {
            email, password
        } = req.body;
    
        const data = await login(email, password);

        return res.send({
            message: 'Login successful',
            data
        })

    } catch(err) {
        console.error(err);

        return res.status(500).send({
            error: 'Something went wrong'
        })
    }
})

authRouter.get('/loggedInUser', authMiddleware, async (req, res) => {
    try {

        const {loggedInUser} = req;

        return res.send({
            data: loggedInUser
        })

    } catch(err) {
        console.error(err);

        return res.status(500).send({
            error: 'Something went wrong'
        })
    }

})

module.exports = authRouter;