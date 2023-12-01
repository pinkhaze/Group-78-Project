// add-unit-form is the form id for adding a new utility provider
var addMaintenanceRequestForm = document.getElementById("add-maintenance-request-form");

addMaintenanceRequestForm.addEventListener("submit", function (e) {
    // Prevent the default form submission
    e.preventDefault();

    console.log("Add maintenance request form submitted");

    // Get form fields
    let unitIDInput = document.getElementById("input-unit-ID");
    let tenantIDInput = document.getElementById("input-tenant-ID");
    let descriptionInput = document.getElementById("input-description");
    let dateSubmittedInput = document.getElementById("input-date-submitted");
    let timeToCompleteInput = document.getElementById("input-time-to-complete");
    let repairCostInput = document.getElementById("input-repair-cost");
    let isClosedInput = document.getElementById("input-is-closed");
   

    // Get values from the form fields
    let unitIDValue = unitIDInput.value;
    let tenantIDValue = tenantIDInput.value;
    let descriptionValue = descriptionInput.value;
    let dateSubmittedValue = dateSubmittedInput.value;
    let timeToCompleteValue = timeToCompleteInput.value;
    let repairCostValue = repairCostInput.value;
    let isClosedValue = isClosedInput.value;


    // Prepare data for AJAX request
    let data = {
        unit_ID: unitIDValue,
        tenant_ID: tenantIDValue,
        description: descriptionValue,
        date_submitted: dateSubmittedValue,
        time_to_complete: timeToCompleteValue,
        repair_cost: repairCostValue,
        is_closed: isClosedValue
    };

    // Setup AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", "/add-maintenance-request-form", true);
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
