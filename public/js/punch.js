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
btns_punch[0].addEventListener('click', async function () {
    // punchTime(e.target.id)
    //const currentDay = new Date()

    console.log("Tue + Dec + 26 + 2023 + 12:19:08 + GMT+1100 + (Australian Eastern Daylight Time)== " + currentDay)
    console.log("date: " + date)
    console.log("time: " + time)
    console.log("weekDay: " + weekDay)
    console.log("name_user_value: " + name_user_value)
    console.log("id_user_value: " + id_user_value)
    console.log("btns_punch: " + btns_punch[0].innerHTML)


    try {
        const response = await fetch('/punch', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                clockIn: time,
            }),
        });

        

        /*const data = await response.json()
        console.log('Response:', response);
        console.log('Data:', data);

        if (data.success) {
            alert('Punch saved successfully!')
        } else {
            alert("Error saving punch!")
        }*/

    } catch (error) {
        console.error("Error punch: " + error)
    }


    /*try{
       await punch(id_user_value,name_user_value,date,weekDay,time)
    }catch(error){
        console.log("Error in button clock_in: " + error)
    }*/
    /*
        try {
            const newPunchIn = new Work({
                _id: id_user_value,
                name_user: name_user_value,
                day: date,
                week_day: weekDay,
                punch_in: time,
                punch_out: '18:50',
                break_in: '12:00',
                break_out: '12:30',
            })
            newPunchIn.save().then(savePunchIn => {
                console.log('Punch in saved:', savedPunchIn);
            }).catch(saveError => {
                console.error('Error saving punch in:', saveError);
            });
        } catch (error) {
            console.log("Error saving new punchIn: ", error)
        }*/
})




/*
btn_clock_out.addEventListener('click', function (e) {
    punchTime(e.target.id)
})
btn_break_start.addEventListener('click', function (e) {
    punchTime(e.target.id)
})
btn_break_end.addEventListener('click', function (e) {
    punchTime(e.target.id)
})
*/