const {ObjectID} = require('mongodb');

const {mongoose} = require('../server/db/mongoose');
const {Todo} = require('../server/models/todo');
const {User} = require('../server/models/user');

const userId = '5d38d67ed977dd415442e078';

// Todo.remove({}).then((result) => {
//     console.log(result);
// });

// Todo.findOneAndRemove({}).then((doc) => {
//     console.log(doc);
// });

Todo.findByIdAndRemove('5d3aeb959913aa4c8dcf8b7d').then((doc) => {
    console.log(doc);
})