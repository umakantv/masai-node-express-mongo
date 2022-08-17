const fs = require('fs');

class Todos {
    constructor() {
        fs.readFile('./todos.json', (err, data) => {
            // if (err) {
            //     throw err;
            // }

            data = JSON.parse(data.toString())
            this.todos = data;
        })
    }

    syncTodoJson() {
        fs.writeFile('./todos.json', JSON.stringify(this.todos, null, 2), (err) => {
            console.error(err)
        });
    }

    getTodos() {
        return this.todos;
    }

    addTodo(task) {

        let max = 0;
        this.todos.forEach(todo => {
            max = Math.max(max, todo.id)
        })

        let data = {
            id: max + 1,
            task,
            createdAt: new Date()
        };

        this.todos.push(data);

        this.syncTodoJson()
    }

    deleteTodo(id) {
        
        let index = null;
        this.todos.forEach((todo, i) => {
            if (todo.id == id) {
                index = i;
            }
        })

        if (index === null) {
            throw new Error('Does not exist')
        }
        this.todos.splice(index, 1);

        this.syncTodoJson()

    }
}

module.exports = Todos;