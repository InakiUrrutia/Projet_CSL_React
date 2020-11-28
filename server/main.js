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

const app = express().use('*', cors());

const prisonersModule = require('../controllers/prisoners_controller');
const casesModule = require('../controllers/cases_controller');
const motivesModule= require('../controllers/motives_controller');

app.use(express.static('pages'));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/prisoners', prisonersModule);
app.use('/cases', casesModule);
app.use('/motives', motivesModule);

app.listen(port);
console.log('Server running, listening on port 8080');