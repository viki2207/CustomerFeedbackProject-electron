const { getUsers } = require('../reasons');
const loginForm = document.querySelector("#login-form")
loginForm.addEventListener('submit' ,async(e)=>{
 
    e.preventDefault();
    await login();
})
// Assuming this code is within an async function
async function login() {
    const userName = document.querySelector("#username").value;
    const password = document.querySelector("#password").value;

    try {
        // Check if both username and password are provided
        if (userName && password) {
            const checkLoginDetails = await getUsers(userName, password);

            // Assuming checkLoginDetails indicates login success (true) or failure (false)
            if (checkLoginDetails) {
                alert("Login Successful");
                window.location.href = "dashboard.html";
            } else {
                alert("Login Failed. Please check your credentials.");
            }
        } else {
            alert("Please provide both username and password.");
        }
    } catch (error) {
        console.error("Error during login:", error);
        alert("An error occurred during login. Please try again later.");
    }
}


