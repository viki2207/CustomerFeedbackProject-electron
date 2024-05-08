const { getConnection } = require("./database");
const { BrowserWindow, Notification } = require('electron');

const createReasons = async (reasons) => {
    try {
        // Introduce a delay of 3 seconds before executing the database query
        const conn = await getConnection();
       
        const result = await conn.query("INSERT INTO `feedbackreasons` SET ?", reasons);
       //await delay(3000);
       if(result)
        {
        alert("Data saved successfully");
        return true;
        }
       

    } catch (error) {
        // An error occurred during the operation
        alert("Error: " + error.message);
        return false;
    }
}

const getReasons =  async() => {
    try {
        const conn = await getConnection();
        const result =  await conn.query("select * from feedbackreasons");
        
       
        // Check if the result is undefined or null
        if (result.length > 0) {
            // Extract and return the fetched reasons
            const fetchedReasons = result[0];
            console.log("Fetched reasons:", fetchedReasons);
            return fetchedReasons;
        }
        else {
            console.error("No data found in the result array.");
            return [];
        }
    } catch (error) {
        console.error("Error fetching reasons:", error);
        return [];
    }
};

const deleteReasons = async(id) =>{
    const conn = await getConnection();
    const result = await conn.query("DELETE FROM feedbackreasons WHERE id = ?", id);
    return result;
}




// Function to introduce delay using Promise
const delay = (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms));
}

module.exports = { createReasons,getReasons, deleteReasons }
