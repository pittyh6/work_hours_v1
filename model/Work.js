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
//db.works.updateOne({"week_day": "Sunday"}, {$set:{punch_out:"20:00.00"}})
//db.works.updateOne({"week_day": "Tuesday"}, {$set:{day:ISODate("2024-01-22T14:00:00.000Z"),week_day:"Thursday",punch_in:"11:00.00",punch_out:"19:00.00", break_in: '14:20.00',break_out: '15:20.00'}})