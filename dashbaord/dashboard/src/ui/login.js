const bcrypt = require('bcrypt');
const { getUsers } = require('../reasons');
const loginForm = document.querySelector("#login-form")

loginForm.addEventListener('submit' , async (e) => {
    e.preventDefault();
    
    // Get the values of userName and password when the form is submitted
    const userName = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    function ResetFields()
    {
        document.getElementById("username").value = "";
        document.getElementById("password").value = "";
        document.getElementById("username").focus();
    }

    try {
        if (userName && password) {
            const hashedPassword = await hashPassword(password);
            const checkLoginDetails = await getUsers(userName, hashedPassword);

            if (checkLoginDetails) {
                alert("Login Successful");
                window.location.href = "dashboard.html";
            } else {
                alert("Login Failed. Please check your credentials.");
                ResetFields();
            }
        } else {
            alert("Please provide both username and password.");
            ResetFields();
        }
    } catch (error) {
        console.error("Error during login:", error);
        ResetFields();
        alert("An error occurred during login. Please try again later.");
    }
});

async function hashPassword(password) {
    return await bcrypt.hash(password, 10);
}
