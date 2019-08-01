const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

let password = '123abc!';

bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(password, salt, (err, hash) => {
        console.log('hash:', hash);
    })
});

let hashedPassword = '$2a$10$vqOJ4YF2a6cJlUWYVJafrOkHr5FsqHbo4p5bwFQmmeQ/nxQCUckWK';

bcrypt.compare(password, hashedPassword, (err, res) => {
    console.log(res);
});

// var data = {
//     id: 10,
//     name: 'Omar alaa'
// };


// var token = jwt.sign(data, '123abc');
// console.log(token);
// var decoded = jwt.verify(token, '123abc');
// console.log(decoded);

