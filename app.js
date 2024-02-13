
/*---------------import---------------*/
import express from 'express';
const app = express();
import bodyParser from 'body-parser';

/*-------------------------------------*/

/* -------------Mongo DB------------*/
import mongoose from 'mongoose';
//format date
import moment from 'moment';
import { format } from 'date-fns';

mongoose.connect("mongodb://localhost:27017/workJamy", { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('Connected to MongoDB.')
    }).catch(error => {
        console.log('Error connecting to MongoDB: ', error);
    })

import Work from './model/Work.js'


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
app.get('/', async function (req, res) {
    const currentDay = new Date() 
    const dayOfWeekArr = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
    currentDay.setDate(currentDay.getDate() +1)
    const formatCurrentDay = currentDay.toISOString().split('T')[0]
    const dayOfWeek = dayOfWeekArr[currentDay.getDay()-1]

    console.log("dayOfTheWeek: ", dayOfWeek)
    console.log("currentDay: ", formatCurrentDay)
    try {
        let workData = [];
        switch (dayOfWeek) {
            
            case 'Sunday':
                // Fetch data from MongoDB
                workData = await Work.find({ id_user: 100001, day: formatCurrentDay} )
                // Pass the fetched data to the template
                //res.render('pages/index', { workData })
                break;
            case 'Monday':
                var previousDay = new Date(currentDay);
                previousDay.setDate(currentDay.getDate() - 1);
                var formatPreviousDay = previousDay.toISOString().split('T')[0];
                /*const mondayData = await Work.find({ id_user: 100001, day: {$gte: formatPreviousDay, $lte: formatCurrentDay }})
                workData = workData.concat(mondayData)*/
                workData = await Work.find({ id_user: 100001, day: {$gte: formatPreviousDay, $lte: formatCurrentDay } })
                //res.render('pages/index', { workData })
                break;
            case 'Tuesday':
                var previousDay = new Date(currentDay);
                previousDay.setDate(currentDay.getDate() - 2);
                var formatPreviousDay = previousDay.toISOString().split('T')[0];
                /*const tuesdayData = await Work.find({ id_user: 100001, day: {$gte: formatPreviousDay, $lte: formatCurrentDay }})
                workData = workData.concat(tuesdayData)*/
                workData = await Work.find({ id_user: 100001, day: {$gte: formatPreviousDay, $lte: formatCurrentDay } })
                //res.render('pages/index', { workData })
                break;
            case 'Wednesday':
                var previousDay = new Date(currentDay);
                previousDay.setDate(currentDay.getDate() - 3);
                var formatPreviousDay = previousDay.toISOString().split('T')[0];
                /*const wedData = await Work.find({ id_user: 100001, day: {$gte: formatPreviousDay, $lte: formatCurrentDay }})
                workData = workData.concat(wedData)*/
                workData = await Work.find({ id_user: 100001, day: {$gte: formatPreviousDay, $lte: formatCurrentDay } })
                //res.render('pages/index', { workData })
                break;
            case 'Thursday':
                var previousDay = new Date(currentDay);
                previousDay.setDate(currentDay.getDate() - 4);
                var formatPreviousDay = previousDay.toISOString().split('T')[0];
                /*const thursdayData = await Work.find({ id_user: 100001, day: {$gte: formatPreviousDay, $lte: formatCurrentDay }})
                workData = workData.concat(thursdayData)*/
                workData = await Work.find({ id_user: 100001, day: {$gte: formatPreviousDay, $lte: formatCurrentDay } })
                //res.render('pages/index', { workData })
                break;
            case 'Friday':
                var previousDay = new Date(currentDay);
                previousDay.setDate(currentDay.getDate() - 5);
                var formatPreviousDay = previousDay.toISOString().split('T')[0];
                /*const fridayData = await Work.find({ id_user: 100001, day: {$gte: formatPreviousDay, $lte: formatCurrentDay }})
                workData = workData.concat(fridayData)*/
                workData = await Work.find({ id_user: 100001, day: {$gte: formatPreviousDay, $lte: formatCurrentDay } })
                //res.render('pages/index', { workData })
                break;
            case 'Saturday':
                var previousDay = new Date(currentDay);
                previousDay.setDate(currentDay.getDate() - 6);
                var formatPreviousDay = previousDay.toISOString().split('T')[0];
                /*const saturdayData = await Work.find({ id_user: 100001, day: {$gte: formatPreviousDay, $lte: formatCurrentDay }})
                workData = workData.concat(saturdayData)*/
                workData = await Work.find({ id_user: 100001, day: {$gte: formatPreviousDay, $lte: formatCurrentDay } })
                //res.render('pages/index', { workData })
                break;
            default:
                workData = [];
        }
        console.log('workData result:', {workData})
        res.render('pages/index', { workData })
    } catch (error) {
        console.log("Error fetching data: ", error)
        res.status(500).send("Internal Server Error")
    }
   
})
app.get('/punch', function (req, res) {
    res.render('pages/punch');
})

//add clock-in
app.post("/punch", async function (req, res) {

    const user_name = req.body.user_data[0]
    const user_id = req.body.user_data[1]
    const date = req.body.user_data[2]
    const time = req.body.user_data[3]
    // time is in the format "hh:mm"
    const [hours, minutes] = time.split(':').map(Number);
    // Format minutes with two decimal places
    const formattedMinutes = minutes.toFixed(2).padStart(2, '0');
    // Combine hours and formatted minutes
    //const formattedTime = `${hours}:${formattedMinutes}`;
    const formattedTime = `${hours}:${formattedMinutes.split('.')[0]}`;
    const weekDay = req.body.user_data[4]

    console.log("punch in app.js: " + user_name, " user id: " + user_id)
    //check if punch already exist
    Work.findOne({ id_user: user_id, day: date, punch_in: { $ne: null, $ne: "" } }).then(foundPunch => {
        Work.findOne({
            id_user: user_id, day: date, $or: [
                { punch_in: { $exists: true } },
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
                        punch_in: formattedTime,
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
    const [hours, minutes] = time.split(':').map(Number);
    const formattedMinutes = minutes.toFixed(2).padStart(2, '0');
    const formattedTime = `${hours}:${formattedMinutes.split('.')[0]}`;
    const weekDay = req.body.user_data[4]

    console.log("break start in app.js: " + user_name, " user id: " + user_id)
    //check if punch already exist
    Work.findOne({ id_user: user_id, day: date, break_in: { $in: [null, ""] }, break_out: { $in: [null, ""] }, punch_out: { $in: [null, ""] } }).then(foundBreak => {
        if (foundBreak) {
            try {
                //update the work..
                foundBreak.break_in = formattedTime
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
                        { break_in: { $exists: true } },
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
                                break_in: formattedTime,
                                break_out: "",
                            })
                            newPunch.save().then(saveBreakin => {
                                console.log('Punch break saved successfully:', saveBreakin);
                                res.render('pages/index')
                            }).catch(saveError => {
                                console.error('Error saving break punch:', saveError);
                                res.status(400).json({ success: false, message: 'Start Break is null or empty. Not creating a new punch.' });
                            });
                        } catch (error) {
                            console.error("Error break start punch : " + error)
                        }
                    } else {
                        console.log("break start Punch already exist")
                        res.redirect('/')
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
    const [hours, minutes] = time.split(':').map(Number);
    const formattedMinutes = minutes.toFixed(2).padStart(2, '0');
    const formattedTime = `${hours}:${formattedMinutes.split('.')[0]}`;
    const weekDay = req.body.user_data[4]
    console.log("break end in app.js: " + user_name, " user id: " + user_id)
    //check if punch already exist
    Work.findOne({ id_user: user_id, day: date, break_out: { $in: [null, ""] }, punch_out: { $in: [null, ""] } }).then(foundBreakout => {
        if (foundBreakout) {
            try {
                foundBreakout.break_out = formattedTime
                foundBreakout.save().then(saveUpdate => {
                    console.log("Update break end successfully: ", saveUpdate)
                }).catch(saveError => {
                    console.log("Error saving update break end : ", saveError)
                    res.status(400).json({ success: false, message: 'End Break is null or empty. Not creating a new punch.' })
                })
            } catch (error) {
                console.error("Error update break out: " + error)
            }
        } else if (!foundBreakout) {
            Work.findOne({ id_user: user_id, day: date, break_out: { $ne: "" } }).then(foundBreak => {
                Work.findOne({
                    id_user: user_id, day: date, $or: [
                        { punch_out: { $exists: true, $in: [null, ""] } },
                        { break_out: { $exists: true } },
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
                                break_in: "",
                                break_out: formattedTime,
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
                        res.redirect('/')
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
//punch out
app.post('/punchOut', async function (req, res) {
    console.log("pounch out on app.js")
    const user_name = req.body.user_data[0]
    const user_id = req.body.user_data[1]
    const date = req.body.user_data[2]
    const time = req.body.user_data[3]
    const [hours, minutes] = time.split(':').map(Number);
    const formattedMinutes = minutes.toFixed(2).padStart(2, '0');
    const formattedTime = `${hours}:${formattedMinutes.split('.')[0]}`;
    const weekDay = req.body.user_data[4]
    console.log("punch out in app.js: " + user_name, " user id: " + user_id, " time: " + time)
    Work.findOne({ id_user: user_id, day: date, punch_out: { $in: [null, ""] } }).then(foundPunchout => {
        if (foundPunchout) {
            try {
                foundPunchout.punch_out = formattedTime
                foundPunchout.save().then(saveUpdate => {
                    console.log("Update punch out successfully: ", saveUpdate)
                }).catch(saveError => {
                    console.log("Error saving update break end : ", saveError)
                    res.status(400).json({ success: false, message: 'Punch Out is null or empty. Not creating a new punch.' })
                })
            } catch (error) {
                console.error("Error update punch out: " + error)
            }
        } else if (!foundPunchout) {
            Work.findOne({ id_user: user_id, day: date, punch_out: { $ne: "" } }).then(foundPunch => {
                Work.findOne({
                    id_user: user_id, day: date, punch_out: { $exists: true },

                }).then(otherPunch => {
                    if (!otherPunch) {
                        try {
                            const newPunch = new Work({
                                id_user: user_id,
                                name_user: user_name,
                                day: date,
                                week_day: weekDay,
                                punch_in: "",
                                punch_out: formattedTime,
                                break_in: "",
                                break_out: "",
                            })
                            newPunch.save().then(savePunchout => {
                                console.log('Punch out saved successfully:', savePunchout);
                            }).catch(saveError => {
                                console.error('Error saving punch out:', saveError);
                                res.status(400).json({ success: false, message: 'punch out is null or empty. Not creating a new punch.' });
                            });
                        } catch (error) {
                            console.error("Error punch out : " + error)
                        }
                    } else {
                        console.log("Punch out already exist")
                        res.redirect('/')
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

//start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`)
})