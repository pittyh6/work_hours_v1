//const mongoose = require('mongoose');
import mongoose from 'mongoose';
const { Schema, model } = mongoose;

//create schema for workdb
const workSchema = new Schema({
    _id: Number,
    name_user: String,
    day: Date,
    weekDay: String,
    punch_in: String,
    punch_out: String,
    break_in: String,
    break_out: String,
})

//create model
const Work = model('Work', workSchema);
export default Work;