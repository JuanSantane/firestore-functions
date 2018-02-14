const Config = require('../config');
const PARAMS_COLLECTION = Config.collections.params;
const FireStore = require("../services/firestore.service");
const Condition = require("../shared/condition");

function getparam(req, res) {
    const id = req.params.key;
    FireStore.getDocById(PARAMS_COLLECTION, id)
    .subscribe(result => {
        res.status(200).send(result);
        error => {
            res.status(400).send(error);
        }
        () =>{ console.log("### GET_PARAM FINISHED ###"); }
    });

    // const conditions = [ new Condition("key", "==", req.params.key) ];
    // FireStore.getDocs(PARAMS_COLLECTION,conditions, 1, null)
    // .then(result => {
    //     if(result && result[0]){
    //         return res.status(200).send(result[0]);
    //     }else{
    //         return res.status(200).send(new Error("Param not found"));
    //     }
              
    // }).catch(err =>  res.status(400).send(err));
    
}
function setParam (req, res) {

}
module.exports= {
    getparam,
    setParam
}
