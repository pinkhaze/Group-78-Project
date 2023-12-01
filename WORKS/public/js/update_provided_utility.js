document.addEventListener("DOMContentLoaded", function () {

    // Event listener for the change event on the unit-id select element
    document.getElementById("utility-ID").addEventListener("change", function () {
        let selectedUtilityID = document.getElementById("utility-ID").value;
        if (selectedUtilityID == "") {
            location.reload()
            return;}
        // Fetch data for the selected provider
        fetch(`/utilityID?id=${selectedUtilityID}`)
        .then((response) => response.json())
        .then((updatedDataArray) => {
        if (updatedDataArray.length > 0) {
            const updatedData = updatedDataArray[0];
            document.getElementById("unit-ID").value = parseInt(updatedData.unit_ID);
            document.getElementById("provider-ID").value = parseInt(updatedData.provider_ID);
        } else {
            console.error("Empty or invalid response array");
        }
    })
    .catch((error) => {
        console.error("Error fetching provided utility data", error);
    });})
});

function update(utilityID) {
    fetch(`/utilityID?id=${utilityID}`)
        .then((response) => response.json())
        .then((updatedDataArray) => {
            if (updatedDataArray.length > 0) {
                const updatedData = updatedDataArray[0];
                
                let selectedUtilityID = utilityID; 
                let utilityIdDropdown = document.getElementById("utility-id");
                utilityIdDropdown.value = selectedUtilityID;

                document.getElementById("unit-ID").value = parseInt(updatedData.unit_ID);
                document.getElementById("provider-ID").value = parseInt(updatedData.provider_ID);
            } else {
                console.error("Empty or invalid response array");
            }
        })
        .catch((error) => {
            console.error("Error fetching provided Utility data", error);
        });
}


// Get the form element
let updateProviderUtilityForm = document.getElementById('update-provided-utility');

updateProviderUtilityForm.addEventListener("submit", function (e) {
    // Prevent the form from submitting
    e.preventDefault();

    // Get form fields
    let utilityIDSelect = document.getElementById("utility-ID");
    let unitIdSelect = document.getElementById("unit-ID");
    let providerIdSelect = document.getElementById("provider-ID");

    // Get values from the form fields
    let utilityIDValue = utilityIDSelect.value;
    let unitIDValue = utilityIDSelect.value;
    let providerIdValue = providerIdSelect.value;

    // Prepare data for AJAX request
    let data = {
        utility_ID: utilityIDValue,
        unit_ID: unitIDValue,
        provider_ID: providerIdValue
    };

    // Setup AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("PUT", "/update-provided-utility", true);
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
