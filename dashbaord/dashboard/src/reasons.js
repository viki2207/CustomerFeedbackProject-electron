// Import required modules
const { getConnection } = require("./database");
const { BrowserWindow, Notification } = require('electron');

// Function to create a new reason in the database
const createReasons = async (reasons) => {
    try {
        // Establish a database connection
        const conn = await getConnection();
       
        // Insert the new reason into the 'feedbackreasons' table
        const result = await conn.query("INSERT INTO `feedbackreasons` SET ?", reasons);
        
        // If the insertion is successful, show an alert and return true
        if (result) {
            alert("Data saved successfully");
            return true;
        }
    } catch (error) {
        // An error occurred during the operation, show an alert and return false
        alert("Error: " + error.message);
        return false;
    }
}

// Function to fetch all reasons from the database
const getReasons =  async() => {
    try {
        // Establish a database connection
        const conn = await getConnection();
        
        // Fetch all records from the 'feedbackreasons' table
        const result =  await conn.query("SELECT * FROM feedbackreasons");
        
        // Check if any reasons were fetched
        if (result.length > 0) {
            // Extract and return the fetched reasons
            const fetchedReasons = result[0];
            console.log("Fetched reasons:", fetchedReasons);
            return fetchedReasons;
        } else {
            console.error("No data found in the result array.");
            return [];
        }
    } catch (error) {
        console.error("Error fetching reasons:", error);
        return [];
    }
};

// Function to delete a reason from the database by its ID
const deleteReasons = async(id) => {
    const conn = await getConnection();
    const result = await conn.query("DELETE FROM feedbackreasons WHERE id = ?", id);
    return result;
}

// Function to update a reason in the database
const updateReasons = async(id, reason) => {
    const conn = await getConnection();
    const result = await conn.query("UPDATE feedbackreasons SET ? WHERE id = ?", [reason, id]);
};

// Function to fetch a reason from the database by its ID
const getReasonsById = async(Id) => {
    const conn = await getConnection();
    const result = await conn.query("SELECT * FROM feedbackreasons WHERE id = ?", Id);
    return result[0];
}

// Export the functions for external use
module.exports = { createReasons, getReasons, deleteReasons, updateReasons, getReasonsById };
