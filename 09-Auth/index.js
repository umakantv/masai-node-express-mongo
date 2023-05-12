import './config.js'

import express from 'express'
import morgan from 'morgan'
import cors from 'cors'

import authRouter from './router/auth.routes.js'
import connectDatabase from './db/connectDatabase.js'
import postRouter from './router/post.routes.js'
import commentRouter from './router/comment.routes.js'

const app = express()

app.use(express.static('public'))
app.use(cors())
app.use(morgan('dev'))
app.use(express.json())

app.use('/api/auth', authRouter)
app.use('/api/posts', postRouter)
app.use('/api/comments', commentRouter)

connectDatabase()
.then(() => {
    app.listen(3002, () => {
        console.log('Server running on http://localhost:3002')
    })
})