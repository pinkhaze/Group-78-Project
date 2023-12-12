// Citation for the following function:
// Date: 11/15/23
// Based on: nodejs-starter-app (Update Data)
// Source URL: https://github.com/osu-cs340-ecampus/nodejs-starter-app/tree/main/Step%207%20-%20Dynamically%20Deleting%20Data

document.addEventListener("DOMContentLoaded", function () {
    // Event listener for the change event on the assignment ID select element
    document.getElementById("update-assignment-id").addEventListener("change", function () {
        let selectedAssignmentID = document.getElementById("update-assignment-id").value;
        if (selectedAssignmentID === "") {
            location.reload();
            return;
        }
        // Fetch data for the selected assignment
        fetch(`/requestAssignmentID?id=${selectedAssignmentID}`)
            .then(response => response.json())
            .then(updatedDataArray => {
                if (updatedDataArray.length > 0) {
                    const updatedData = updatedDataArray[0];
                    document.getElementById("update-worker-id").value = updatedData.worker_ID;
                    document.getElementById("update-maintenance-request-id").value = updatedData.maintenance_request_ID;
                } else {
                    console.error("Empty or invalid response array");
                }
            })
            .catch(error => {
                console.error("Error fetching request assignment data", error);
            });
    });
});

function updateRequestAssignment(assignmentID) {
    fetch(`/requestAssignmentID?id=${assignmentID}`)
        .then((response) => response.json())
        .then((updatedDataArray) => {
            if (updatedDataArray.length > 0) {
                const updatedData = updatedDataArray[0];

                let selectedAssignmentID = assignmentID;
                let assignmentIdDropdown = document.getElementById("update-assignment-id");
                assignmentIdDropdown.value = selectedAssignmentID;

                document.getElementById("update-worker-id").value = updatedData.worker_ID;
                document.getElementById("update-maintenance-request-id").value = updatedData.maintenance_request_ID;
            } else {
                console.error("Empty or invalid response array");
            }
        })
        .catch((error) => {
            console.error("Error fetching request assignment data", error);
        });
};

// Event listener for form submission
document.getElementById("updateRequestAssignmentForm").addEventListener("submit", function (e) {
    e.preventDefault();

    // Get values from the form fields
    let assignmentID = document.getElementById("update-assignment-id").value;
    let workerID = document.getElementById("update-worker-id").value;
    let maintenanceRequestID = document.getElementById("update-maintenance-request-id").value;

    // Prepare data for the AJAX request
    let data = {
        assignment_ID: assignmentID,
        worker_ID: workerID,
        maintenance_request_ID: maintenanceRequestID
    };

    // Setup and send the AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("PUT", "/update-request-assignment", true);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState === 4) {
            if (xhttp.status === 200) {
                location.reload(); // Reload the page upon successful submission
            } else {
                console.error("There was an error with the input.");
            }
        }
    };
    xhttp.send(JSON.stringify(data));
});

// Function to reset the form
function resetForm() {
    location.reload(); // Reload the page to reset the form
}
