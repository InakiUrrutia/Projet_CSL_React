/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

const express = require('express');
const path = require('path');
const port = process.env['PORT'] || 8080;
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

const prisonersModule = require('./controllers/prisoners_controller');

app.use(express.static('pages'));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


app.use('/prisoners', prisonersModule);
app.use(cors());

app.listen(port);
console.log('Server running, listening on port 8080');
/*
app.get('/accueil', (req, res) => {
    res.sendFile(path.join(__dirname + '/pages/index.html'));
});

app.get('/prisoniers', (req, res) => {
    res.sendFile(path.join(__dirname + '/pages/prisoniers.html'));
});

app.get('/affaires', (req, res) => {
    res.sendFile(path.join(__dirname + '/pages/affaires.html'));
});*/