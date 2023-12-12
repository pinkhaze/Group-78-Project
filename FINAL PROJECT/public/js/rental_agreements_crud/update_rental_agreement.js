// Citation for the following function:
// Date: 11/15/23
// Based on: nodejs-starter-app (Update Data)
// Source URL: https://github.com/osu-cs340-ecampus/nodejs-starter-app/tree/main/Step%207%20-%20Dynamically%20Deleting%20Data

document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("rental-agreement-id").addEventListener("change", function () {
        let selectedRentalAgreementId = document.getElementById("rental-agreement-id").value;
        if (selectedRentalAgreementId === "") {
            location.reload();
            return;
        }
        fetchRentalAgreementData(selectedRentalAgreementId);
    });
});

function fetchRentalAgreementData(rentalAgreementId) {
    fetch(`/rentalAgreementsID?id=${rentalAgreementId}`)
        .then((response) => response.json())
        .then((updatedRentalAgreementArray) => {
            if (updatedRentalAgreementArray.length > 0) {
                const updatedRentalAgreement = updatedRentalAgreementArray[0];
                let selectedRentalAgreementId = rentalAgreementId;
                let rentalAgreementIdInput = document.getElementById("rental-agreement-id");
                rentalAgreementIdInput.value = selectedRentalAgreementId;
                document.getElementById("unit-id").value = updatedRentalAgreement.unit_number;
                document.getElementById("tenant-id").value = updatedRentalAgreement.tenant_ID;
             
                document.getElementById("start-date").value = formatDate(updatedRentalAgreement.start_date);
                document.getElementById("end-date").value = formatDate(updatedRentalAgreement.end_date);
                document.getElementById("total-rent-balance").value = updatedRentalAgreement.total_rent_balance;
                document.getElementById("security-deposit").value = parseFloat(updatedRentalAgreement.security_deposit);
            } else {
                console.error("Empty or invalid response array");
            }
        })
        .catch((error) => {
            console.error("Error fetching rental agreement data", error);
        });
}

function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toISOString().split('T')[0];
}

document.getElementById("updateRentalAgreementForm").addEventListener("submit", function (e) {
    e.preventDefault();

    // Extract values from the form fields
    const rentalAgreementIdInput = document.getElementById("rental-agreement-id");
    const unitIdInput = document.getElementById("unit-id");
    const tenantIdInput = document.getElementById("tenant-id");
    const startDateInput = document.getElementById("start-date");
    const endDateInput = document.getElementById("end-date");
    const totalRentBalanceInput = document.getElementById("total-rent-balance");
    const securityDepositInput = document.getElementById("security-deposit");

    // Construct data object with the extracted values
    const data = {
        rentalAgreementId: rentalAgreementIdInput.value,
        unitId: unitIdInput.value,
        tenantId: tenantIdInput.value,
        startDate: startDateInput.value,
        endDate: endDateInput.value,
        totalRentBalance: parseFloat(totalRentBalanceInput.value),
        securityDeposit: parseFloat(securityDepositInput.value),
    };

    // Send a PUT request to the server endpoint for updating rental agreements
    fetch("/update-rental-agreement", {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    })
    .then((response) => {
        if (response.ok) {
            return response.json();
        }
        throw new Error("There was an error with the input.");
    })
    .then(() => {
        location.reload();
    })
    .catch((error) => {
        console.error(error);
    });
});

// Function to reset the form
function resetForm() {
    location.reload()
};
