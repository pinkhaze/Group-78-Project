document.addEventListener("DOMContentLoaded", function () {
    // Event listener for the "Edit" button
    document.getElementById("edit-button").addEventListener("click", function () {
        let selectedRentalID = document.getElementById("rental-id").value;
        if (selectedRentalID == "") {
            location.reload();
            return;
        }
        // Call function to update rental agreement form
        updateRentalAgreement(selectedRentalID);
    });

    // Function to update the rental agreement form
    function updateRentalAgreement(rental_ID) {
        // Fetch data for the selected rental agreement
        fetch(`/rental-agreements?id=${rental_ID}`)
            .then((response) => response.json())
            .then((updatedDataArray) => {
                if (updatedDataArray.length > 0) {
                    const updatedData = updatedDataArray[0];
                    document.getElementById("input-unit-id-update").value = updatedData.unit_ID;
                    document.getElementById("input-tenant-id-update").value = updatedData.tenant_ID;
                    document.getElementById("input-start-date-update").value = updatedData.start_date;
                    document.getElementById("input-end-date-update").value = updatedData.end_date;
                    document.getElementById("input-total-rent-balance-update").value = updatedData.total_rent_balance;
                    document.getElementById("input-security-deposit-update").value = updatedData.security_deposit;
                } else {
                    console.error("Empty or invalid response array");
                }
            })
            .catch((error) => {
                console.error("Error fetching rental agreement data", error);
            });
    }

    // Form submission event listener for rental agreement update
    document.getElementById("update-rental-agreement-form-ajax").addEventListener("submit", function (e) {
        e.preventDefault();

        // Collect form data
        const formData = {
            rental_ID: document.getElementById("rental-id-update").value,
            unit_ID: document.getElementById("input-unit-id-update").value,
            tenant_ID: document.getElementById("input-tenant-id-update").value,
            start_date: document.getElementById("input-start-date-update").value,
            end_date: document.getElementById("input-end-date-update").value,
            total_rent_balance: document.getElementById("input-total-rent-balance-update").value,
            security_deposit: document.getElementById("input-security-deposit-update").value
        };

        // Send Ajax request for updating rental agreement
        fetch(`/update-rental-agreement`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        })
            .then((response) => response.json())
            .then((updatedData) => {
                // Handle success, e.g., update the UI with the new data
                console.log('Rental agreement updated successfully:', updatedData);

                // Reset the form
                resetUpdateForm();
            })
            .catch((error) => {
                console.error('Error updating rental agreement:', error);
            });
    });

    // Function to reset the update form
    function resetUpdateForm() {
        location.reload();
        console.log("Form reset functionality goes here.");
    }
});