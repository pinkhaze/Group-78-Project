document.addEventListener("DOMContentLoaded", function () {

    // Event listener for the change event on the maintenance-request-id select element
    document.getElementById("maintenance-request-ID").addEventListener("change", function () {
        let selectedMaintenanceRequestID = document.getElementById("maintenance-request-ID").value;
        if (selectedMaintenanceRequestID == "") {
            location.reload()
            return;}
        // Fetch data for the selected provider
        fetch(`/maintenanceRequestID?id=${selectedMaintenanceRequestID}`)
        .then((response) => response.json())
        .then((updatedDataArray) => {
        if (updatedDataArray.length > 0) {
            const updatedData = updatedDataArray[0];
            document.getElementById("unit-ID").value = updatedData.unit_ID;
            document.getElementById("tenant-ID").value = updatedData.tenant_ID;
            document.getElementById("description").value = updatedData.description;
            document.getElementById("date-submitted").value = updatedData.date_submitted;
            document.getElementById("time-to-complete").value = updatedData.time_to_complete;
            document.getElementById("repair-cost").value = updatedData.repair_cost;
            document.getElementById("is-closed").value = updatedData.is_closed;
        } else {
            console.error("Empty or invalid response array");
        }
    })
    .catch((error) => {
        console.error("Error fetching maintenance request data", error);
    });})
});

function update(maintenanceRequestID) {
    fetch(`/maintenanceRequestID?id=${maintenanceRequestID}`)
        .then((response) => response.json())
        .then((updatedDataArray) => {
            if (updatedDataArray.length > 0) {
                const updatedData = updatedDataArray[0];
                
                let selectedMaintenanceRequestID = maintenanceRequestID; 
                let maintenanceRequestIDDropdown = document.getElementById("maintenance-request-ID");
                maintenanceRequestIDDropdown.value = selectedMaintenanceRequestID;

                document.getElementById("unit-ID").value = updatedData.unit_ID;
                document.getElementById("tenant-ID").value = updatedData.tenant_ID;
                document.getElementById("description").value = updatedData.description;
                document.getElementById("date-submitted").value = updatedData.date_submitted;
                document.getElementById("time-to-complete").value = updatedData.time_to_complete;
                document.getElementById("repair-cost").value = updatedData.repair_cost;
                document.getElementById("is-closed").value = updatedData.is_closed;
            } else {
                console.error("Empty or invalid response array");
            }
        })
        .catch((error) => {
            console.error("Error fetching Maitenance Request data", error);
        });
}


// Get the form element
let updateMaintenanceRequest = document.getElementById('updateMaintenanceRequest');

updateMaintenanceRequest.addEventListener("submit", function (e) {
    // Prevent the form from submitting
    e.preventDefault();

    // Get form fields
    let maintenanceRequestIDInput = document.getElementById("maintenance-request-ID");
    let unitIDInput = document.getElementById("unit-ID");
    let tenantIDInput = document.getElementById("tenant-ID");
    let descriptionInput = document.getElementById("description");
    let dateSubmittedInput = document.getElementById("date-submitted");
    let timeToCompleteInput = document.getElementById("time-to-complete");
    let repairCostInput = document.getElementById("repair-cost");
    let isClosedInput = document.getElementById("is-closed");

    // Get values from the form fields
    let maintenanceRequestIDValue = maintenanceRequestIDInput.value;
    let unitIDValue = unitIDInput.value;
    let tenantIDValue = tenantIDInput.value;
    let descriptionValue = descriptionInput.value;
    let dateSubmittedValue = dateSubmittedInput.value;
    let timeToCompleteValue = timeToCompleteInput.value;
    let repairCostValue = repairCostInput.value;
    let isClosedValue = isClosedInput.value;


    // Prepare data for AJAX request
    let data = {
        maintenance_request_ID: maintenanceRequestIDValue,
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
    xhttp.open("PUT", "/update-maintenance-request", true);
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
