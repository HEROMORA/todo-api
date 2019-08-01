const {User} = require('./../models/user');

let authenticate = (req, res, next) => {
    let token = req.header('x-auth');

    User.findByToken(token).then((user) => {
        if (!user) {
            // SO IT WILL SHIFT TO THE ONREJECT CASE BELOW
            return Promise.reject();
        }

        // WE ARE MODIFYING THE REQUEST COMMING TO THE ROUTE
        req.user = user;
        req.token = token;
        next();
    }).catch((e) => {
        res.status(401).send();
    });
};

module.exports = {authenticate};