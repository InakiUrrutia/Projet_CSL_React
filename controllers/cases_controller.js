const express = require('express');
const Case = require('../models/cases_model');
const router = express.Router();

const mongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost';

const Cases = require('../models/cases_model');

let db;


// Create a case
async function create(new_case){
    return await new Promise((resolve) => {
        mongoClient.connect(url, {useUnifiedTopology: true}, (err, client) => {
            db = client.db('prison_nantes');
            let new_case_object = new Cases( new_case.case, new_case.date, new_case.jur, new_case.prisoner );

            let add_case = {
                "case_name" : new_case_object.getCaseName(),
                "case_date" : new_case_object.getCaseDate(),
                "juridiction" : new_case_object.getJuridiction(),
                "prisoner_number" : new_case_object.getPrisoner()
            };

            db.collection('cases').updateOne(add_case, {$set:add_case}, {upsert:true}, (err, res) => {
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
            db.collection('cases').find(filters,projections).toArray((err, data) => {
                let cases_array = [];
                data.forEach(elt =>{
                    let new_case = new Cases(elt.case_name, elt.case_date, elt.juridiction, elt.prisoner_number);
                    cases_array.push(new_case);
                });
                resolve(data);
                client.close();
            });
        });
    });
}

async function update(one_case, newfields){
    return await new Promise((resolve) => {
        mongoClient.connect(url, {useUnifiedTopology: true}, (err, client) => {
            db = client.db('prison_nantes');
            db.collection('cases').updateOne(one_case, {$set:newfields}, {upsert:true}, (err, res) => {
                if(err) resolve(false);
                else resolve(true);
                client.close();
            });
        });
    })
}

async function del(one_case){
    return await new Promise((resolve) => {
        mongoClient.connect(url, {useUnifiedTopology: true}, (err, client) => {
            db = client.db('prison_nantes');
            db.collection('cases').deleteOne(one_case, (err, res) => {
                if(err) resolve(false);
                else resolve(true);
                client.close();
            });
        });
    });
}

// <------- Requetes Affaires --------->

router.post('/create', (req,res) => {
    create(req.body.case.new_case)
    .then((out) => {
        res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE, OPTIONS');
        res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
        if(out) res.sendStatus(200);
        else res.sendStatus(400);
    });
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
    update(req.body.case, req.body.newfields)
    .then((out) => {
        res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE, OPTIONS');
        res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
        if(out) res.sendStatus(200);
        else res.sendStatus(400);
    });
});

router.delete('/delete', (req,res) => {
    del(req.body.case)
    .then((out) => {
        res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE, OPTIONS');
        res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
        if(out) res.sendStatus(200);
        else res.sendStatus(400);
    })
});

module.exports = router;