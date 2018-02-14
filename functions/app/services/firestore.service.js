// devicemanager-6f072-firebase-adminsdk-xik21-9472977b72
const admin = require("firebase-admin");
const Condition = require("../shared/condition");
const CONFIG = require("../config");
const serviceAccount = CONFIG.ServiceAccountKey
const OBJECT_COLLECTION = CONFIG.collections.objects;
const DEVICE_COLLECTION = CONFIG.collections.devices;

const Rx = require('rxjs/Rx');
const Observable = require('rxjs/Observable').Observable;
const Subject = require('rxjs/Observable').Subject;
const map = require('rxjs/operator/map').map;

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

function getDocById(dbCollection, documentId){
  const queryResult$ = new Rx.Subject();
  const resultRef = db.collection(dbCollection).doc(documentId);
  if(resultRef.get().exists){
    resultRef.onSnapshot((querySnapshot) => {    
      const data = querySnapshot.data();
      console.log(data);
      queryResult$.next(data);
    }); 
  }else{
    queryResult$.next(new Error("document doesn't exist"));
  }
  return queryResult$;
}


// Insert new document []
function insertDoc(dbCollection, document) {
  console.log("Adding a new document to <<" + dbCollection + ">> collection");
  const queryResult$ = new Rx.Subject();
  db.collection(dbCollection).add(document).then(result => {
      console.log("Document Inserted");
      const idGenerated = result._referencePath.segments[1];
      return queryResult$.next(idGenerated);
    }).catch(error => {
      queryResult$.next(error);
    });  
  return queryResult$; 
}

// Update an existing document.
function updateDoc(dbCollection, documentId, dataToUpdate) {
  console.log(" ==> actualizando un documento...");  
  const queryResult$ = new Rx.Subject();
    db.collection(dbCollection).doc(documentId)
      .update(dataToUpdate)
      .then(result => {
        return queryResult$.next(result);
      })
      .catch(error => {
        console.log(error);
        return queryResult$.next(error);
      });
  return queryResult$;
  
}

// Enter new data into the document.
function setValuesToDoc(dbCollection, documentId, dataToSet) {
  console.log("Setting new features ==> " + JSON.stringify(dataToSet));
  db
    .collection(dbCollection)
    .doc(documentId)
    .set(dataToSet)
    .then(result => {
      console.log("new data inserted");
      return result;
    })
    .catch(error => {
      console.log(error);
      return null;
    });
}

// Rad a document
function getDoc(dbCollection, documentId) {
  console.log("Getting a document");
  const queryResult$ = new Rx.Subject();
    db.collection(dbCollection).doc(documentId).get()
    .then(doc => {
      if (doc.exists) {
        docFound = doc.data();
        docFound.id = doc.id;
        console.log(docFound);
        return queryResult$.next(docFound);
      } else {
        return queryResult$.next(null);
      }
    })
    .catch(error =>  {return queryResult$.next(error)} );
  return queryResult$; 
}

// Delete  a document [DELETE]
function deleteDoc(dbCollection, documentId) {
  console.log("Deleting a document ===> " + documentId);
  const queryResult$ = new Rx.Subject();
  db.collection(dbCollection).doc(documentId).delete()
    .then(result => {
      return queryResult$.next(result);
    })
    .catch(e => queryResult$.next(e)); 
  return queryResult$;
}

// Get documents from a collection with filter and limit
function getDocs(dbCollection, conditions, limit, orderBy) {
  console.log("Searching all docs");
  const queryResult$ = new Rx.Subject();
  let queryRef = db.collection(dbCollection);
  if(conditions) {
    conditions.forEach(c => {
      console.log(c);
      queryRef =  queryRef.where(c.field1, c.operator, c.field2);
    });
  }
  if(orderBy){
    queryRef = queryRef.orderBy(orderBy);
  }
  let resultArray = [];
  queryRef.limit(limit ? limit: 20).get()
    .then(result => {
      result.forEach(item => {
        resultArray.push(item.data());
      });
      return queryResult$.next((resultArray));
    })
    .catch(error => {
      console.log("#############3 ERROR #####################");
      console.log(error);
      queryResult$.next(error);
    });
  return queryResult$;
}

// get all documents from a collections
function getAllDocs(dbCollection) {
  const queryResult$ = new Rx.Subject();
  db.collection.get().then(result => {
      result.forEach(item => {
        console.log(item);
      });
     return queryResult$.next(result);
    })
    .catch(error => {
      console.log(error);
      queryResult$.next(error);
    });
  return queryResult$;
}

// List subcollections of a document
// function getCollectionFromDoc(dbCollection, documentId, subCollection) {
//   db
//     .collection(dbCollection)
//     .doc(documentId)
//     .getCollections()
//     .then(collections => {
//       collections.forEach(collection => {
//         console.log(collection);
//       });
//       return collections;
//     })
//     .catch(error => {
//       {
//         console.log(error);
//         return null;
//       }
//     });
// }

// Listen changes on a document
// function docObserver(dbCollection, documentId) {
//   db
//     .collection(dbCollection)
//     .doc(documentId)
//     .onSnapshot(
//       doc => {
//         console.log(`Received doc snapshot: ${doc}`);
//         return doc;
//       },
//       error => {
//         console.log(`Encountered error: ${err}`);
//         return null;
//       }
//     );
// }

// Listen to multiple documents in a collection
// function docsObserver(dbCollection, condition) {
//   db
//     .collection(dbCollection)
//     .where(condition)
//     .onSnapshot(
//       querySnapshot => {
//         console.log(`Received query snapshot of size ${querySnapshot.size}`);
//         return querySnapshot;
//       },
//       err => {
//         console.log(`Encountered error: ${err}`);
//         return null;
//       }
//     );
// }

// STOP Listening changes on a document
// function docsObserverStop(dbCollection) {
//   db.collection(dbCollection).onSnapshot(() => {});
// }

module.exports = {
  getDocById,
  insertDoc,
  updateDoc,
  setValuesToDoc,
  getDoc,
  deleteDoc,
  getDocs,
  getAllDocs
  // getCollectionFromDoc,
  // docObserver,
  // docsObserver,
  // docsObserverStop
};
