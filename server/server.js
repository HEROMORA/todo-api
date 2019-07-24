const express = require('express');
const bodyParser = require('body-parser');

const {moongose} = require('./db/mongoose');
const {Todo} = require('./models/todo');
const {User} = require('./models/user');

var app = express();

app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.send('This is the home page');
});

app.get('/todos', (req, res) => {

    Todo.find().then((todos) => {
        res.send({
            "Todos count": todos.length,
            todos
        });
    }).catch((e) => {
        res.status(400).send(e);
    });
});

app.post('/todos', (req, res) => {
    var todo = new Todo({
        text: req.body.text
    });

    todo.save().then((doc) => {
        res.send(doc);
    }, (e) => {
        res.status(400).send(e);
    });
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
    console.log('You can access it using http://localhost:3000/');
})

module.exports = {
    app
}