const deviceCtrl = require('../controllers/deviceCtrl');
const Auth = require('../middlewares/auth');

module.exports = function(app) {
  // CREATE A NEW DOCUMENT.
 app.post("/devices/new/", deviceCtrl.createOneDevice);

//   // UPDATE AN EXISTING DOCUMENT.
//  app.put("/devices/:id", deviceCtrl.UpdateDevice);

   // DELETE A DOCUMENT.
   app.delete("/devices/:id", deviceCtrl.deleteOneDevice);

//   // READ ALL DOCUMENTS.
   app.get("/devices", Auth.validateToken, deviceCtrl.getAllDevices);

//   // GET A DEVICE THAT MATCH WITH ID PARAM.
   app.get("/devices/:id", deviceCtrl.getDeviceById);

//   // GET DEVICE THAT MACTH WITH NAME, TYPE PARAMS.
//   app.get("/devices/filtersby/", deviceCtrl.getDevicesFiltering);

  // VALIDATE IF A NAME IS AVAILABLE TO SET TO NEW DEVICE
  app.get("/devices/validateDeviceName/:name", deviceCtrl.validateNewDeviceName);

//   // GET DEVICE BY KEYWORD
//   app.get("/devices/keyword/:keyword", deviceCtrl.getDeviceByKeyword);

 };
