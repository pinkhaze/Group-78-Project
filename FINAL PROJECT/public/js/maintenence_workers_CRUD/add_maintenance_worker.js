// Citation for the following function:
// Date: 11/15/23
// Based on: nodejs-starter-app (Add new data)
// Source URL: https://github.com/osu-cs340-ecampus/nodejs-starter-app/tree/main/Step%205%20-%20Adding%20New%20Data

// addMaintenaceWorker is the form id for adding a new maintenance worker
var addMaintenaceWorker = document.getElementById("add-maintenance-worker-form");

addMaintenaceWorker.addEventListener("submit", function (e) {
    // Prevent the default form submission
    e.preventDefault();

    console.log("Add Maintenance Worker form submitted");

    // Get form fields
    let firstNameInput = document.getElementById("first-name");
    let lastNameInput = document.getElementById("last-name");
    let phoneInput = document.getElementById("phone");
    let payRateInput = document.getElementById("pay-rate");
    let qualificationInput = document.getElementById("qualification");
    let hoursWorkedInput = document.getElementById("hours-worked");
   
    // Get values from the form fields
    let firstNameValue = firstNameInput.value;
    let lastNameValue = lastNameInput.value;
    let phoneValue = phoneInput.value;
    let payRateValue = payRateInput.value;
    let qualificationValue = qualificationInput.value;
    let hoursWorkedValue = hoursWorkedInput.value;

    // Prepare data for AJAX request
    let data = {
        first_name: firstNameValue,
        last_name: lastNameValue,
        phone: phoneValue,
        pay_rate: payRateValue,
        qualification: qualificationValue,
        hours_worked: hoursWorkedValue
    };

    // Setup AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", "/add-maintenance-worker-form", true);
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

// Function to reset the form
function resetForm() {
    location.reload(); // Reload the page to reset the form
}
