const mongoose = require('mongoose');
const {Schema, model} = mongoose;

const workSchema = new Schema({
    name_user: String,
    work_day: Date,
    punch_in: String,
    punch_out: String,
    break_in: String,
    break_out: String,
})