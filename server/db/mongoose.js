const mongoose = require('mongoose');

mongoose.set('useFindAndModify', false);
mongoose.Promise = global.Promise;

const url = process.env.MONGODB_URI || 'mongodb://localhost:27017/TodoApp'
const opts = {
    useNewUrlParser: true
}

mongoose.connect(url, opts);


module.exports = {
    mongoose
};