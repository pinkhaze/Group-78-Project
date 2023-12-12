// Citation for the following function:
// Date: 11/15/23
// Based on: nodejs-starter-app (Add new data)
// Source URL: https://github.com/osu-cs340-ecampus/nodejs-starter-app/tree/main/Step%205%20-%20Adding%20New%20Data

const addRequestAssignmentForm = document.getElementById("add-request-assignment-form");

addRequestAssignmentForm.addEventListener("submit", function (e) {
    // Prevent the default form submission
    e.preventDefault();

    console.log("Add Request Assignment form submitted");

    // Get form fields
    let workerIdInput = document.getElementById("input-worker-id");
    let maintenanceRequestIdInput = document.getElementById("input-maintenance-request-id");

    // Get values from the form fields
    let workerIdValue = workerIdInput.value;
    let maintenanceRequestIdValue = maintenanceRequestIdInput.value;

    // Check for empty values
    if (!workerIdValue || !maintenanceRequestIdValue) {
        console.log("Please fill in all fields.");
        return;
    }

    // Prepare data for AJAX request
    let data = {
        worker_ID: workerIdValue,
        maintenance_request_ID: maintenanceRequestIdValue,
    };

    // Setup AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", "/add-request-assignment-form", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Define AJAX callback function
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4) {
            if (xhttp.status == 200) {
                location.reload(); // Reload the page upon successful submission
            } else {
                console.error("There was an error with the input.");
            }
        }
    };

    // Send the AJAX request
    xhttp.send(JSON.stringify(data));
});
