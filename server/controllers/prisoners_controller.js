const express = require('express');
const router = express.Router();

const mongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost';

const Prisoner = require('../models/prisoners_model');

let db;

// Fonction Create
async function create(prisoner){
  return await new Promise((resolve) => {
    mongoClient.connect(url, {useUnifiedTopology: true}, (err, client) => {
      db = client.db('prison_nantes');
      db.collection('prisoners').updateOne(prisoner, {$set:prisoner}, {upsert:true}, (err, res) => {
        if(err) resolve(false);
        else resolve(true);
        client.close();
      });
    });
  });
}

// Fonction Read
async function read(filters,projections){
  return await new Promise((resolve) => {
    mongoClient.connect(url, {useUnifiedTopology: true}, (err, client) => {
      db = client.db('prison_nantes');
      db.collection('prisoners').find(filters,projections).toArray((err, data) => {
        let prisoners_array = [];
        data.forEach(elt =>{
          let new_prisoner = new Prisoner(elt.name);
          prisoners_array.push(new_prisoner);
        });
        console.log(prisoners_array);
        resolve(data);
        client.close();
      });
    });
  });
}

// Fonction Update
async function update(prisoner, newfields){
  return await new Promise((resolve) => {
    mongoClient.connect(url, {useUnifiedTopology: true}, (err, client) => {
      db = client.db('prison_nantes');
      db.collection('prisoners').updateOne(prisoner, {$set:newfields}, {upsert:true}, (err, res) => {
        if(err) resolve(false);
        else resolve(true);
        client.close();
      });
    });
  });
}

// Fonction Delete
async function del(prisoner){
  return await new Promise((resolve) => {
    mongoClient.connect(url, {useUnifiedTopology: true}, (err, client) => {
      db = client.db('prison_nantes');
      db.collection('prisoners').deleteOne(prisoner, (err, res) => {
        if(err) resolve(false);
        else resolve(true);
        client.close();
      });
    });
  });
}

// <------- Requetes Prisonniers --------->

router.post('/create', (req, res) =>{
  create(req.body)
  .then((out) => {
    if(out) res.sendStatus(200);
    else res.sendStatus(400);
  })
});

router.get('/read', (req,res) => {
  read({},{projection:{_id: 0 }})
  .then((data) => {
    res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.status(200).json({'result': data});
  });
});

router.put('/update', (req,res) => {
  update(req.body.prisoner, req.body.newfields)
  .then((out) => {
    if(out) res.sendStatus(200);
    else res.sendStatus(400);
  })
});

router.delete('/delete', (req, res) => {
  del(req.body)
  .then((out) => {
    if(out) res.sendStatus(200);
    else res.sendStatus(400);
  })
});

module.exports = router;
