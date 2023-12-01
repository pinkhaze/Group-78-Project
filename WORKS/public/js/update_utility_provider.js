document.addEventListener("DOMContentLoaded", function () {

    // Event listener for the change event on the provider-id select element
    document.getElementById("provider-id").addEventListener("change", function () {
        let selectedProviderId = document.getElementById("provider-id").value;
        if (selectedProviderId == "") {
            location.reload()
            return;}
        // Fetch data for the selected provider
        fetch(`/providersID?id=${selectedProviderId}`)
        .then((response) => response.json())
        .then((updatedDataArray) => {
        if (updatedDataArray.length > 0) {
            const updatedData = updatedDataArray[0];
            document.getElementById("name").value = updatedData.name;
            document.getElementById("service-type").value = updatedData.service_type || '';
            document.getElementById("utility-cost").value = parseInt(updatedData.utility_cost);
        } else {
            console.error("Empty or invalid response array");
        }
    })
    .catch((error) => {
        console.error("Error fetching utility provider data", error);
    });})
});

function update(provider_ID) {
    fetch(`/providersID?id=${provider_ID}`)
        .then((response) => response.json())
        .then((updatedDataArray) => {
            if (updatedDataArray.length > 0) {
                const updatedData = updatedDataArray[0];
                
                let selectedProviderID = provider_ID; 
                let providerIdDropdown = document.getElementById("provider-id");
                providerIdDropdown.value = selectedProviderID;

                document.getElementById("name").value = updatedData.name;
                document.getElementById("service-type").value = updatedData.service_type || '';
                document.getElementById("utility-cost").value = parseInt(updatedData.utility_cost);
            } else {
                console.error("Empty or invalid response array");
            }
        })
        .catch((error) => {
            console.error("Error fetching utility provider data", error);
        });
}


// Get the form element
let updateUtilityProviderForm = document.getElementById('updateUtilityProviderForm');

updateUtilityProviderForm.addEventListener("submit", function (e) {
    // Prevent the form from submitting
    e.preventDefault();

    // Get form fields
    let providerIdSelect = document.getElementById("provider-id");
    let providerNameInput = document.getElementById("name");
    let serviceTypeSelect = document.getElementById("service-type");
    let utilityCostInput = document.getElementById("utility-cost");

    // Get values from the form fields
    let providerIdValue = providerIdSelect.value;
    let providerNameValue = providerNameInput.value;
    let serviceTypeValue = serviceTypeSelect.value;
    let utilityCostValue = utilityCostInput.value;

    // Check for NULL or empty values
    if (!providerIdValue || !providerNameValue || serviceTypeValue === "blank" || !utilityCostValue) {
        console.log("Please fill in all fields.");
        return;
    }

    // Prepare data for AJAX request
    let data = {
        providerId: providerIdValue,
        providerName: providerNameValue,
        serviceType: serviceTypeValue,
        utilityCost: utilityCostValue,
    };

    // Setup AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("PUT", "/update-utility-provider", true);
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
