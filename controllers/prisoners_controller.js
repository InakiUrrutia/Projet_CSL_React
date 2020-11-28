const express = require('express');
const router = express.Router();

const mongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost';

const Prisoner = require('../models/prisoners_model');

let db;

async function getNumber(){
  return await new Promise((resolve) => {
    mongoClient.connect(url, {useUnifiedTopology: true}, (err, client) => {
      db = client.db('prison_nantes');

      db.collection('prisoners').find().sort({"num":-1}).limit(1).toArray( (err, data) => {
        console.log(data);
        let number;
        if(data[0] == undefined){
          number = 1;
        }
        else number = data[0].num + 1;
        //console.log('num = ' + number);
        resolve(number);
        client.close();
      });
    });
  });
}


// Create a prisoner
async function create(prisoner){

  let num = 0;

  return await new Promise((resolve) => {
    
    getNumber().then((number) =>{
      num = number;
      mongoClient.connect(url, {useUnifiedTopology: true}, (err, client) => {
        db = client.db('prison_nantes');
  
        let new_prisoner_object = new Prisoner(num, prisoner.firstname, prisoner.lastname, prisoner.date_naiss, prisoner.lieu_naiss, prisoner.motive, prisoner.date_dec, prisoner.duree_dec);

        let new_prisoner = {
          "num" : new_prisoner_object.getNum(),
          "lastname" : new_prisoner_object.getLastName(),
          "firstname" : new_prisoner_object.getFirstName(),
          "date_naiss" : new_prisoner_object.getDateNaiss(),
          "lieu_naiss" : new_prisoner_object.getLieuNaiss(),
          "motive" : new_prisoner_object.getMotive(),
          "date_dec" : new_prisoner_object.getDateDec(),
          "duree_dec" : new_prisoner_object.getDureeDec(),
        };
  
        //console.log(new_prisoner);

        db.collection('prisoners').updateOne(new_prisoner, {$set:new_prisoner}, {upsert:true}, (err, res) => {
          if(err) resolve(false);
          else resolve(true);
          client.close();
        });
      });
    })   
  });
}

// Get prisoners list
async function read(filters,projections){
  return await new Promise((resolve) => {
    mongoClient.connect(url, {useUnifiedTopology: true}, (err, client) => {
      db = client.db('prison_nantes');
      db.collection('prisoners').find(filters,projections).toArray((err, data) => {
        let prisoners_array = [];
        data.forEach(elt =>{
          let new_prisoner = new Prisoner(elt.num, elt.firstname, elt.lastname, elt.date_naiss, elt.lieu_naiss);
          prisoners_array.push(new_prisoner);
        });
        resolve(data);
        client.close();
      });
    });
  });
}

// Update a prisoner
async function update(prisoner, newfields){
  return await new Promise((resolve) => {
    mongoClient.connect(url, {useUnifiedTopology: true}, (err, client) => {
      db = client.db('prison_nantes');
      db.collection('prisoners').updateOne({num: prisoner.num}, {$set:newfields}, {upsert:true}, (err, res) => {
        if(err) resolve(false);
        else resolve(true);
        client.close();
      });
    });
  });
}

// Delete a prisoner
async function del(prisoner){
  return await new Promise((resolve) => {
    mongoClient.connect(url, {useUnifiedTopology: true}, (err, client) => {
      db = client.db('prison_nantes');
      db.collection('prisoners').deleteOne(prisoner, (err, res) => {
        if(err) {console.log('No document deleted'); resolve(false);}
        else {console.log('1 document deleted'); resolve(true)};
        client.close();
      });
    });
  });
}

// <------- Requetes Prisonniers --------->

router.post('/create', (req, res) =>{
  create(req.body.prisoner.new_prisoner)
  .then((out) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    if(out) res.sendStatus(200);
    else res.sendStatus(400);
  })
});

router.get('/read', (req,res) => {
  read({},{_id : 0})
  .then((data) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.status(200).json({'result': data});
  });
});

router.put('/update', (req,res) => {
  update(req.body.prisoner, req.body.newfields)
  .then((out) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    if(out) res.sendStatus(200);
    else res.sendStatus(400);
  })
});

router.delete('/delete', (req, res) => {
  del(req.body.prisoner)
  .then((out) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    if(out) res.sendStatus(200);
    else res.sendStatus(400);
  })
});

module.exports = router;
