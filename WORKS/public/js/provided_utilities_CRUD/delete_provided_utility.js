// Citation for the following function:
// Date: 11/15/23
// Based on: nodejs-starter-app
// Source URL: https://github.com/osu-cs340-ecampus/nodejs-starter-app/tree/main/Step%207%20-%20Dynamically%20Deleting%20Data

function deleteMaintenanceWorker(workerID) {
  console.log('Clicked delete button');
  let link = '/delete-maintenance-worker-ajax/';
  let data = {
    id: workerID
  };

  $.ajax({
    url: link,
    type: 'DELETE',
    data: JSON.stringify(data),
    contentType: "application/json; charset=utf-8",
    success: function(result) {
      deleteRow(workerID);
    }
  });
};

function deleteRow(workerID){
    let table = document.getElementById("maintenence-workers-table");
    for (let i = 0, row; row = table.rows[i]; i++) {
       if (table.rows[i].getAttribute("data-value") == workerID) {
            table.deleteRow(i);
            break;
       }
    }
    location.reload();
};
