document.addEventListener("DOMContentLoaded", function () {

    // Event listener for the change event on the unit-id select element
    document.getElementById("utility-id-select").addEventListener("change", function () {
        let selectedUtilityID = document.getElementById("utility-id-select").value;
        if (selectedUtilityID == "") {
            location.reload()
            return;}
        // Fetch data for the selected provider
        fetch(`/providedUtilityID?id=${selectedUtilityID}`)
        .then((response) => response.json())
        .then((updatedDataArray) => {
        if (updatedDataArray.length > 0) {
            const updatedData = updatedDataArray[0];
            document.getElementById("unit-ID-select").value = parseInt(updatedData.unit_ID);
            document.getElementById("provider-ID-select").value = parseInt(updatedData.provider_ID);
        } else {
            console.error("Empty or invalid response array");
        }
    })
    .catch((error) => {
        console.error("Error fetching provided utility data", error);
    });})
});

function update(utility_ID) {
    fetch(`/providedUtilityID?id=${utility_ID}`)
        .then((response) => response.json())
        .then((updatedDataArray) => {
            if (updatedDataArray.length > 0) {
                const updatedData = updatedDataArray[0];
                
                let selectedUtilityID = utility_ID; 
                let utilityIdDropdown = document.getElementById("utility-id-select");
                utilityIdDropdown.value = selectedUtilityID;

                document.getElementById("unit-ID-select").value = parseInt(updatedData.unit_ID);
                document.getElementById("provider-ID-select").value = parseInt(updatedData.provider_ID);
            } else {
                console.error("Empty or invalid response array");
            }
        })
        .catch((error) => {
            console.error("Error fetching provided Utility data", error);
        });
};


// Get the form element
let updateProviderUtilityForm = document.getElementById('updateProvidedUtility');

updateProviderUtilityForm.addEventListener("submit", function (e) {
    // Prevent the form from submitting
    e.preventDefault();

    // Get form fields
    let utilityIDSelect = document.getElementById("utility-id-select");
    let unitIdSelect = document.getElementById("unit-ID-select");
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
