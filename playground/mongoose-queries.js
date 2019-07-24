const {ObjectID} = require('mongodb');

const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user');

const userId = '5d38d67ed977dd415442e078';

// var id = 'd38d1ffa4cee939642f824a';

// if (!ObjectID.isValid(id)) {
//     console.log('ID not valied');
// }

// Todo.find({
//     _id: id
// }).then((todos) => {
//     console.log('todos', todos);
// });

// Todo.findOne({
//     _id: id
// }).then((todo) => {
//     console.log('todo', todo);
// });

// Todo.findById(id).then((todo) => {
//     if(!todo) {
//         return console.log('id not found');
//     }
//     console.log('todo by id',todo);
// }).catch((e) => {
//     console.log(e);
// });

User.findById(userId).then((user) => {
    if(!user) {
        return console.log('user not found');
    }
    console.log(JSON.stringify(user, undefined, 2));
}).catch( (e) => {
    console.log(e);
});

