const express = require('express')
const app = express();
const Todos = require('./todos');

app.use(express.json());

const todos = new Todos();


app.get('/todos', (req, res) => {
   return res.send({
        todos: todos.getTodos()
   })
})

app.post('/todo', (req, res) => {
    try {
        const {todo} = req.body
    
        const {task} = todo;
    
        todos.addTodo(task);

        return res.send('Todo has been added. Fetch all todos to refresh the list.')
    } catch(ex) {
        console.error(ex)
        return res.status(500).send('Internal Server Error');
    }
})


app.delete('/todo/:id', (req, res) => {
    let {id} = req.params;

    id = parseInt(id);

    try {
        todos.deleteTodo(id);
    } catch(ex) {
        return res.status(404).send('The todo does not exist.')
    }

    return res.send('Deleted! Refetch todos')
})

const PORT = 3020;
app.listen(3020, () => {
    console.log(`Server started at http://localhost:${PORT}`)
})