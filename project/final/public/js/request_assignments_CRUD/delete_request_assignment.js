function deleteRequestAssignment(assignmentID) {
    console.log('Clicked delete request assignment button');
    let link = '/delete-request-assignment/' + assignmentID;

    $.ajax({
        url: link,
        type: 'DELETE',
        contentType: "application/json; charset=utf-8",
        success: function () {
            deleteRow(assignmentID);
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.error("Error deleting assignment:", textStatus, errorThrown);
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
};