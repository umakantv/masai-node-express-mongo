const express = require('express')
const handlers = require('./todo');

const app = express();

app.use(express.json());

app.get('/todos', handlers.getAllTodos);
app.post('/todo', handlers.checkTaskData, handlers.createATodo);
app.delete('/todo/:id', handlers.deleteTodo);

app.all('/*', (req, res) => {
    res.send("Welcome to todo API.")
})

app.listen(3001, () => {
    console.log("Server started listening on http://localhost:3001");
})