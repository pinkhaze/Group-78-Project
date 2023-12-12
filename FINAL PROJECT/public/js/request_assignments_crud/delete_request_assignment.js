// Citation for the following function:
// Date: 11/15/23
// Based on: nodejs-starter-app (Delete Data)
// Source URL: https://github.com/osu-cs340-ecampus/nodejs-starter-app/tree/main/Step%207%20-%20Dynamically%20Deleting%20Data

function deleteRequestAssignment(assignmentID) {
    console.log('Clicked delete button');
    let link = '/deleteRequestAjax';
    let data = {
      id: assignmentID
    };
  
    $.ajax({
      url: link,
      type: 'DELETE',
      data: JSON.stringify(data),
      contentType: "application/json; charset=utf-8",
      success: function(result) {
        deleteRow(assignmentID);
      }
    });
  };
  

function deleteRow(assignmentID) {
    let table = document.getElementById("request-assignments-table");
    for (let i = 0; i < table.rows.length; i++) {
        if (table.rows[i].getAttribute("data-value") == assignmentID) {
            table.deleteRow(i);
            break;
        }
    }
    location.reload();
};