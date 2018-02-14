"use strict";

const Config = require("../config");
const USER_COLLECTION = Config.collections.users;
const User = require("../shared/user");
const jwtService = require('../services/jwt.service')
const bcrypt = require('bcrypt');
const FireStore = require('../services/firestore.service');
const Condition = require('../shared/condition');

function signup(req, res) {
  const newUser = new User(req.body.name, req.body.surname, req.body.email);
  newUser.password = req.body.password;
  db.collection(USER_COLLECTION).insertOne(newUser, (err, commandResult) => {
    if (err) {
      res.status(500).send({ message: "While creating the user " + err });
      throw err;
    }
    console.log('New user created:');
    console.log(newUser);
    return res.status(200).send({ token: jwtService.createToken(newUser), user: newUser });
  });
}

// function signin(req, res) {
//   console.log('Loggin... ');
//   console.log(req.body);
//   db.collection(USER_COLLECTION)
//     .findOne({ email: req.body.email },
//     function (err, result) {
//       if (err) {
//         console.log(err);
//         return res.status(500).send({ message: 'Error looking for ' + req.body.email });
//       }
//       if (!result) {
//         console.log('User no found in MongoDb');
//         return res.status(404).send({ message: 'user no found' });
//       }
//       const user = result;

//       bcrypt.compare(req.body.password, user.password, function (err, validationResult) {
//         if (err) { return res.status(500).send({ message: 'error checking the password' }) }
//         if (!validationResult) {
//           return res.status(401).send({ message: 'invalid password' });
//         } else {
//           const basicUser = new User(user.name, user.nickname, user.email);
//           return res.status(200).send({
//             message: 'login successful',
//             user: basicUser,
//             token: jwtService.createToken(user)
//           });
//         }
//       });
//     }
//     );
// }

function getUser(req, res) {
    const userId = req.params.id;
    FireStore.getDoc(USER_COLLECTION, userId)
    .then(res => {
        return res.status(200).send(res);
    })
    .catch(error => {
        return res.status(400).send(error);
    });
}


module.exports = {
//  signin,
   signup,
   getUser
};
