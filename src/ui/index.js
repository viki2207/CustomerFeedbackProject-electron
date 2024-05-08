const { DateTime } = require('mssql');
const { createFeedback } = require('../feedback');

let smily_value = "";

window.addEventListener("load", () => {
    // Get all elements with the class "href_smily"
    const smileyLinks = document.querySelectorAll('.href_smily');
    let date = new Date().toISOString().slice(0, 19).replace('T', ' ');

    // Attach click event listener to each smiley link
    smileyLinks.forEach(link => {
        link.addEventListener('click', async (e) => {
            smily_value = link.getAttribute('name');
            localStorage.setItem('smily_value', smily_value);

            if (smily_value != "satisfied" && smily_value != "happy") {
                window.location.href = 'feedback.html';
            } else {
                const feedback = {
                    feedbackname: smily_value,
                    feedbackreason: null,
                    feedbackdate: date // Assuming date is defined elsewhere
                };
                const saveFeedback = await createFeedback(feedback);
                if (saveFeedback) {
                    setTimeout(() => {
                        window.location.href = "index.html"; // Redirect to index.html after 3 seconds
                    }, 100); // 10 mili seconds delay
                    window.location.href = "thankyou.html"; // Redirect to thankyou.html immediately
                } else {
                    alert("Loading failed");
                }
            }
        });
    });
});

function getSmilyValue() {
    return localStorage.getItem('smily_value');
}

module.exports = {
    getSmilyValue: getSmilyValue
};
