
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
mongoose.connect("mongodb://localhost:27017/workJamy", { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('Connected to MongoDB.')
    }).catch(error => {
        console.log('Error connecting to MongoDB: ', error);
    })
//const Work = require('./model/Work');
import Work from './model/Work.js'
//import './public/js/punch.js'

//create new work_day
const workDay = new Work({
    _id: 100001,
    name_user: 'Priscila',
    day: 26 - 12 - 2023,
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
app.use(bodyParser.urlencoded({ extended: true }));

//Server Static File
app.use(express.static('public'));
app.use(express.json());
app.use('/model', express.static('model'));

//Define routes -> redirect to home page when open website
app.get('/', function (req, res) {
    res.render('pages/index');
})
app.get('/punch', function (req, res) {
    res.render('pages/punch');
})

//add clock-in
//import {punch} from './public/js/script.js'
app.post("/punch", async function (req, res) {

    const currentDay = new Date()
    const dayOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
    const weekDay = dayOfWeek[currentDay.getDay()]
    const hour = `${currentDay.getHours()}:${currentDay.getMinutes()}`


    try {
        const newPunch = await new Work({
            id_user: user_id,
            name_user: user_name,
            day: currentDay,
            week_day: weekDay,
            punch_in: hour,
            punch_out: '18:50',
            break_in: '12:00',
            break_out: '12:30',
        })
        await newPunch.save()
        //res.json({ success: true, message: 'Punch saved successfully!' })
        console.log("punch in add successfully")
    } catch (error) {
        console.error('Error saving punch:', error);
        res.status(500).json({ success: false, message: 'Error saving punch.' });
    }
})

//start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`)
})