const functions = require('firebase-functions');
const firebase = require('firebase-admin');
const express = require('express');

const firebaseApp = firebase.initializeApp(
    functions.config().firebase
);

const app = express();


// Create a new item in the museum: takes a title and a path to an image.
var db = firebase.firestore();
var itemsRef = db.collection('items');
var baseID = 1;

app.post('/api/items', async (req, res) => {
    try {
        let querySnapshot = await itemsRef.get();
        let numRecords = querySnapshot.docs.length;
        let item = {
            id: baseID,
            title: req.body.title,
            path: req.body.path
        };
        baseID += 1;
        itemsRef.doc(item.id.toString()).set(item);
        res.send(item);
      } catch (error) {
        console.log(error);
        res.sendStatus(500);
      }
});

app.get('/api/items', async (req, res) => {
  try {
    let querySnapshot = await itemsRef.get();
    res.send(querySnapshot.docs.map(doc => doc.data()));
  } catch (err) {
    res.sendStatus(500);
  }
});

app.delete('/api/items/:id', async (req, res) => {
  try {
    let querySnapshot = await itemsRef.get();
    let id = parseInt(req.params.id);
    itemsRef.doc(id.toString()).delete();
  } catch (err) {
    console.log(error);
    res.sendStatus(500);
  }
});

app.put('/api/items/:id', async (req, res) => {
  try {
    let querySnapshot = await itemsRef.get();
    let id = parseInt(req.params.id);
    console.log(id.toString());
    let itemShot = await itemsRef.doc(id.toString()).get();
    let item = itemShot.data();
    console.log(req.body.title);
    console.log(item);
    let newItem = {
      id: item.id,
      title: req.body.title,
      path: item.path
    };
    console.log(newItem.id.toString());
    itemsRef.doc(id.toString()).delete();
    console.log(newItem.title.toString());
    itemsRef.doc(id.toString()).set(newItem);
    console.log('not here...');
    res.send(item);
    console.log('something is wrong');
  } catch (err) {
    res.sendStatus(500);
  }
});
exports.app = functions.https.onRequest(app);
