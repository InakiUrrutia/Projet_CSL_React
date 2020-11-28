const express = require('express');
const router = express.Router();

const mongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost';

const Motive = require('../models/motives_model');

let db;

// Create a motive
async function create(new_motive){
    return await new Promise((resolve) => {
        mongoClient.connect(url, {useUnifiedTopology: true}, (err, client) => {
            db = client.db('prison_nantes');
            let new_motive_object = new Motive( new_motive.id, new_motive.name );

            let add_motive = {
                "id" : new_motive_object.getId(),
                "name" : new_motive_object.getName(),
            };

            db.collection('motives').updateOne(add_motive, {$set:add_motive}, {upsert:true}, (err, res) => {
                if(err) resolve(false);
                else resolve(true);
                client.close();
              });
        });
    });
}


// Get cases list
async function read(filters, projections){
    return await new Promise((resolve) => {
        mongoClient.connect(url, {useUnifiedTopology: true}, (err, client) => {
            db = client.db('prison_nantes');
            db.collection('motives').find(filters,projections).toArray((err, data) => {
                let motives_array = [];
                data.forEach(elt =>{
                    let new_motive = new Motive(elt.id, elt.name);
                    motives_array.push(new_motive);
                });
                resolve(data);
                client.close();
            });
        });
    });
}

async function update(one_motive, newfields){
    return await new Promise((resolve) => {
        mongoClient.connect(url, {useUnifiedTopology: true}, (err, client) => {
            db = client.db('prison_nantes');
            db.collection('motives').updateOne(one_motive, {$set:newfields}, {upsert:true}, (err, res) => {
                if(err) resolve(false);
                else resolve(true);
                client.close();
            });
        });
    })
}

async function del(one_motive){
    return await new Promise((resolve) => {
        mongoClient.connect(url, {useUnifiedTopology: true}, (err, client) => {
            db = client.db('prison_nantes');
            db.collection('motives').deleteOne(one_motive, (err, res) => {
                if(err) resolve(false);
                else resolve(true);
                client.close();
            });
        });
    });
}

// <------- Requetes Motives --------->

router.post('/create', (req, res) =>{
    create(req.body.motive.new_motive)
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
    update(req.body.motive, req.body.newfields)
    .then((out) => {
      res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
      res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE, OPTIONS');
      res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
      if(out) res.sendStatus(200);
      else res.sendStatus(400);
    })
  });
  
  router.delete('/delete', (req, res) => {
    del(req.body.motive)
    .then((out) => {
      res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
      res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE, OPTIONS');
      res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
      if(out) res.sendStatus(200);
      else res.sendStatus(400);
    })
  });

  module.exports = router;