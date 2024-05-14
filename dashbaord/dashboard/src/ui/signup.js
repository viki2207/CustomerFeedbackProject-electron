const bcrypt = require('bcrypt');
const { createUsers } = require('../reasons');

const loginForm = document.querySelector("#login-form");

loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const userName = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirmpassword").value;
    const email = document.getElementById("email").value;
    await signUp(userName, password, confirmPassword, email);
});

function resetFields() {
    document.getElementById("username").value = "";
    document.getElementById("password").value = "";
    document.getElementById("confirmpassword").value = "";
    document.getElementById("email").value = "";
    document.getElementById("username").focus();
}

async function signUp(userName, password, confirmPassword, email) {
    if (password === confirmPassword) {
        try {
            if (userName && password && email) {
                const hashedPassword = await hashPassword(password);
                const user = {
                    username: userName,
                    password: hashedPassword,
                    email: email
                };
                const signUpSuccess = await createUsers(user);
                
                if (signUpSuccess) {
                    alert("Signup Successful");
                    resetFields();
                    window.location.href = "login.html";
                } else {
                    alert("Signup Failed. Please try again.");
                    resetFields();
                }
            } else {
                alert("Please provide username, password, and email.");
            }
        } catch (error) {
            console.error("Error during signup:", error);
            alert("An error occurred during signup. Please try again later.");
            resetFields();
        }
    } else {
        alert("Passwords do not match. Please re-enter.");
        document.getElementById("password").value = "";
        document.getElementById("confirmpassword").value = "";
        document.getElementById("password").focus();
    }
}

async function hashPassword(password) {
    return await bcrypt.hash(password, 10);
}
