const { dialog, BrowserWindow } = require('electron');
const { getSmilyValue } = require('../ui/index');
const { createFeedback } = require('../feedback');
const {getReasons} = require("../../dashbaord/dashboard/src/reasons") 

// Retrieve the smily_value
const smily_value = getSmilyValue();
// Wait for the DOM content to be fully loaded
document.addEventListener("DOMContentLoaded", (event) => {
    // Call the function to populate checkboxes when the page loads
    populateCheckboxes();

    // Call the function to display feedback when the page loads
   displayFeedback();
});


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
        setTimeout(() => {
            window.location.href = "index.html"; // Redirect to index.html after 3 seconds
        }, 100); // 10mili seconds delay
        window.location.href = "thankyou.html"; // Redirect to thankyou.html immediately
     
        
    } else {
        // Handle case where feedback creation failed
        alert("Failed to submit feedback.");
    }
     
}

// Function to populate checkboxes dynamically
const populateCheckboxes = async () => {
    const reasons = await getReasons();
    console.log(reasons);
    const checkboxContainer = document.getElementById("checkboxContainer");
    if (reasons.length > 0) {
        reasons.forEach(reason => {
            const checkbox = document.createElement("input");
            checkbox.type = "checkbox";
            checkbox.className = "checkbox";
            checkbox.value = reason.reasonname; // Set checkbox value
            checkbox.addEventListener("change", function() {
                selectedreasons();
            });
            checkboxContainer.appendChild(checkbox);

            const label = document.createElement("label");
            label.textContent = reason.reasonname;
            checkboxContainer.appendChild(label);

            // Add newline
            checkboxContainer.appendChild(document.createElement("br"));
        });
    } else {
        console.error("No reasons fetched from the database.");
    }
};
// Function to fetch and display data from the database
const displayFeedback = async () => {
    try {
        const reasons = await getReasons();
        const feedbackContainer = document.getElementById("feedbackContainer");
       
         feedbackContainer.innerHTML = ""; // Clear previous content

        if (reasons.length > 0) {
            reasons.forEach(reason => {
                const reasonDiv = document.createElement("div");
                reasonDiv.textContent = reasons.reasonname;
                feedbackContainer.appendChild(reasonDiv);
            });
        } else {
            feedbackContainer.textContent = "No feedback reasons found.";
        }
    } catch (error) {
        console.error("Error fetching feedback:", error);
    }
};

