

const { createReasons } = require('../reasons');// Adjust the path as needed


const reasonForm = document.querySelector("#ReasonsForm");
const reasonName = document.querySelector("#name");

reasonForm.addEventListener('submit', async (e) => {
    
    e.preventDefault();
    
    const reason = {
        name: reasonName.value
    };

    try {
        const savedReason = await createReasons(reason);
        console.log(savedReason);
        
        // Reset the form
        reasonForm.reset();
        reasonName.focus();
    } catch (error) {
        console.error(error);
    }
});
