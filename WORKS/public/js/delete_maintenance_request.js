// Citation for the following function:
// Date: 11/15/23
// Based on: nodejs-starter-app
// Source URL: https://github.com/osu-cs340-ecampus/nodejs-starter-app/tree/main/Step%207%20-%20Dynamically%20Deleting%20Data

function deleteMaintenanceRequest(maintenanceRequestID) {
  console.log('Clicked delete button');
  let link = '/delete-maintenance-request-ajax/';
  let data = {
    id: maintenanceRequestID
  };

  $.ajax({
    url: link,
    type: 'DELETE',
    data: JSON.stringify(data),
    contentType: "application/json; charset=utf-8",
    success: function(result) {
      deleteRow(maintenanceRequestID);
    }
  });
};

function deleteRow(maintenanceRequestID){
    let table = document.getElementById("maintenance-requests-table");
    for (let i = 0, row; row = table.rows[i]; i++) {
       if (table.rows[i].getAttribute("data-value") == maintenanceRequestID) {
            table.deleteRow(i);
            break;
       }
    }
    location.reload();
};

