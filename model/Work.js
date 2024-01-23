//const mongoose = require('mongoose');
import mongoose from 'mongoose';
const { Schema, model } = mongoose;

//create schema for workdb
const workSchema = new Schema({
    id_user: Number,
    name_user: String,
    //day: { type: Date, default: Date.now, get: v => moment(v).format('DD-MM-YYYY') },
    day: { type: String, default: () => moment().format('DD-MM-YYYY') },
    week_day: String,
    punch_in: String,
    punch_out: String,
    break_in: String,
    break_out: String,
}, { toJSON: { getters: true } }); // This ensures that the getter (moment) is applied when converting to JSON

//create model
const Work = mongoose.model('Work', workSchema);
export default Work;



//update
//db.works.updateOne({"week_day": "Tuesday"}, {$set:{punch_out:"20:00.00"}})
//db.works.updateOne({"week_day": "Tuesday"}, {$set:{week_day:"Thursday",punch_in:"11:00.00",punch_out:"19:00.00", break_in: '14:20.00',break_out: '15:20.00'}})
/*db.works.insertMany([
    {
        id_user: 100001,
        name_user: 'Priscila',
        day: '2024-1-23',
        week_day: 'Tuesday',
        punch_in: '8:30',
        punch_out: '4:30',
        break_in: '12:10',
        break_out: '13:10',
    },
    {
        id_user: 100001,
        name_user: 'Priscila',
        day: '2024-1-24',
        week_day: 'Wednesday',
        punch_in: '8:30',
        punch_out: '4:30',
        break_in: '11:45',
        break_out: '12:45',
    },
    {
        id_user: 100001,
        name_user: 'Priscila',
        day: '2024-1-25',
        week_day: 'Thursday',
        punch_in: '9:00',
        punch_out: '5:15',
        break_in: '13:00',
        break_out: '14:00'
    },
    {
        id_user: 100001,
        name_user: 'Priscila',
        day: '2024-1-26',
        week_day: 'Friday',
        punch_in: '8:45',
        punch_out: '6:50',
        break_in: '12:25',
        break_out: '13:35'
    }
])*/