//import { json } from "body-parser";

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

export async function breakIn(name_user_value, id_user_value, date, time, weekDay) {
    console.log("name: " + name_user_value, " id: " + id_user_value)
    const user_data = [name_user_value, id_user_value, date, time, weekDay]
    const options = {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ user_data })
    }
    try {
        const response = await fetch('/break', options);

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
                console.error("Error in breakStart:", jsonData.message);
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

export async function breakEnd(name_user_value, id_user_value, date, time, weekDay) {
    console.log("name: " + name_user_value, " id: " + id_user_value)
    const user_data = [name_user_value, id_user_value, date, time, weekDay]
    const options = {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ user_data })
    }
    try {
        const response = await fetch('/breakend', options);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`)
        }
        const contentType = response.headers.get("content-type")
        if (contentType && contentType.includes("application/json")) {
            const jsonData = await response.json()
            console.log("response: ", jsonData)
            if (jsonData.success) {
                window.location.href = '/'
            } else {
                console.log("Error in end break: ", jsonData.message)
            }
        } else {
            console.error("Non-JSON response:", response.statusText);
            window.location.href = '/';
        }
    } catch (error) {
        console.error("Network error:", error.message);
    }
}
export async function punchOut(name_user_value, id_user_value, date, time, weekDay) {
    console.log("name: " + name_user_value, " id: " + id_user_value)
    const user_data = [name_user_value, id_user_value, date, time, weekDay]
    const options = {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ user_data })
    }
    try {
        const response = await fetch('/punchOut', options)
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`)
        }
        const contentType = response.headers.get("content-type")
        if (contentType && contentType.includes("application/json")) {
            const jsonData = await response.json()
            console.log("response: ", jsonData)
            if (jsonData.success) {
                window.location.href = '/'
            } else {
                console.error("Error in punchIn:", jsonData.message);
            }
        } else {
            console.error("Non-JSON response:", response.statusText);
            window.location.href = '/';
        }
    } catch (error) {
        console.error("Network error:", error.message);
    }
}