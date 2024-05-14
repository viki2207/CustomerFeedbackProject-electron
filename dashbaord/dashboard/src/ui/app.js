// Import necessary functions from '../reasons' module
const { createReasons, getReasons, deleteReasons, getReasonsById, updateReasons } = require('../reasons'); // Adjust the path as needed

// Select necessary DOM elements
const reasonForm = document.querySelector("#ReasonsForm");
const reasonName = document.querySelector("#name");
const reasonList = document.querySelector("#Reasons");

// Set initial variables
let date = new Date().toISOString().slice(0, 19).replace('T', ' ');
let reasons = [];
let editingStatus = false;
let editReasonId;

// Set focus on the reasonName input field
reasonName.focus();

// Function to populate form fields for editing
const editReason = async (id) => {
    const reason = await getReasonsById(id);
    if (reason != undefined && reason != null) {
        reasonName.value = reason[0].reasonname;
        editingStatus = true;
        editReasonId = id;
        reasonName.focus();
    }
}

// Event listener for form submission
reasonForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    // Create a reason object from form data
    const reason = {
        reasonname: reasonName.value,
        created_at: date
    };

    try {
        if (editingStatus) {
            // If editing an existing reason, update it
            const updateReason = await updateReasons(editReasonId, reason);
            console.log(updateReason);
        } else {
            // If creating a new reason, save it
            const savedReason = await createReasons(reason);
            console.log(savedReason);
            editingStatus = false;
            editReasonId = "";
        }

        // Reset the form
        reasonForm.reset();
        reasonName.focus();
        getAndRenderReasons(); // Fetch and render reasons after adding a new one

    } catch (error) {
        console.error(error);
        reasonName.focus();
    }
});

// Function to handle reason deletion
const deleteReason = async (id) => {
    const response = confirm("Are you sure you want to delete this reason?");
    if (response) {
        await deleteReasons(id);
        await getAndRenderReasons();
        reasonName.focus();

    }
}

// Function to render reasons in a table
function renderReasons(reasons) {
    reasonList.innerHTML = ""; // Clear the current list

    if (Array.isArray(reasons)) {
        // Create a container for the table
        const tableContainer = document.createElement('div');
        tableContainer.classList.add('table-container');

        // Create a table element
        const reasonsTable = document.createElement('table');
        reasonsTable.classList.add('reasons-table');

        // Create table header
        const tableHeader = document.createElement('tr');
        const headers = ['ID', 'Reason Name', 'Actions'];
        headers.forEach(headerText => {
            const th = document.createElement('th');
            th.scope = "col";
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
            editButton.classList.add('btn', 'edit-icon', 'btn-sm');
            editButton.onclick = () => editReason(reason.id);

            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'Delete';
            deleteButton.classList.add('btn', 'delete-icon', 'btn-sm');
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
        reasonName.focus();
    } else if (reasons != undefined) {
        console.error("Reasons data is not an array:", reasons);
        reasonName.focus();
    } else {
        console.error("Reasons data is undefined.");
        reasonName.focus();
    }
}

// Function to fetch and render reasons
async function getAndRenderReasons() {
    try {
        const reasonsData = await getReasons();
        reasons = reasonsData;
        console.log("Your reasons:", reasons);
        renderReasons(reasons);
    } catch (error) {
        console.error(error);
    }
}

// Initial fetch and render when the page loads
document.addEventListener('DOMContentLoaded', () => {
    getAndRenderReasons();
    reasonName.focus();

});
