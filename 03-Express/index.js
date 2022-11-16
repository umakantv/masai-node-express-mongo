import express from 'express';

const app = express();

app.use(express.json()); // hey express, use a plugin

const port = 3001;

// We define a separate function for each request handler

const persons = [];

// /hello/umakant
app.get('/hello/:person', (req, res) => {

    const name = req.params.person;

    res.send(`Hello there, ${name}`);
});

// /hello?name=Umakant Vashishtha&age=23&profile=Software Developer
app.get('/hello', (req, res) => {

    const options = req.query; // { name: "Umakant Vashishta", age: 30, profile: "Software Developer" }

    console.log(options);

    let greeting = "Hello"

    if (options.name) {
        greeting += (', ' + options.name + '\n');
    }
    if (options.age) {
        greeting += `You are ${options.age} years old.\n`
    }

    res.send(greeting);
});

app.post('/person', (req, res) => {
    
    const person = req.body;

    console.log(person)

    if (person.name && person.age && person.profile) {

        persons.push(person);
        res.send("Added");

    } else {
        // res.send("Bad Request", 400);
        res.status(400).send("Not enough information sent");
    }



})

// get
// post
// patch

app.listen(port, () => {
    console.log(`Server started at http://localhost:${port}`);
});
