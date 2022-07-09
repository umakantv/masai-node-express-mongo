
const todos = [];

function getAllTodos(req, res) {
    return res.send(todos);
}

function checkTaskData(req, res, next) {
    const body = req.body;

    if (!body.task) {
        return res.status(400).send("Please provide correct data.");
    }

    next()

}

// Recovering sent data in the req
function createATodo(req, res) {
    const body = req.body;
    
    let todo = {
        id: todos.length + 1,
        content: body.task,
        timestamp: new Date(),
    }

    todos.push(todo);

    res.status(201).send("Todo has been created. Fetch todos for most recent list.")
}

function deleteTodo(req, res) {

    let id = req.params.id;

    let index = -1;
    todos.find((todo, i) => {
        if (todo.id == id) {
            index = i;
            return true;
        }
        return false;
    });

    if (index == -1) {
        return res.status(404).send("No such todo found.");
    }

    todos.splice(index, 1);

    res.status(200).send("Sure, deleted. Fetch the updated todo list.")
}

module.exports = {
    getAllTodos,
    createATodo,
    deleteTodo,
    checkTaskData,
}