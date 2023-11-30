document.addEventListener("DOMContentLoaded", function () {

    // Event listener for the change event on the provider-id select element
    document.getElementById("unit-id").addEventListener("change", function () {
        let selectedUnitID = document.getElementById("unit-id").value;
        if (selectedUnitID == "") {
            location.reload()
            return;}
        // Fetch data for the selected provider
        fetch(`/unitID?id=${selectedunitID}`)
        .then((response) => response.json())
        .then((updatedDataArray) => {
        if (updatedDataArray.length > 0) {
            const updatedData = updatedDataArray[0];
            document.getElementById("unit-number").value = updatedData.unit_number;
            document.getElementById("is-available").value = updatedData.is_available;
            document.getElementById("num-beroom").value = updatedData.num_bedroom;
            document.getElementById("num-bathroom").value = updatedData.num_bathroom;
            document.getElementById("square-feet").value = updatedData.square_feet;
            document.getElementById("rent-price").value = updatedData.rent_price;
            document.getElementById("previous-year-income").value = updatedData.previous_year_income;
            document.getElementById("year").value = updatedData.year;
        } else {
            console.error("Empty or invalid response array");
        }
    })
    .catch((error) => {
        console.error("Error fetching utility provider data", error);
    });})
});

function update(unit_ID) {
    fetch(`/unitsID?id=${unit_ID}`)
        .then((response) => response.json())
        .then((updatedDataArray) => {
            if (updatedDataArray.length > 0) {
                const updatedData = updatedDataArray[0];
                
                let selectedunitID = unit_ID; 
                let unitIDDropdown = document.getElementById("unit-id");
                unitIDDropdown.value = selectedunitID;

                document.getElementById("unit-number").value = updatedData.unit_number;
                document.getElementById("is-available").value = updatedData.is_available;
                document.getElementById("num-bedroom").value = updatedData.num_bedroom;
                document.getElementById("num-bathroom").value = updatedData.num_bathroom;
                document.getElementById("square-feet").value = updatedData.square_feet;
                document.getElementById("rent-price").value = updatedData.rent_price;
                document.getElementById("previous-year-income").value = updatedData.previous_year_income;
                document.getElementById("year").value = updatedData.year;
            } else {
                console.error("Empty or invalid response array");
            }
        })
        .catch((error) => {
            console.error("Error fetching unit data", error);
        });
}


// Get the form element
let updateUnitForm = document.getElementById('updateUnitForm');

updateUnitForm.addEventListener("submit", function (e) {
    // Prevent the form from submitting
    e.preventDefault();

    // Get form fields
    let unitIDSelect = document.getElementById("unit-id");
    let unitNumberInput = document.getElementById("unit-number");
    let isAvailableSelect = document.getElementById("is-available");
    let numBedroomInput = document.getElementById("num-bedroom");
    let numBathroomInput = document.getElementById("num-bathroom");
    let squareFeetInput = document.getElementById("square-feet");
    let rentPriceInput = document.getElementById("rent-price");
    let previousYearIncomeInput = document.getElementById("previous-year-income");
    let yearInput = document.getElementById("year");

    // Get values from the form fields
    let unitIDValue = unitIDSelect.value;
    let unitNumberValue = unitNumberInput.value;
    let isAvailableValue = isAvailableSelect.value;
    let numBedroomValue = numBedroomInput.value;
    let numBathroomValue = numBathroomInput.value;
    let squareFeetValue = squareFeetInput.value;
    let rentPriceValue = rentPriceInput.value;
    let previousYearIncomeValue = previousYearIncomeInput.value;
    let yearValue = yearInput.value;


    // Prepare data for AJAX request
    let data = {
        unit_ID: unitIDValue,
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
    xhttp.open("PUT", "/update-unit", true);
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
    console.log("Form reset functionality goes here.");
};
