//import Work from '../../model/Work.js'
//const Work = require('../../model/Work.js')

const btn_clock_in = document.querySelectorAll('#clock-in')
const btn_clock_out = document.querySelector('#clock-out')
const btn_break_start = document.querySelector('#break-start')
const btn_break_end = document.querySelector('#break-end')
const name_user_value = document.querySelector('#name_user').innerHTML
const id_user = document.querySelector('#id_user')
const id_user_value = document.querySelector('#id_user').innerHTML
const btns_punch = document.querySelectorAll('.bnt-clock')

const currentDay = new Date()
var date = currentDay.getFullYear() + '-' + (currentDay.getMonth() + 1) + '-' + currentDay.getDate();
var time = currentDay.getHours() + ":" + currentDay.getMinutes();
var dayOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
var weekDay = dayOfWeek[currentDay.getDay()]


//import {punch} from '../js/script.js'
//import {punch} from './../../model/Work.js'
//punch_in
import { punchIn } from './script.js'
btns_punch[0].addEventListener('click', async function () {
    punchIn(name_user_value, id_user_value, date, time, weekDay)
})

//break start
import {breakIn} from './script.js'
btn_break_start.addEventListener('click', function (e) {
    console.log("Tue + Dec + 26 + 2023 + 12:19:08 + GMT+1100 + (Australian Eastern Daylight Time)== " + currentDay)
    console.log("date: " + date)
    console.log("time: " + time)
    console.log("weekDay: " + weekDay)
    console.log("name_user_value: " + name_user_value)
    console.log("id_user_value: " + id_user_value)
    console.log("btns_punch: " + btns_punch[1].innerHTML)
    breakIn(name_user_value, id_user_value, date, time, weekDay)
})
/* 
btn_clock_out.addEventListener('click', function (e) {
})
btn_break_end.addEventListener('click', function (e) {
    punchTime(e.target.id)
})
*/