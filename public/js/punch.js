const btn_clock_in = document.querySelector('#clock-in')
const btn_clock_out = document.querySelector('#clock-out')
const btn_break_start = document.querySelector('#break-start')
const btn_break_end = document.querySelector('#break-end')
const name_user = document.querySelector('#name-user')
const id_user = document.querySelector('#id-user')

/*function punchTime(event) {
    var today = new Date();
    var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
    var time = today.getHours() + ":" + today.getMinutes();

    console.log("Punched event:" + event + " Date: " + date + " Time: " + time)
}*/

const currentDay = new Date()
var date = currentDay.getFullYear() + '-' + (currentDay.getMonth() + 1) + '-' + currentDay.getDate();
var time = currentDay.getHours() + ":" + currentDay.getMinutes();
var dayOfWeek = ["Sunday","Monday","Tuesday", "Wednesday","Thursday","Friday","Saturday"]
var weekDay = dayOfWeek[currentDay.getDay()]

console.log(weekDay)
btn_clock_in.addEventListener('click', function (e) {
   // punchTime(e.target.id)
    //const currentDay = new Date()
    console.log("Tue + Dec + 26 + 2023 + 12:19:08 + GMT+1100 + (Australian Eastern Daylight Time)== " + currentDay)
    console.log("date: " + date)
    console.log("time: " + time)
    console.log("weekDay: " + weekDay)

    /*try {
        const newPunchIn = new Work({
            _id: 100001,
            name_user: 'Priscila',
            day: 26 - 12 - 2023,
            week_day: "Tuesday",
            punch_in: '09:50',
            punch_out: '18:50',
            break_in: '12:00',
            break_out: '12:30',
        })
    }*/
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
