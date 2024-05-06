const { dialog, BrowserWindow } = require('electron');
const { getSmilyValue } = require('../ui/index');
const { createFeedback } = require('../feedback');

// Retrieve the smily_value
const smily_value = getSmilyValue();

// Function to handle checkbox selections
function selectedreasons() {
    var checkboxes = document.querySelectorAll(".checkbox");
    var count = 0;
    var reasons = ""; // Initialize reasons variable outside the loop
    
    checkboxes.forEach(checkbox => {
        if (checkbox.checked) {
            count++;
            if (count > 3) {
                alert("Maximum you can select 3 options");
                checkbox.checked = false;
                return; // Exit the forEach loop early if more than 3 checkboxes are checked
            }
            // Concatenate selected reasons
            reasons += checkbox.value + ", "; // Append the value of checked checkbox
        }
    });

    // Remove trailing comma and space from reasons string
    reasons = reasons.replace(/,\s*$/, "");
    return reasons; // Return the reasons string
}

// Function to handle feedback submission
async function feedback() {
    const reasons = selectedreasons(); // Get selected reasons
    const feedbackData = {
        feedbackname: smily_value,
        feedbackreason: reasons,
        feedbackdate: new Date().toISOString().slice(0, 19).replace('T', ' ')
    };
    const feedbackCreated = await createFeedback(feedbackData); // Call createFeedback function with feedback data
    if (feedbackCreated) {
        window.location.href = "thankyou.html"; // Navigate to thankyou.html if feedback was successfully created
    } else {
        // Handle case where feedback creation failed
        alert("Failed to submit feedback.");
    }
     
}
