// addProvidedUtility is the form id for adding a new provided utility
var addProvidedUtilityForm = document.getElementById("add-provided-utility-form");

addProvidedUtilityForm.addEventListener("submit", function (e) {
    // Prevent the default form submission
    e.preventDefault();

    console.log("Add Provided Utility form submitted");

    // Get form fields
    let unitIDSelect = document.getElementById("input-unit-ID");
    let providedUtilitySelect = document.getElementById("input-provider-ID");
    

    // Get values from the form fields
    let unitIDValue = unitIDSelect.value;
    let providerIDValue = providedUtilitySelect.value;

    // Prepare data for AJAX request
    let data = {
        unit_ID: unitIDValue,
        provider_ID: providerIDValue
    };

    // Setup AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", "/add-provided-utility-form", true);
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
