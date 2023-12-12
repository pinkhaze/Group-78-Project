// Citation for the following function:
// Date: 11/15/23
// Based on: nodejs-starter-app (Update Data)
// Source URL: https://github.com/osu-cs340-ecampus/nodejs-starter-app/tree/main/Step%207%20-%20Dynamically%20Deleting%20Data

document.addEventListener("DOMContentLoaded", function () {

    // Event listener for the change event on the unit-id select element
    document.getElementById("utility-id-update").addEventListener("change", function () {
        let selectedUtilityID = document.getElementById("utility-id-update").value;
        if (selectedUtilityID == "") {
            location.reload()
            return;}
        // Fetch data for the selected provider
        fetch(`/providedUtilityID?id=${selectedUtilityID}`)
        .then((response) => response.json())
        .then((updatedDataArray) => {
        if (updatedDataArray.length > 0) {
            const updatedData = updatedDataArray[0];
            document.getElementById("unit-ID-update").value = parseInt(updatedData.unit_ID);
            document.getElementById("provider-ID-update").value = parseInt(updatedData.provider_ID);
        } else {
            console.error("Empty or invalid response array");
        }
    })
    .catch((error) => {
        console.error("Error fetching provided utility data", error);
    });})
});




function update(utility_ID) {
    // Fetch data for the selected provider
    fetch(`/providedUtilityID?id=${utility_ID}`)
    .then((response) => response.json())
    .then((updatedDataArray) => {
    if (updatedDataArray.length > 0) {

        let selectedUtilityID = utility_ID; 
        let utilityIdDropdown = document.getElementById("utility-id-update");
        utilityIdDropdown.value = selectedUtilityID;


        const updatedData = updatedDataArray[0];
        document.getElementById("unit-ID-update").value = parseInt(updatedData.unit_ID);
        document.getElementById("provider-ID-update").value = parseInt(updatedData.provider_ID);
    } else {
        console.error("Empty or invalid response array");
    }
})
.catch((error) => {
    console.error("Error fetching provided utility data", error);
});
};


// Get the form element
let updateProviderUtilityForm = document.getElementById('updateProvidedUtility');

updateProviderUtilityForm.addEventListener("submit", function (e) {
    // Prevent the form from submitting
    e.preventDefault();

    // Get form fields
    let utilityIDSelect = document.getElementById("utility-id-update");
    let unitIdSelect = document.getElementById("unit-ID-update");
    let providerIdSelect = document.getElementById("provider-ID-select");

    // Get values from the form fields
    let utilityIDValue = utilityIDSelect.value;
    let unitIDValue = unitIdSelect.value;
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
