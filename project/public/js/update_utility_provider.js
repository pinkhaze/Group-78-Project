function populateForm() {
    let selectedProviderID = $("#providerID").val();
    
    $.ajax({
      url: '/load-utility-provider/:' + selectedProviderID, 
      type: 'GET',
      success: function(data) {
        $("#name").val(data.name);
        $("#servicetype").val(data.service_type);
        $("#utilitycost").val(data.utility_cost);
      },
      error: function(error) {
        console.error("Error fetching utility provider data:", error);
      }
    });
  };

  function updateUtilityProvider(providerID) {
    console.log('Clicked update button');
    let link = '/update-utility-provider-ajax/:' + providerID;

    let formData = {
        name: document.getElementById('name').value,
        servicetype: document.getElementById('servicetype').value,
        utilitycost: document.getElementById('utilitycost').value
    };

    $.ajax({
        url: link,
        type: 'PUT',
        data: JSON.stringify(formData),
        contentType: "application/json; charset=utf-8",
        success: function(result) {
            updateRow(providerID, formData);
        },
        error: function(error) {
            console.error("Error updating utility provider:", error);
        }
    });
};

function updateRow(providerID, updatedData) {
    let table = document.getElementById("utility-providers-table");
    for (let i = 0, row; row = table.rows[i]; i++) {
        if (table.rows[i].getAttribute("data-value") == providerID) {
            // Update the row with the new data
            table.rows[i].cells[1].innerText = updatedData.name;
            table.rows[i].cells[2].innerText = updatedData.servicetype;
            table.rows[i].cells[3].innerText = updatedData.utilitycost;
            break;
        }
    }
};


function resetForm() {
    document.getElementById("updateUtilityProviderForm").reset();
};


  