const btn_clock_in = document.querySelector('#clock-in')
const btn_clock_out = document.querySelector('#clock-out')
const btn_break_start = document.querySelector('#break-start')
const btn_break_end = document.querySelector('#break-end')
const name_user = document.querySelector('#name-user')
const id_user = document.querySelector('#id-user')

function punchTime(event) {
    var today = new Date();
    var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
    var time = today.getHours() + ":" + today.getMinutes();
   
    console.log("Punched event:" + event + " Date: " + date + " Time: " + time)
}

btn_clock_in.addEventListener('click', function (e) {
    punchTime(e.target.id)
    const currentDay = new Date()
    console.log("Tue + Dec + 26 + 2023 + 12:19:08 + GMT+1100 + (Australian Eastern Daylight Time)== " + currentDay)
})
btn_clock_out.addEventListener('click', function (e) {
    punchTime(e.target.id)
})
btn_break_start.addEventListener('click', function (e) {
    punchTime(e.target.id)
})
btn_break_end.addEventListener('click', function (e) {
    punchTime(e.target.id)
})
