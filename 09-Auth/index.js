
import express from 'express'
import morgan from 'morgan'
import cors from 'cors'
import authRouter from './router/auth.routes.js'
import connectDatabase from './db/connectDatabase.js'

const app = express()

app.use(cors())
app.use(morgan('dev'))
app.use(express.json())

app.use('/api/auth', authRouter)

connectDatabase()
.then(() => {
    app.listen(3002, () => {
        console.log('Server running on http://localhost:3002')
    })
})