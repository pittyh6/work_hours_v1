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
