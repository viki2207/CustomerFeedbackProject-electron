const { getConnection } = require("./database");
const { BrowserWindow, Notification } = require('electron');
const createFeedback = async (feedback) => {
    try {
        // Introduce a delay of 3 seconds before executing the database query
        const conn = await getConnection();
        const result = await conn.query("INSERT INTO `feedback` SET ?", feedback);
        await delay(3000);
        alert("Data saved successfully");
        return true;

    } catch (error) {
        // An error occurred during the operation
        alert("Error: " + error.message);
        return false;
    }
}


// Function to introduce delay using Promise
const delay = (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms));
}

module.exports = { createFeedback }
