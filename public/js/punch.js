
const btn_clock_in = document.querySelectorAll('#clock-in')
const btn_clock_out = document.querySelector('#clock-out')
const btn_break_start = document.querySelector('#break-start')
const btn_break_end = document.querySelector('#break-end')
const name_user_value = document.querySelector('#name_user').innerHTML
const id_user = document.querySelector('#id_user')
const id_user_value = document.querySelector('#id_user').innerHTML
const btns_punch = document.querySelectorAll('.bnt-clock')

const currentDay = new Date()
currentDay.setDate(currentDay.getDate() + 1)
var date = currentDay.toISOString().split('T')[0]
var time = currentDay.getHours() + ":" + currentDay.getMinutes();
var dayOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
var weekDay = dayOfWeek[currentDay.getDay() -1]

import { punchIn } from './script.js'
btns_punch[0].addEventListener('click', async function () {
    punchIn(name_user_value, id_user_value, date, time, weekDay)
})

//break start
import { breakIn } from './script.js'
btn_break_start.addEventListener('click', function (e) {
    breakIn(name_user_value, id_user_value, date, time, weekDay)
})
//break end
import { breakEnd } from './script.js'
btn_break_end.addEventListener('click', function (e) {
    breakEnd(name_user_value, id_user_value, date, time, weekDay)
})
import{punchOut} from './script.js'
btn_clock_out.addEventListener('click', function (e) {
    punchOut(name_user_value, id_user_value, date, time, weekDay)
})