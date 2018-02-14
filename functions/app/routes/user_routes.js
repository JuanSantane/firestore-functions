const Config = require('../config')
const USERS_COLLECTION = Config.collections.users;
const UserCtrl = require('../controllers/userCtrl');
const auth = require('../middlewares/auth');

module.exports = function(app) {
    // SIGNUP AN USER.
    app.post("/auth/signup",  UserCtrl.signup);
    // SIGNIN AN USER
    // app.post('/auth/signin', userCtrl.signin);
    // GET USER BY ID
    app.get('/auth/:id', UserCtrl.getUser);   

};
