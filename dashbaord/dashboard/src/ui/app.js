const { createReasons, getReasons, deleteReasons } = require('../reasons'); // Adjust the path as needed

const reasonForm = document.querySelector("#ReasonsForm");
const reasonName = document.querySelector("#name");
const reasonList = document.querySelector("#Reasons");
let date = new Date().toISOString().slice(0, 19).replace('T', ' ');

let reasons = [];
reasonName.focus();
reasonForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const reason = {
        reasonname: reasonName.value,
        created_at:date
    };

    try {
        const savedReason = await createReasons(reason);
        console.log(savedReason);
        
        // Reset the form
        reasonForm.reset();
        reasonName.focus();
        getAndRenderReasons(); // Fetch and render reasons after adding a new one

    } catch (error) {
        console.error(error);
    }
});
const deleteReason = async(id) =>{
    const response  = confirm("Are you sure want to delete this reason");
    if(response)
        {
            await deleteReasons(id)
            await getAndRenderReasons()
        }
}


function renderReasons(reasons) {
    reasonList.innerHTML = ""; // Clear the current list

    if (Array.isArray(reasons)) { // Check if reasons is an array
        // Create a container for the table
        const tableContainer = document.createElement('div');
        tableContainer.classList.add('table-container');

        // Create a table element
        const reasonsTable = document.createElement('table');
        reasonsTable.classList.add('reasons-table');

        // Create table header
        const tableHeader = document.createElement('tr');
        const headers = ['ID', 'Reason Name',  'Actions'];
        headers.forEach(headerText => {
            const th = document.createElement('th');
            th.scope  = "col";
            th.textContent = headerText;
            tableHeader.appendChild(th);
        });
        reasonsTable.appendChild(tableHeader);

        // Loop through each reason and create a table row
        reasons.forEach((reason, index) => {
            const tr = document.createElement('tr');
            tr.scope = "row";
            const tdId = document.createElement('td');
            tdId.textContent = index + 1; // Assign dynamic ID
            tr.appendChild(tdId);

            const tdName = document.createElement('td');
            tdName.textContent = reason.reasonname;
            tr.appendChild(tdName);

           

            const tdActions = document.createElement('td');
            const editButton = document.createElement('button');
            editButton.textContent = 'Edit';
            editButton.classList.add('btn', 'btn-success', 'btn-sm');
            editButton.onclick = () => editReason(reason.id);

            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'Delete';
            deleteButton.classList.add('btn', 'btn-danger', 'btn-sm');
            deleteButton.onclick = () => deleteReason(reason.id);

            tdActions.appendChild(editButton);
            tdActions.appendChild(deleteButton);
            tr.appendChild(tdActions);

            reasonsTable.appendChild(tr);
        });

        // Append the table to the table container
        tableContainer.appendChild(reasonsTable);

        // Append the table container to the reasonList
        reasonList.appendChild(tableContainer);
    } else if (reasons != undefined) {
        // Handle the case when a single reason object is received
        console.error("Reasons data is not an array:", reasons);
    } else {
        console.error("Reasons data is undefined.");
    }
}


async function getAndRenderReasons() {
    try {
        const reasonsData = await getReasons(); // Fetch reasons from the database
        reasons = reasonsData; // Assuming reasons are directly returned
     console.log("yor" + reasons)
        renderReasons(reasons); // Render the reasons
    } catch (error) {
        console.error(error);
    }
}

// Initial fetch and render when the page loads
document.addEventListener('DOMContentLoaded', () => {
    getAndRenderReasons();
});
