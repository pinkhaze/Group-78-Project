// Citation for the following function:
// Date: 11/15/23
// Based on: nodejs-starter-app (Add new data)
// Source URL: https://github.com/osu-cs340-ecampus/nodejs-starter-app/tree/main/Step%205%20-%20Adding%20New%20Data

// addProvidedUtility is the form id for adding a new provided utility
var addProvidedUtilityForm = document.getElementById("add-provided-utility-form");

addProvidedUtilityForm.addEventListener("submit", function (e) {
    // Prevent the default form submission
    e.preventDefault();

    console.log("Add Provided Utility form submitted");

    // Get form fields
    let unitIDSelect = document.getElementById("unit-id-select");
    let providedUtilitySelect = document.getElementById("provider-id-select");
    

    // Get values from the form fields
    let unitIDValue = unitIDSelect.value;
    let providerIDValue = providedUtilitySelect.value;

    // Prepare data for AJAX request
    let data = {
        unit_ID: unitIDValue,
        provider_ID: providerIDValue
    };

    // Setup AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", "/add-provided-utility-form", true);
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
