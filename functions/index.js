const App = require('./app/app');
const functions = require("firebase-functions");

require('./app/routes')(App)

// Create and Deploy Your First Cloud Functions
// https://firebase.google.com/docs/functions/write-firebase-functions

exports.deviceFn = functions.https.onRequest(App);

// exports.hi = functions.https.onRequest((req, res) => {
//     res.status(200).send("Hello from firebase");
// });