const _ = require('lodash');
const express = require('express');
const bodyParser = require('body-parser');
const {ObjectID} = require('mongodb');

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
            "todos_count": todos.length,
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

// HEROMORA'S VERSION
// app.get('/todos/:id', (req, res) => {
//     let id = req.params.id;

//     if (ObjectID.isValid(id)) {
//         return res.status(404).send({
//             "error": "todo not found"
//         });
//     }
//     Todo.findById(id).then((todo) => {
//         return res.status(200).send(todo);
//     })       
//     res.status(200).send({todo});

//     }).catch((e) => {
//         res.status(400).send({
//             "error": "Invalid ID",
//             "error_content": e
//         })
// });


app.get('/todos/:id', (req, res) => {
    let id = req.params.id;
    if (!ObjectID.isValid(id)) {
        return res.status(404).send();
    }
    Todo.findById(id).then((todo) => {
        if (!todo) {
            return res.status(404).send();
        }
        res.status(200).send({todo});
    }).catch((e) => {
        res.status(400).send();
    });
});

app.delete('/todos/:id', (req, res) => {
    let id = req.params.id;
    if (!ObjectID.isValid(id)) {
        return res.status(404).send();
    }
    Todo.findByIdAndDelete(id).then((todo) => {
        if (!todo) {
            return res.status(404).send();
        }
        res.status(200).send({todo});
    }).catch((e) => {
        res.status(400).send();
    });
});

app.patch('/todos/:id', (req, res) => {
    let id = req.params.id;
    let body = _.pick(req.body, ['text', 'completed']);

    if (!ObjectID.isValid(id)) {
        return res.status(404).send();
    }

    if (_.isBoolean(body.completed) && body.completed) {
        body.completedAt = new Date().getTime();
    } else {
        body.completed = false;
        body.completedAt = null;
    }

    Todo.findByIdAndUpdate(id, {
        $set: body
    }, {new: true}).then((todo) => {
        if (!todo) {
            res.status(404).send();
        }

        res.send({todo});
    }).catch((e) => {
        res.status(400).send();
    });
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
    console.log('You can access it using http://localhost:3000/');
});

module.exports = {
    app
}