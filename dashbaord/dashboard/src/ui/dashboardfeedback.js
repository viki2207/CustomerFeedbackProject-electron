const jwt = require('jsonwebtoken');

// Function to check authentication on page load
window.addEventListener('DOMContentLoaded', async () => {
    await checkAuthentication();
});

// Elements and initializations
const logoutButton = document.getElementById("logout");
const feedbackButton = document.getElementById("feedback");
const FeedbackSection = document.getElementById("feedbacksection");
const DashboardSection = document.getElementById("Home");
const DashboardButton = document.getElementById("dashboard");

FeedbackSection.style.display = "none";

// Event listeners for buttons
feedbackButton.addEventListener('click', async (e) => {
    e.preventDefault();
    FeedbackSection.style.display = "block";
    DashboardSection.style.display = "none";
});

DashboardButton.addEventListener('click', async (e) => {
    e.preventDefault();
    FeedbackSection.style.display = "none";
    DashboardSection.style.display = "block";
});

logoutButton.addEventListener('click', async (e) => {
    e.preventDefault();
    await logout();
});

// Function to check if user is authenticated
async function checkAuthentication() {
    const token = localStorage.getItem("token");

    if (!token) {
        // If no token found, redirect to login page
        window.location.href = "login.html";
        return;
    }

    try {
        // Verify the token
        const decoded = jwt.verify(token, 'your_secret_key');
        // If token was valid, proceed with the normal page
    } catch (error) {
        console.error("Error verifying token:", error);
        window.location.href = "login.html";
    }
}

// Function to logout the user
async function logout() {
    const token = localStorage.getItem('token');

    if (!token) {
        alert("No token found. Please login again.");
        window.location.href = "login.html";
        return;
    }

    try {
        // Verify the token
        const decoded = jwt.verify(token, 'your_secret_key');

        // Token is valid, prompt for logout confirmation
        const response = confirm("Are you sure you want to logout?");
        if (response) {
            alert("Thank You for Contacting US");
            window.location.href = "login.html";
        } else {
            alert("Logout canceled.");
        }
    } catch (error) {
        // Token verification failed
        console.error("Error verifying token:", error);
        alert("Logout failed due to token verification error. Please try again.");
    }
}
