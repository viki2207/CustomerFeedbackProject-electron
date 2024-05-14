
const logoutButton = document.getElementById("logout");
const feedbackButton = document.getElementById("feedback");
const FeedbackSection  = document.getElementById("feedbacksection");
const DashbaordSection = document.getElementById("Home");
const DasboardButton = document.getElementById("dashboard");
FeedbackSection.style.display = "none";
feedbackButton.addEventListener('click', async(e) => {
    e.preventDefault();
    FeedbackSection.style.display = "block";

    DashbaordSection.style.display = "none";
   
    
});
DasboardButton.addEventListener('click', async(e) => {
    e.preventDefault();
    FeedbackSection.style.display = "none";
    DashbaordSection.style.display = "block"
 
   
    
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