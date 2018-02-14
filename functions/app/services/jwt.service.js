"use strict";
const jwt = require("jwt-simple");
const moment = require("moment");
const config = require('../config');
const SECRET_KEY = config.jwtSecretKey;
const Rx = require('rxjs/Rx');

function createToken(user) {
  const payload = {
    uid: user.id,
    iat: moment().unix(), // token creation date
    exp: moment().add(5, "minutes").unix() // token expiration time
  };

  const tokenEncoded = jwt.encode(payload, SECRET_KEY);
  return tokenEncoded;
}

function decodeToken(token) {
  const decodeResult$ = new Rx.Subject();  
    try {
      const payload = jwt.decode(token, config.jwtSecretKey)
      if (payload.exp < moment().unix() ) {
        console.log('el token ha experidado -.-');
        decodeResult$.next(new Error({status: 401, message: "The token has expired"}));
      }
      decodeResult$.next(payload.uid);
    }
    catch (err) {
      decodeResult$.next(new Error({ status: 406, message: "invalid token"}));
    }
    return decodeResult$;
}  
module.exports= { 
    createToken,
    decodeToken 
}
