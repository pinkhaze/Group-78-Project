// document.addEventListener("DOMContentLoaded", function () {
//     // Event listener
//     document.getElementById("update-agreement-id").addEventListener("change", function () {
//         let selectedRentalID = document.getElementById("update-agreement-id").value;
//         if (selectedRentalID == "") {
//             location.reload();
//             return;
//         }
//         // Callback function to update rental agreement form
//         updateRentalAgreement(selectedRentalID);
//     });

//     // Function to update the rental agreement form
//     function updateRentalAgreement(rental_ID) {
//         fetch(`/rental-agreements?id=${rental_ID}`)
//             .then((response) => response.json())
//             .then((updatedDataArray) => {
//                 if (updatedDataArray.length > 0) {
//                     const updatedData = updatedDataArray[0];
//                     document.getElementById("input-unit-id-update").value = updatedData.unit_ID;
//                     document.getElementById("input-tenant-id-update").value = updatedData.tenant_ID;
//                     document.getElementById("input-start-date-update").value = updatedData.start_date;
//                     document.getElementById("input-end-date-update").value = updatedData.end_date;
//                     document.getElementById("input-total-rent-balance-update").value = updatedData.total_rent_balance;
//                     document.getElementById("input-security-deposit-update").value = updatedData.security_deposit;
//                 } else {
//                     console.error("Empty or invalid response");
//                 }
//             })
//             .catch((error) => {
//                 console.error("Error fetching data", error);
//             });
//     }

//     document.getElementById("update-rental-agreement-form-ajax").addEventListener("submit", function (e) {
//         e.preventDefault();

//         // Get data
//         const formData = {
//             rental_ID: document.getElementById("rental-id-update").value,
//             unit_ID: document.getElementById("input-unit-id-update").value,
//             tenant_ID: document.getElementById("input-tenant-id-update").value,
//             start_date: document.getElementById("input-start-date-update").value,
//             end_date: document.getElementById("input-end-date-update").value,
//             total_rent_balance: document.getElementById("input-total-rent-balance-update").value,
//             security_deposit: document.getElementById("input-security-deposit-update").value
//         };

//         fetch(`/update-rental-agreement`, {
//             method: 'PUT',
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//             body: JSON.stringify(formData),
//         })
//             .then((response) => response.json())
//             .then((updatedData) => {
//                 console.log('Rental agreement updated successfully:', updatedData);

//             })
//             .catch((error) => {
//                 console.error('Error updating rental agreement:', error);
//             });
//     });
// });