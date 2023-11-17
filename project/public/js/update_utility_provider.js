// Get the form element
let updateUtilityProviderForm = document.getElementById('updateUtilityProviderForm');

// Add event listener for form submission
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

providerIdSelect.addEventListener("change", function () {
    // Get the selected providerId
    let selectedProviderId = providerIdSelect.value;
    var dataRequest = new XMLHttpRequest();
    dataRequest.open("GET", `/utility-providers?id=${selectedProviderId}`, true);
    dataRequest.onreadystatechange = function () {
        if (dataRequest.readyState == 4 && dataRequest.status == 200) {
            let data = JSON.parse(dataRequest.responseText);

            // Prepopulate the form fields with fetched data
            providerNameInput.value = data.providerName;
            serviceTypeSelect.value = data.serviceType;
            utilityCostInput.value = data.utilityCost;
        }
    };
    dataRequest.send();
});


// Function to update the table row
function updateRow(data, providerId) {
    try {
        let parsedData = JSON.parse(data);
        let table = document.getElementById("utility-provider-table");

        for (let i = 0, row; row = table.rows[i]; i++) {
            if (row.getAttribute("data-value") == providerId) {
                let tdName = row.getElementsByTagName("td")[1];
                let tdServiceType = row.getElementsByTagName("td")[2];
                let tdUtilityCost = row.getElementsByTagName("td")[3];

                // Update table cells with new data
                tdName.innerHTML = parsedData.providerName;
                tdServiceType.innerHTML = parsedData.serviceType;
                tdUtilityCost.innerHTML = parsedData.utilityCost;

                // Optionally, reset the form after successful update
                updateUtilityProviderForm.reset();
            }
        }
    } catch (error) {
        console.error("Error updating table row:", error);
    }
}

// Function to reset the form
function resetForm() {
    // Implement the reset logic here if needed
    console.log("Form reset functionality goes here.");
}
