const mongoose = require('mongoose');
const {Schema, model} = mongoose;

//create schema for workdb
const workSchema = new Schema({
    name_user: String,
    work: [
        day: Date,
        punch_in: String,
        punch_out: String,
        break_in: String,
        break_out: String,
    ]
})

//create model
const Work = model('Work',workSchema);
export default Work;