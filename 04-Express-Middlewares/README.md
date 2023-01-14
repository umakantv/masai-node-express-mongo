
# Express Middlewares

Drawing Board: https://excalidraw.com/#json=nlPIuYhgGgA7eiDn6-U63,b_D64aRIycNI0mE7L1EMzg

```
Middleware: 
Button A -> Middleware 1 ->  Action A
Button B -> Middleware 1 ->  Action B
Button C -> Middleware 1 ->  Action C

Middleware 1
console.log('Button pressed')
```

```

GET /employees          -> logRequest    -> getAllEmployees
POST /employees         -> logRequest    -> addEmployee
PATCH /employee/:id     -> logRequest    -> updateEmployeeById
DELETE /employee/:id    -> logRequest    -> deleteEmployeeById


function logRequest(req, res, next) {
    console.log(new Date(), req, res)
    next();
}

app.use(logRequest)

app.use(cors())

```

## Different Types of Middlewares
* Global Middleware (When applied on app, applicable for all routes)
* Router Middleware
* Inline Middlewares

## Under the hood logic