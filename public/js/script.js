//import Work from '../model/Work.js'; 
/*export async function punch(id_user_value,name_user_value,date,weekDay,time){
    
    console.log("enter punch function...")
    try {
        console.log("enter try inside function punch...")
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
        console.log("After create obj...newPunchIn: " + newPunchIn)
        const savedPunchIn = await newPunchIn.save();
        console.log('Punch in saved:', savedPunchIn);
    } catch (error) {
        console.error('Error saving new punchIn:', error);
        throw error; // Rethrow the error to propagate it up
    }
}*/

export async function punchIn(name_user_value, id_user_value, date, time, weekDay) {
    console.log("name: " + name_user_value, " id: " + id_user_value)
    const user_data = [name_user_value, id_user_value, date, time, weekDay]
    const options = {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ user_data })
    }
    /*const response = await fetch('/punch', options)
    const jsonData = await response.json()
    console.log("response: " + response)*/
    try {
        const response = await fetch('/punch', options);

        if (!response.ok) {
            // If the response status is not OK, throw an error
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const contentType = response.headers.get("content-type");

        if (contentType && contentType.includes("application/json")) {
            // If the content type is JSON, try to parse it
            const jsonData = await response.json();
            console.log("response: ", jsonData);

            // Assuming jsonData contains information about success or failure
            if (jsonData.success) {
                // Redirect to the index page upon success
                window.location.href = '/'; 
            } else {
                // Handle other success scenarios or display an error message
                console.error("Error in punchIn:", jsonData.message);
            }
        } else {
            // If it's not JSON, treat it as non-JSON response
            console.error("Non-JSON response:", response.statusText);
            window.location.href = '/';
        }
    } catch (error) {
        console.error("Network error:", error.message);
    }
}

