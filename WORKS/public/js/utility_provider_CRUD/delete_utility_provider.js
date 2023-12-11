// Citation for the following function:
// Date: 11/15/23
// Based on: nodejs-starter-app
// Source URL: https://github.com/osu-cs340-ecampus/nodejs-starter-app/tree/main/Step%207%20-%20Dynamically%20Deleting%20Data

function deleteUtilityProvider(providerID) {
    console.log('Clicked delete button');
    let link = '/delete-utility-provider-ajax/';
    let data = {
      id: providerID
    };
  
    $.ajax({
      url: link,
      type: 'DELETE',
      data: JSON.stringify(data),
      contentType: "application/json; charset=utf-8",
      success: function(result) {
        deleteRow(providerID);
      }
    });
  };
  
  function deleteRow(providerID){
      let table = document.getElementById("utility-providers-table");
      for (let i = 0, row; row = table.rows[i]; i++) {
         if (table.rows[i].getAttribute("data-value") == providerID) {
              table.deleteRow(i);
              break;
         }
      }
      location.reload();
  };
  