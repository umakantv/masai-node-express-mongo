
# Express

Exployee Register

2xx - Everything worked as supposed
3xx - Redirection
4xx - something is wrong with the request
5xx - Internal issues

```json
{
    "name": "Abhishek Mathur",
    "designation": "Software Developer",
    "employeeId": 1,
    "department": "technology"
}
```

- GET '/employee/:id' => the json of an employee
  - Ex: GET '/employee/1' => 200
    - {
        "name": "Abhishek Mathur",
        "designation": "Software Developer",
        "employeeId": 1,
        "department": "technology"
    }
  - Ex: GET '/employee/741' => 404
    - {
        status: "error",
        error: "Not found"
    }
  - Ex: GET '/employee/invalid_employee_id' => 400
    - {
        status: "error",
        error: "Invalid Id"
    }

- POST '/employee' => Add the employee in the data store
  - Ex: POST '/employee' => 200
    - {
        "name": "Tanmay Sharma",
        "designation": "Lawyer",
        "department": "legal"
    }
    - {
        "name": "Tanmay Sharma",
        "employeeId": 2,
        "designation": "Lawyer",
        "department": "legal"
    }

- DELETE '/employee/:id' => Delete employee with the id if present 
- Ex: DELETE '/employee/1' => 200
    - {
        "name": "Abhishek Mathur",
        "designation": "Software Developer",
        "employeeId": 1,
        "department": "technology"
    }
  - Ex: GET '/employee/741' => 404
    - {
        status: "error",
        error: "Not found"
    }
  - Ex: GET '/employee/invalid_employee_id' => 400
    - {
        status: "error",
        error: "Invalid Id"
    }


- GET '/employees' => array of all employee


New ID => It should be max of the available


1, 2, 3, 4, 5

5 + 1 => 6

1, 2, 4, 5, 6

5 + 1 => 6