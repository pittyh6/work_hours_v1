
export function punch(id_user_value,name_user_value,date,weekDay,time){
    
    console.log("enter punch function...")
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
        const savedPunchIn = newPunchIn.save();
        console.log('Punch in saved:', savedPunchIn);
    } catch (error) {
        console.error('Error saving new punchIn:', error);
        throw error; // Rethrow the error to propagate it up
    }
}