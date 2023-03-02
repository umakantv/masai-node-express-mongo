
const express = require('express');
const { getUserById } = require('../controllers/auth.controllers');

const userRouter = express.Router();

userRouter.get('/:userId', async (req, res) => {
    
    try {
        const {userId} = req.params;

        const user = await getUserById(userId);

        return res.send({
            data: user
        });

    } catch(err) {
        console.error(err);

        return res.status(500).send({
            error: 'Something went wrong'
        })
    }
})

module.exports = userRouter;
