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

    // Check for NULL values
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
                updateRow(xhttp.response, providerIdValue);
            } else {
                console.log("There was an error with the input.");
            }
        }
    };

    // Send the AJAX request
    xhttp.send(JSON.stringify(data));
});

// Function to update the table row
function updateRow(data, providerId) {
    let parsedData = JSON.parse(data);
    let table = document.getElementById("utility-provider-table");

    for (let i = 0, row; row = table.rows[i]; i++) {
        if (table.rows[i].getAttribute("data-value") == providerId) {
            let updateRowIndex = table.getElementsByTagName("tr")[i];
            // Assuming the structure of your table, adjust the index accordingly
            let tdName = updateRowIndex.getElementsByTagName("td")[1];
            let tdServiceType = updateRowIndex.getElementsByTagName("td")[2];
            let tdUtilityCost = updateRowIndex.getElementsByTagName("td")[3];

            // Update table cells with new data
            tdName.innerHTML = parsedData.providerName;
            tdServiceType.innerHTML = parsedData.serviceType;
            tdUtilityCost.innerHTML = parsedData.utilityCost;
        }
    }
};

// Function to reset the form
function resetForm() {
    // Implement the reset logic here if needed
    console.log("Form reset functionality goes here.");
};
  