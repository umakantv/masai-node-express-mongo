
const express = require('express');
const { getUserById } = require('../controllers/user.controllers');

const userRouter = express.Router();

userRouter.get('/:userId', async (req, res) => {
    
    try {
        const {userId} = req.params;

        const user = await getUserById(userId);

        if (user) {
            return res.send({
                data: user
            });
        } else {
            return res.status(404).send({
                message: 'User not found'
            })
        }


    } catch(err) {
        console.error(err);

        return res.status(500).send({
            error: 'Something went wrong'
        })
    }
})

module.exports = userRouter;
