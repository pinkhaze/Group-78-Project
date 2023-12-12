// Citation for the following function:
// Date: 11/15/23
// Based on: nodejs-starter-app (Update Data)
// Source URL: https://github.com/osu-cs340-ecampus/nodejs-starter-app/tree/main/Step%207%20-%20Dynamically%20Deleting%20Data

document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("maintenance-request-id").addEventListener("change", function () {
        const selectedMaintenanceRequestId = document.getElementById("maintenance-request-id").value;
        if (selectedMaintenanceRequestId === "") {
            location.reload();
            return;
        }
        fetchMaintenanceRequestData(selectedMaintenanceRequestId);
    });
    
});

function fetchMaintenanceRequestData(maintenanceRequestId) {
    fetch(`/maintenanceRequestsID?id=${maintenanceRequestId}`)
        .then((response) => {
            if (!response.ok) {
                throw new Error("Failed to fetch maintenance request data");
            }
            return response.json();
        })
        .then(([updatedMaintenanceRequest]) => {
            if (updatedMaintenanceRequest) {
                updateFormFields(updatedMaintenanceRequest);
            } else {
                console.error("Empty or invalid response array");
            }
        })
        .catch((error) => {
            console.error("Error fetching maintenance request data", error);
        });
}

function updateFormFields(updatedMaintenanceRequest) {
    const {
        maintenance_request_ID,
        unit_number,
        tenant_ID,
        description,
        date_submitted,
        time_to_complete,
        repair_cost,
        is_closed,
    } = updatedMaintenanceRequest;

    document.getElementById("maintenance-request-id").value = maintenance_request_ID;
    document.getElementById("unit-id").value = unit_number;
    document.getElementById("tenant-id").value = tenant_ID;
    document.getElementById("description").value = description;
    document.getElementById("date-submitted").value = formatDate(date_submitted);
    document.getElementById("time-to-complete").value = time_to_complete;
    document.getElementById("repair-cost").value = parseFloat(repair_cost);
    document.getElementById("is-closed-update").value = parseInt(is_closed);
}

function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toISOString().split('T')[0];
}

document.getElementById("updateMaintenanceRequestForm").addEventListener("submit", async function (e) {
    e.preventDefault();

    try {
        const data = extractFormData();
        await sendUpdateRequest(data);
        location.reload();
    } catch (error) {
        console.error(error);
    }
});

function extractFormData() {
    return {
        maintenanceRequestId: document.getElementById("maintenance-request-id").value,
        unitId: document.getElementById("unit-id").value,
        tenantId: document.getElementById("tenant-id").value,
        description: document.getElementById("description").value,
        dateSubmitted: document.getElementById("date-submitted").value,
        timeToComplete: document.getElementById("time-to-complete").value,
        repairCost: parseFloat(document.getElementById("repair-cost").value),
        isClosed: document.getElementById("is-closed-update").value,
    };
}

async function sendUpdateRequest(data) {
    const response = await fetch("/update-maintenance-request", {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });

    if (!response.ok) {
        throw new Error("There was an error with the input.");
    }
}

