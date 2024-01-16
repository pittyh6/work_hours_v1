
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
    /*Work.findOne({ id_user: user_id, day: date, punch_in: { $ne: null, $ne: "" } }).then(foundPunch => {
        if (!foundPunch) {
            try {
                const newPunch = new Work({
                    id_user: user_id,
                    name_user: user_name,
                    day: date,
                    week_day: weekDay,
                    punch_in: time,
                    punch_out: "",
                    break_in: "",
                    break_out: "",
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

    })*/
    Work.findOne({ id_user: user_id, day: date, punch_in: { $ne: null, $ne: "" } }).then(foundPunch => {
        Work.findOne({
            id_user: user_id, day: date, $or: [
                { punch_out: { $exists: true, $in: [null, ""] } },
                { break_in: { $exists: true, $in: [null, ""] } },
                { break_out: { $exists: true, $in: [null, ""] } },
            ]
        }).then(otherPunch => {
            if (!otherPunch) {
                try {
                    const newPunch = new Work({
                        id_user: user_id,
                        name_user: user_name,
                        day: date,
                        week_day: weekDay,
                        punch_in: time,
                        punch_out: "",
                        break_in: "",
                        break_out: "",
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
                console.log("You are not allow to Punch_in. Another punch already exist")
                //res.json({ success: false, message: 'Punch already exists.' });
                res.redirect('/')
                return
            }
        })

    }).catch(error => {
        console.error("Error finding list: ", error)
        //res.status(500).send("Internal Server Error..")
        //res.status(500).json({ success: false, message: 'An unexpected error occurred.', error: error });

    })

})
//break start
app.post("/break", async function (req, res) {
    const user_name = req.body.user_data[0]
    const user_id = req.body.user_data[1]
    const date = req.body.user_data[2]
    const time = req.body.user_data[3]
    const weekDay = req.body.user_data[4]

    console.log("break start in app.js: " + user_name, " user id: " + user_id)
    //check if punch already exist
    Work.findOne({ id_user: user_id, day: date, break_in: { $in: [null, ""] }, break_out: { $in: [null, ""] } }).then(foundBreak => {
        if (foundBreak) {
            try {
                //update the work..
                foundBreak.break_in = time
                foundBreak.save().then(saveUpdate => {
                    console.log("Update break start successfully: ", saveUpdate)
                }).catch(saveError => {
                    console.error('Error saving update break start :', saveError);
                    res.status(400).json({ success: false, message: 'Start Break is null or empty. Not creating a new punch.' });
                })
            } catch (error) {
                console.error("Error update break start: " + error)
            }
        } else if (!foundBreak) {
            Work.findOne({ id_user: user_id, day: date, break_in: { $ne: "" } }).then(foundBreak => {
                Work.findOne({
                    id_user: user_id, day: date, $or: [
                        { punch_out: { $exists: true, $in: [null, ""] } },
                        { break_out: { $exists: true, $in: [null, ""] } },
                    ]
                }).then(otherPunch => {
                    if (!otherPunch) {
                        try {
                            const newPunch = new Work({
                                id_user: user_id,
                                name_user: user_name,
                                day: date,
                                week_day: weekDay,
                                punch_in: "",
                                punch_out: "",
                                break_in: time,
                                break_out: "",
                            })
                            newPunch.save().then(saveBreakin => {
                                console.log('Punch break saved successfully:', saveBreakin);
                                //res.render('pages/index')
                            }).catch(saveError => {
                                console.error('Error saving break punch:', saveError);
                                res.status(400).json({ success: false, message: 'Start Break is null or empty. Not creating a new punch.' });
                            });
                        } catch (error) {
                            console.error("Error break start punch : " + error)
                        }
                    } else {
                        console.log("break start Punch already exist")
                        //res.redirect('/')
                        return
                    }
                })
            }).catch(error => {
                console.error("Error finding list: ", error)
                //res.status(500).send("Internal Server Error..")
                //res.status(500).json({ success: false, message: 'An unexpected error occurred.', error: error });
            })
        }
    })
})
//break end
app.post('/breakend', async function (req, res) {
    console.log("break end on app.js")
    const user_name = req.body.user_data[0]
    const user_id = req.body.user_data[1]
    const date = req.body.user_data[2]
    const time = req.body.user_data[3]
    const weekDay = req.body.user_data[4]
    console.log("break start in app.js: " + user_name, " user id: " + user_id)
    //check if punch already exist
    Work.findOne({ id_user: user_id, day: date, break_out: { $in: [null, ""] } }).then(foundBreakout => {
        if (foundBreakout) {
            try {
                foundBreakout.break_out = time
                foundBreakout.save().then(saveUpdate => {
                    console.log("Update break start successfully: ", saveUpdate)
                }).catch(saveError => {
                    console.log("Error saving update break end : ", saveError)
                    res.status(400).json({ success: false, message: 'End Break is null or empty. Not creating a new punch.' })
                })
            } catch (error) {
                console.error("Error update break out: " + error)
            }
        } else if (!foundBreakout) {
            Work.findOne({ id_user: user_id, day: date, break_out: { $ne: "" } }).then(foundBreak => {
                if (!foundBreak) {
                    try {
                        const newPunch = new Work({
                            id_user: user_id,
                            name_user: user_name,
                            day: date,
                            week_day: weekDay,
                            punch_in: "",
                            punch_out: "",
                            break_in: "",
                            break_out: time,
                        })
                        newPunch.save().then(saveBreakEnd => {
                            console.log('Punch break saved successfully:', saveBreakEnd);
                        }).catch(saveError => {
                            console.error('Error saving break punch:', saveError);
                            res.status(400).json({ success: false, message: 'Start Break is null or empty. Not creating a new punch.' });
                        });
                    } catch (error) {
                        console.error("Error break start punch : " + error)
                    }
                } else {
                    console.log("break start Punch already exist")
                    //res.redirect('/')
                    return
                }
            }).catch(error => {
                console.error("Error finding list: ", error)
                //res.status(500).send("Internal Server Error..")
                //res.status(500).json({ success: false, message: 'An unexpected error occurred.', error: error });
            })
        }
    })
})

//start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`)
})