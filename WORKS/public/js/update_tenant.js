document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("tenant-id").addEventListener("change", function () {
        let selectedTenantId = document.getElementById("tenant-id").value;
        if (selectedTenantId === "") {
            location.reload();
            return;
        }
        fetchTenantData(selectedTenantId);
    });
});

function fetchTenantData(tenantId) {
    fetch(`/tenantsID?id=${tenantId}`)
        .then((response) => response.json())
        .then((updatedDataArray) => {
            if (updatedDataArray.length > 0) {
                const updatedData = updatedDataArray[0];
                let selectedTenantID = tenantId;
                let tenantIdDropdown = document.getElementById("tenant-id");
                tenantIdDropdown.value = selectedTenantID;
                document.getElementById("first-name").value = updatedData.first_name;
                document.getElementById("last-name").value = updatedData.last_name;
                document.getElementById("phone-number").value = updatedData.phone_number;
                document.getElementById("email").value = updatedData.email;
                document.getElementById("rent-balance").value = parseFloat(updatedData.rent_balance);
            } else {
                console.error("Empty or invalid response array");
            }
        })
        .catch((error) => {
            console.error("Error fetching tenant data", error);
        });
}

document.getElementById("updateTenantForm").addEventListener("submit", function (e) {
    e.preventDefault();

    const tenantIdSelect = document.getElementById("tenant-id");
    const firstNameInput = document.getElementById("first-name");
    const lastNameInput = document.getElementById("last-name");
    const phoneNumberInput = document.getElementById("phone-number");
    const emailInput = document.getElementById("email");
    const rentBalanceInput = document.getElementById("rent-balance");

    const tenantIdValue = tenantIdSelect.value;
    const firstNameValue = firstNameInput.value;
    const lastNameValue = lastNameInput.value;
    const phoneNumberValue = phoneNumberInput.value;
    const emailValue = emailInput.value;
    const rentBalanceValue = parseFloat(rentBalanceInput.value);

    if (!tenantIdValue || !firstNameValue || !lastNameValue || !phoneNumberValue || !emailValue || isNaN(rentBalanceValue)) {
        console.log("Please fill in all fields.");
        return;
    }

    const data = {
        tenantId: tenantIdValue,
        firstName: firstNameValue,
        lastName: lastNameValue,
        phoneNumber: phoneNumberValue,
        email: emailValue,
        rentBalance: rentBalanceValue,
    };

    fetch("/update-tenant", {
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