var addRentalAgreementForm = document.getElementById("add-rental-agreement-form");

addRentalAgreementForm.addEventListener("submit", function (e) {
    // Prevent the default form submission
    e.preventDefault();

    console.log("Add Rental Agreement form submitted");

    // Get form fields
    let unitIdInput = document.getElementById("input-unit-id");
    let tenantIdInput = document.getElementById("input-tenant-id");
    let startDateInput = document.getElementById("input-start-date");
    let endDateInput = document.getElementById("input-end-date");
    let totalRentBalanceInput = document.getElementById("input-total-rent-balance");
    let securityDepositInput = document.getElementById("input-security-deposit");

    // Get values from the form fields
    let unitIdValue = unitIdInput.value;
    let tenantIdValue = tenantIdInput.value;
    let startDateValue = startDateInput.value;
    let endDateValue = endDateInput.value;
    let totalRentBalanceValue = totalRentBalanceInput.value;
    let securityDepositValue = securityDepositInput.value;

    // Check for NULL or empty values
    if (!unitIdValue || !tenantIdValue || !startDateValue || !endDateValue || !totalRentBalanceValue || !securityDepositValue) {
        console.log("Please fill in all fields.");
        return;
    }

    // Prepare data for AJAX request
    let data = {
        unit_ID: unitIdValue,
        tenant_ID: tenantIdValue,
        start_date: startDateValue,
        end_date: endDateValue,
        total_rent_balance: totalRentBalanceValue,
        security_deposit: securityDepositValue,
    };

    // Setup AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", "/add-rental-agreement-form", true);
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
