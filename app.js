
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

    const user_name = req.body.user_data[0]
    const user_id = req.body.user_data[1]
    const date = req.body.user_data[2]
    const time = req.body.user_data[3]
    const weekDay = req.body.user_data[4]

    console.log("punch in app.js: " + user_name, " user id: " + user_id)
    //check if punch already exist
    Work.findOne({ id_user: user_id, day: date, punch_in: { $ne: null, $ne: "" } }).then(foundPunch => {
        if (!foundPunch) {
            try {
                const newPunch = new Work({
                    id_user: user_id,
                    name_user: user_name,
                    day: date,
                    week_day: weekDay,
                    punch_in: time,
                })
                newPunch.save().then(savedPunch => {
                    console.log('Punch saved successfully:', savedPunch);
                    //res.json({ success: true, message: 'Punch saved successfully!', punch: savedPunch });
                    res.render('pages/index')
                }).catch(saveError => {
                    console.error('Error saving punch:', saveError);
                    res.status(400).json({ success: false, message: 'Punch_in is null or empty. Not creating a new punch.' });
                });
            } catch (error) {
                console.error("Error punch in: " + error)
            }
        } else {
            console.log("Punch already exist")
            //res.json({ success: false, message: 'Punch already exists.' });
            res.redirect('/')
            return
        }
    }).catch(error => {
        console.error("Error finding list: ", error)
        //res.status(500).send("Internal Server Error..")
        //res.status(500).json({ success: false, message: 'An unexpected error occurred.', error: error });

    })
})
//break start
app.post("/break", async function (req, res) {
    console.log("break start on app.js")
    const user_name = req.body.user_data[0]
    const user_id = req.body.user_data[1]
    const date = req.body.user_data[2]
    const time = req.body.user_data[3]
    const weekDay = req.body.user_data[4]

    console.log("break start in app.js: " + user_name, " user id: " + user_id)
    //check if punch already exist
    Work.findOne({id_user: user_id, day: date, break_in: { $ne: null, $ne: "" } }).then(foundBreak =>{
        if(!foundBreak){
            try{
                const newPunch = new Work({
                    id_user: user_id,
                    name_user: user_name,
                    day: date,
                    week_day: weekDay,
                    break_in: time,
                })
                newPunch.save().then(savePunch => {
                    console.log('Punch saved successfully:', savedPunch);
                    //res.render('pages/index')
                }).catch(saveError => {
                    console.error('Error saving punch:', saveError);
                    res.status(400).json({ success: false, message: 'Start Break is null or empty. Not creating a new punch.' });
                });
            }catch (error) {
                console.error("Error punch in: " + error)
            }
        }else {
            console.log("break start Punch already exist")
            //res.redirect('/')
            return
        }
    }).catch(error => {
        console.error("Error finding list: ", error)
    })
})

//start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`)
})