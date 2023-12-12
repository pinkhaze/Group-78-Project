// Citation for the following function:
// Date: 11/15/23
// Based on: nodejs-starter-app (Add new data)
// Source URL: https://github.com/osu-cs340-ecampus/nodejs-starter-app/tree/main/Step%205%20-%20Adding%20New%20Data

// add-unit-form is the form id for adding a new utility provider
var addUnitForm = document.getElementById("add-unit-form");

addUnitForm.addEventListener("submit", function (e) {
    // Prevent the default form submission
    e.preventDefault();

    console.log("Add Unit form submitted");

    // Get form fields
    let unitNumberInput = document.getElementById("input-unit-number");
    let isAvailableInput = document.getElementById("input-is-available");
    let numBedroomInput = document.getElementById("input-num-bedroom");
    let numBathroomInput = document.getElementById("input-num-bathroom");
    let squareFeetInput = document.getElementById("input-square-feet");
    let rentPriceInput = document.getElementById("input-rent-price");
    let previousYearIncomeInput = document.getElementById("input-previous-year-income");
    let yearInput = document.getElementById("year"); 

    // Get values from the form fields
    let unitNumberValue = unitNumberInput.value;
    let isAvailableValue = isAvailableInput.value;
    if (isAvailableValue === "Yes"){
        isAvailable = 1
    } else {
        isAvailable = 0
    };
    let numBedroomValue = numBedroomInput.value;
    let numBathroomValue = numBathroomInput.value;
    let squareFeetValue = squareFeetInput.value;
    let rentPriceValue = rentPriceInput.value;
    let previousYearIncomeValue = previousYearIncomeInput.value;
    let yearValue = yearInput.value; 


    // Prepare data for AJAX request
    let data = {
        unit_number: unitNumberValue,
        is_available: isAvailableValue,
        num_bedroom: numBedroomValue,
        num_bathroom: numBathroomValue,
        square_feet: squareFeetValue,
        rent_price: rentPriceValue,
        previous_year_income: previousYearIncomeValue,
        year: yearValue
    };

    // Setup AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", "/add-unit-form", true);
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
    console.log("Form reset functionality goes here.");
}
