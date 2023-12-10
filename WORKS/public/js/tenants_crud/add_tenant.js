// Citation for the following function:
// Date: 11/15/23
// Based on: nodejs-starter-app (Add new data)
// Source URL: https://github.com/osu-cs340-ecampus/nodejs-starter-app/tree/main/Step%205%20-%20Adding%20New%20Data

const addTenantForm = document.getElementById("add-tenant-form");

addTenantForm.addEventListener("submit", function (e) {
    e.preventDefault();

    console.log("Clicked Add Tenant button.");

    let firstNameInput = document.getElementById("input-first-name");
    let lastNameInput = document.getElementById("input-last-name");
    let phoneNumberInput = document.getElementById("input-phone-number");
    let emailInput = document.getElementById("input-email");
    let rentBalanceInput = document.getElementById("input-rent-balance");

    let firstNameValue = firstNameInput.value;
    let lastNameValue = lastNameInput.value;
    let phoneNumberValue = phoneNumberInput.value;
    let emailValue = emailInput.value;
    let rentBalanceValue = rentBalanceInput.value;

    if (!firstNameValue || !lastNameValue || !phoneNumberValue || !emailValue || !rentBalanceValue) {
        console.log("Please fill in all fields.");
        return;
    }

    let data = {
        first_name: firstNameValue,
        last_name: lastNameValue,
        phone_number: phoneNumberValue,
        email: emailValue,
        rent_balance: rentBalanceValue,
    };

    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", "/add-tenant-form", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4) {
            if (xhttp.status == 200) {
                location.reload(); 
            } else {
                console.error("There was an error with the input.");
            }
        }
    };

    xhttp.send(JSON.stringify(data));
});
