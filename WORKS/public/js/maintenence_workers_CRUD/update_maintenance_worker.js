// Citation for the following function:
// Date: 11/15/23
// Based on: nodejs-starter-app (Update Data)
// Source URL: https://github.com/osu-cs340-ecampus/nodejs-starter-app/tree/main/Step%207%20-%20Dynamically%20Deleting%20Data

document.addEventListener("DOMContentLoaded", function () {

    // Event listener for the change event on the worker-id select element
    document.getElementById("worker-id-update").addEventListener("change", function () {
        let selectedWorkerID = document.getElementById("worker-id-update").value;
        if (selectedWorkerID == "") {
            location.reload()
            return;}
        // Fetch data for the selected provider
        fetch(`/workerID?id=${selectedWorkerID}`)
        .then((response) => response.json())
        .then((updatedDataArray) => {
        if (updatedDataArray.length > 0) {
            const updatedData = updatedDataArray[0];
            document.getElementById("first-name-update").value= updatedData.first_name;
            document.getElementById("last-name-update").value= updatedData.last_name;
            document.getElementById("phone-update").value= updatedData.phone;
            document.getElementById("pay-rate-update").value= updatedData.pay_rate;
            document.getElementById("qualification-update").value= updatedData.qualification;
            document.getElementById("hours-worked-update").value= updatedData.hours_worked;
        } else {
            console.error("Empty or invalid response array");
        }
    })
    .catch((error) => {
        console.error("Error fetching maintenance worker data", error);
    });})
});

function update(worker_ID) {
    fetch(`/workerID?id=${worker_ID}`)
        .then((response) => response.json())
        .then((updatedDataArray) => {
            if (updatedDataArray.length > 0) {
                const updatedData = updatedDataArray[0];
                
                let selectedWorkerID = worker_ID; 
                let workerIdDropdown = document.getElementById("worker-id-update");
                workerIdDropdown.value = selectedWorkerID;

                document.getElementById("first-name-update").value= updatedData.first_name;
                document.getElementById("last-name-update").value= updatedData.last_name;
                document.getElementById("phone-update").value= updatedData.phone;
                document.getElementById("pay-rate-update").value= updatedData.pay_rate;
                document.getElementById("qualification-update").value= updatedData.qualification;
                document.getElementById("hours-worked-update").value= updatedData.hours_worked;
            } else {
                console.error("Empty or invalid response array");
            }
        })
        .catch((error) => {
            console.error("Error fetching maintenance worker data", error);
        });
}

// Get the form element
let updateMaintenanceWorkerForm = document.getElementById('updateMaintenanceWorkerForm');

updateMaintenanceWorkerForm.addEventListener("submit", function (e) {
    // Prevent the form from submitting
    e.preventDefault();

    // Get form fields
    let workerIDSelect = document.getElementById("worker-id-update");
    let firstNameInput = document.getElementById("first-name-update");
    let lastNameInput = document.getElementById("last-name-update");
    let phoneInput = document.getElementById("phone-update");
    let payRateInput = document.getElementById("pay-rate-update");
    let qualificationInput = document.getElementById("qualification-update");
    let hoursWorkedInput = document.getElementById("hours-worked-update");

    // Get values from the form fields
    let workerIDValue = workerIDSelect.value;
    let firstNameValue = firstNameInput.value;
    let lastNameValue = lastNameInput.value;
    let phoneValue = phoneInput.value;
    let payRateValue = payRateInput.value;
    let qualificationValue = qualificationInput.value;
    let hoursWorkedValue = hoursWorkedInput.value;

    
    // Prepare data for AJAX request
    let data = {
        worker_ID: workerIDValue,
        first_name: firstNameValue,
        last_name: lastNameValue,
        phone: phoneValue,
        pay_rate: payRateValue,
        qualification: qualificationValue,
        hours_worked: hoursWorkedValue
    };

    // Setup AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("PUT", "/update-maintenance-worker", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Define AJAX callback function
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4) {
            if (xhttp.status == 200) {
                // Update the table row with the new data
                location.reload();
            } else {
                console.error("There was an error with the input.");
            }
        }
    };

    // Send the AJAX request
    xhttp.send(JSON.stringify(data));
});

// Function to reset the form
function resetForm() {
    location.reload()
};
