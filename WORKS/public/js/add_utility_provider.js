// addUtilityProviderForm is the form id for adding a new utility provider
var addUtilityProviderForm = document.getElementById("add-utility-provider-form");

addUtilityProviderForm.addEventListener("submit", function (e) {
    // Prevent the default form submission
    e.preventDefault();

    console.log("Add Utility Provider form submitted");

    // Get form fields
    let providerNameInput = document.getElementById("input-provider-name");
    let serviceTypeSelect = document.getElementById("input-service-type");
    let utilityCostInput = document.getElementById("input-utility-cost");

    // Get values from the form fields
    let providerNameValue = providerNameInput.value;
    let serviceTypeValue = serviceTypeSelect.value;
    let utilityCostValue = utilityCostInput.value;

    // Check for NULL or empty values
    if (!providerNameValue || serviceTypeValue === "blank" || !utilityCostValue) {
        console.log("Please fill in all fields.");
        return;
    }

    // Prepare data for AJAX request
    let data = {
        name: providerNameValue,
        service_type: serviceTypeValue,
        utility_cost: utilityCostValue,
    };

    // Setup AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", "/add-utility-provider-form", true);
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
