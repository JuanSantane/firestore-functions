"use strict";

const FireStore = require("../services/firestore.service");
const Condition = require("../shared/condition");
const Config = require("../config");
const DEVICE_COLLECTION = Config.collections.devices;

// CAMBIAR EL JSON.PARSE PARA ANGULAR
function createOneDevice(req, res) {
  const newDevice = JSON.parse(req.body.device);
  FireStore.insertDoc(DEVICE_COLLECTION, newDevice).subscribe(
    result => res.status(200).send(result),
    error => res.status(400).send(error)
  );
}

function UpdateDevice(req, res) {
  const deviceId = req.params.id;
  const fieldsToUpdate = req.body.fieldsToUpdate;
  FireStore.updateDoc(DEVICE_COLLECTION, deviceId, fieldsToUpdate).subscribe(
    result => res.status(200).send(result),
    error => res.status(400).send(error)
  );
}

function deleteOneDevice(req, res) {  
  const documentId = req.params.id;
  FireStore.deleteDoc(DEVICE_COLLECTION,documentId)
  .subscribe(result => {
    res.status(200).send(result);
    error => res.status(400).send(error);
  });
}

function getAllDevices(req, res) {
  FireStore.getDocs(DEVICE_COLLECTION, null, null, null).subscribe(
    result => res.status(200).send(result),
    error => res.status(400).send({ msg: "Error al llamar la FireStore", result: error })
  );
}

function getDeviceById(req, res) {
  const deviceId = req.params.id
  FireStore.getDoc(DEVICE_COLLECTION, deviceId).subscribe(    
    result => res.status(200).send(result),    
    error => res.status(400).send(error)    
  );  
}

function validateNewDeviceName(req, res) {
  const nameToValidate = req.params.name;
  let conditions = [new Condition("name", "==", nameToValidate)];
  FireStore.getDocs(DEVICE_COLLECTION, conditions, 1, null)
  .subscribe(result => {
    console.log(result);
    res.status(200).send( {valid: (result[0] === undefined ? true : false) } );
  },
  error => {
    console.log(error);
    res.status(400).send(error);
  });
}
// function getDevicesFiltering(req, res) {}

// function getDeviceByKeyword(req, res) {

// }

module.exports = {
  createOneDevice,
  UpdateDevice,
  deleteOneDevice,
  getAllDevices,
  getDeviceById,
  validateNewDeviceName,
//   getDevicesFiltering,
//   getDeviceByKeyword
};
