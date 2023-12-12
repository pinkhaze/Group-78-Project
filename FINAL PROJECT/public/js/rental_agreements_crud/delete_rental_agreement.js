// Citation for the following function:
// Date: 11/15/23
// Based on: nodejs-starter-app (Delete Data)
// Source URL: https://github.com/osu-cs340-ecampus/nodejs-starter-app/tree/main/Step%207%20-%20Dynamically%20Deleting%20Data

function deleteRentalAgreement(rentalAgreementID) {
    console.log('Clicked delete rental agreement button');
    let link = '/delete-rental-agreement-ajax/';
    let data = {
      id: rentalAgreementID
    };
  
    $.ajax({
      url: link,
      type: 'DELETE',
      data: JSON.stringify(data),
      contentType: "application/json; charset=utf-8",
      success: function(result) {
        deleteRow(rentalAgreementID);
      }
    });
  };
  
  function deleteRow(rentalAgreementID){
      let table = document.getElementById("rental-agreements-table");
      for (let i = 0, row; row = table.rows[i]; i++) {
         if (table.rows[i].getAttribute("data-value") == rentalAgreementID) {
              table.deleteRow(i);
              break;
         }
      }
  };
  