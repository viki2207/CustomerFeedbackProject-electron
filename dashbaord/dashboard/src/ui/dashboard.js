
const logoutButton = document.getElementById("logout");
const feedbackButton = document.getElementById("feedback");
feedbackButton.addEventListener('click', async(e) => {
    e.preventDefault();
   window.location.href="index.html";
    
});
logoutButton.addEventListener('click', async(e) => {
    e.preventDefault();
    await logout();
    
});
async function logout() {
    const response = confirm("Are you sure you want to logout?");
    if (response) {
        alert("Thank You for Contacting US");
        window.location.href = "login.html";
    } else {
        alert("Logout failed for some reasons");
    }
}