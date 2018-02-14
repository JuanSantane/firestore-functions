const Rx = require('rxjs/Rx');
const Observable = require('rxjs/Observable').Observable;
const Subject = require('rxjs/Observable').Subject;
const FireStore = require("../services/firestore.service");
const Config = require('../config');

const Condition = require("../shared/condition");
const OBJECT_COLLECTION = Config.collections.objects;
const DEVICE_COLLECTION = Config.collections.devices;
const PARAMS_COLLECTION = Config.collections.params;


function testingRxjs(req, res) {
    FireStore.getDocById(PARAMS_COLLECTION, "kNsSkXQ5M99AfLO25fDO" )
    .subscribe(result => {
        const condition = new Condition("","","");
        console.log(condition.type);
        res.status(200).send(condition.type);
    });      
}

function getParam(req, res){
    const id = req.params.id;
    FireStore.getDocById(PARAMS_COLLECTION, id)
    .subscribe(result => {
        res.status(200).send(result);
    })
}
module.exports= {
    testingRxjs
}
