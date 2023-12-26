
/*---------------import---------------*/
//const express = require('express');
import express from 'express';
const app = express();
//const bodyParser = require('body-parser');
import bodyParser from 'body-parser';
/*-------------------------------------*/

/* -------------Mongo DB------------*/
//const mongoose = require('mongoose');
import mongoose from 'mongoose';
mongoose.connect("mongodb://localhost:27017/workJamy", {useNewUrlParser: true, useUnifiedTopology: true});
//const Work = require('./model/Work');
import Work from './model/Work.js'

//create new work_day
const workDay = new Work({
    _id: 100001,
    name_user: 'Priscila',
    day: 26-12-2023,
    week_day: "Tuesday",
    punch_in: '09:50',
    punch_out: '18:50',
    break_in: '12:00',
    break_out: '12:30',
})
//await workDay.save()
/*-------------------------------------*/

/*---------------ROOT---------------*/
app.set('views', './views');
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended:true}));

//Server Static File
app.use(express.static('public'));
app.use(express.json());

//Define routes -> redirect to home page when open website
app.get('/', function (req, res) {
    res.render('pages/index');
})
app.get('/punch', function (req, res) {
    res.render('pages/punch');
})

//start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`)
})