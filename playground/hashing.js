const jwt = require('jsonwebtoken');

var data = {
    id: 10,
    name: 'Omar alaa'
};


var token = jwt.sign(data, '123abc');
console.log(token);
var decoded = jwt.verify(token, '123abc');
console.log(decoded);