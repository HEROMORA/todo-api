const mongoose = require('mongoose');

mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.Promise = global.Promise;

const url = process.env.MONGODB_URI;
const opts = {
    useNewUrlParser: true
};

mongoose.connect(url, opts);

module.exports = {
    mongoose
};