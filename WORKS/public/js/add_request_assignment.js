// addRequestAssignment is the form id for adding a new request assignment
var addRequestAssignment = document.getElementById("add-request-assignment-form");

addRequestAssignment.addEventListener("submit", function (e) {
    // Prevent the default form submission
    e.preventDefault();

    console.log("Add Request Assignment form submitted");

    // Get form fields
    let workerIDSelect = document.getElementById("input-worker-ID");
    let maintenanceIDSelect = document.getElementById("input-maintenance-request-ID");
    

    // Get values from the form fields
    let workerIDValue = workerIDSelect.value;
    let maintenanceRequestIDValue = maintenanceIDSelect.value;

    // Prepare data for AJAX request
    let data = {
        worker_ID: workerIDValue,
        maintenance_request_ID: maintenanceRequestIDValue
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

// Function to reset the form
function resetForm() {
    location.reload(); // Reload the page to reset the form
}
