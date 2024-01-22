//const mongoose = require('mongoose');
import mongoose from 'mongoose';
const { Schema, model } = mongoose;

//create schema for workdb
const workSchema = new Schema({
    id_user: Number,
    name_user: String,
    day: { type: Date, default: Date.now, get: v => moment(v).format('DD-MM-YYYY') },
    week_day: String,
    punch_in: String,
    punch_out: String,
    break_in: String,
    break_out: String,
})

//create model
const Work = mongoose.model('Work', workSchema);
export default Work;


//update
//workJamy> db.works.updateOne({"week_day": "Sunday"}, {$set:{punch_out:"20:00.00"}})