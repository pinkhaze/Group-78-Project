// Citation for the following function:
// Date: 11/15/23
// Based on: nodejs-starter-app
// Source URL: https://github.com/osu-cs340-ecampus/nodejs-starter-app/tree/main/Step%207%20-%20Dynamically%20Deleting%20Data

function deleteTenant(tenantID) {
    console.log('Clicked delete tenant button');
    let link = '/delete-tenant-ajax/';
    let data = {
      id: tenantID
    };
  
    $.ajax({
      url: link,
      type: 'DELETE',
      data: JSON.stringify(data),
      contentType: "application/json; charset=utf-8",
      success: function(result) {
        deleteRow(tenantID);
      }
    });
  };
  
  function deleteRow(tenantID){
      let table = document.getElementById("tenants-table");
      for (let i = 0, row; row = table.rows[i]; i++) {
         if (table.rows[i].getAttribute("data-value") == tenantID) {
              table.deleteRow(i);
              break;
         }
      }
  };
  