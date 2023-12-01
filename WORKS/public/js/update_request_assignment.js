document.addEventListener("DOMContentLoaded", function () {

    // Event listener for the change event on the assignment-ID select element
    document.getElementById("assignment-ID").addEventListener("change", function () {
        let selectedAssignmentID = document.getElementById("assignment-ID").value;
        if (selectedAssignmentID == "") {
            location.reload()
            return;}
        // Fetch data for the selected provider
        fetch(`/assignmentID?id=${selectedAssignmentID}`)
        .then((response) => response.json())
        .then((updatedDataArray) => {
        if (updatedDataArray.length > 0) {
            const updatedData = updatedDataArray[0];
            document.getElementById("worker-ID").value = parseInt(updatedData.worker_ID);
            document.getElementById("maintenance-request-ID") = parseInt(updatedData.maintenance_request_ID);
        } else {
            console.error("Empty or invalid response array");
        }
    })
    .catch((error) => {
        console.error("Error fetching request assignment data", error);
    });})
});

function update(assignmentID) {
    fetch(`/assignmentID?id=${assignmentID}`)
        .then((response) => response.json())
        .then((updatedDataArray) => {
            if (updatedDataArray.length > 0) {
                const updatedData = updatedDataArray[0];
                
                let selectedAssignmentID = assignmentID; 
                let assignmentIDDropdown = document.getElementById("assignment-id");
                assignmentIDDropdown.value = selectedAssignmentID;

                document.getElementById("worker-ID").value = parseInt(updatedData.worker_ID);
                document.getElementById("maintenance-request-ID").value = parseInt(updatedData.maintenance_request_ID);
            } else {
                console.error("Empty or invalid response array");
            }
        })
        .catch((error) => {
            console.error("Error fetching request assignment data", error);
        });
}


// Get the form element
let updateRequestAssigment = document.getElementById('updateRequestAssignment');

updateRequestAssigment.addEventListener("submit", function (e) {
    // Prevent the form from submitting
    e.preventDefault();

    // Get form fields
    let assignmentIDSelect = document.getElementById("assignment-ID");
    let workerIDSelect = document.getElementById("worker-ID");
    let maintenaceRequestIDSelect = document.getElementById("maintenance-request-ID");

    // Get values from the form fields
    let assignmentIDValue = assignmentIDSelect.value;
    let workerIDValue = workerIDSelect.value;
    let maintenaceRequestIDValue = maintenaceRequestIDSelect.value;

    // Prepare data for AJAX request
    let data = {
        assignment_ID: assignmentIDValue,
        worker_ID: workerIDValue,
        maintenance_request_ID: maintenaceRequestIDValue
    };

    // Setup AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("PUT", "/update-request-assignment", true);
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
