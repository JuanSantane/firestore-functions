'use strict'
const jwtService = require('../services/jwt.service')
const bcrypt = require('bcrypt');
const SALT_WORK_FACTOR = 10;

function validateToken(req, res, next) {
    console.log('########### Cheking the token #############');
    const token = req.headers.authorization_token;
    console.log(token);
    console.log('###########################################');
    if (!token) {
        res.status(403).send({ message: "You aren't authenticated" });
    }
    jwtService.decodeToken(token).subscribe(
        result => {
            console.log(response)
            req.userId = response;
            next();
        },
        error => {
            console.log(error);
            res.status(error.status).send({message: error.message});
        }
    );
}

// function passToHash(req, res, next) {
//     bcrypt.genSalt(SALT_WORK_FACTOR,  (err, salt) => {
//         if (err) return next(err);
//         bcrypt.hash(req.body.password, salt,  (err, hash) => {
//             if (err) return next(err);
//             req.body.password = hash;
//             return next();
//         });
//     });
// }

module.exports = { 
     validateToken, 
    // passToHash 
}