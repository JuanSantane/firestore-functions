const paramsCtrl = require('../controllers/paramsCtrl');
const AuthValidator = require('../middlewares/auth');
const RxjsCtrl = require('../controllers/paramsRxjs');


module.exports = function(app) {
    // time = new Date().getTime();
    
    // GET A PARAM THAT MATCH WITH KEY PARAM.
    app.get("/params/:key", paramsCtrl.getparam );

    app.get("/params", RxjsCtrl.testingRxjs);
  };