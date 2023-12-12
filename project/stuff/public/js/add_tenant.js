// Assuming addTenantForm is the form id for adding a new tenant
var addTenantForm = document.getElementById("add-tenant-form");

addTenantForm.addEventListener("submit", function (e) {
    // Prevent the default form submission
    e.preventDefault();

    console.log("Clicked Add Tenant button.");

    // Get form fields
    let firstNameInput = document.getElementById("input-first-name");
    let lastNameInput = document.getElementById("input-last-name");
    let phoneNumberInput = document.getElementById("input-phone-number");
    let emailInput = document.getElementById("input-email");
    let rentBalanceInput = document.getElementById("input-rent-balance");

    // Get values from the form fields
    let firstNameValue = firstNameInput.value;
    let lastNameValue = lastNameInput.value;
    let phoneNumberValue = phoneNumberInput.value;
    let emailValue = emailInput.value;
    let rentBalanceValue = rentBalanceInput.value;

    // Check for NULL or empty values
    if (!firstNameValue || !lastNameValue || !phoneNumberValue || !emailValue || !rentBalanceValue) {
        console.log("Please fill in all fields.");
        return;
    }

    // Prepare data for AJAX request
    let data = {
        first_name: firstNameValue,
        last_name: lastNameValue,
        phone_number: phoneNumberValue,
        email: emailValue,
        rent_balance: rentBalanceValue,
    };

    // Setup AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", "/add-tenant-form", true);
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
