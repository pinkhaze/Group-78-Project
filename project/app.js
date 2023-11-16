const db = require('./database/db-connector')
const express = require('express'); 
const { engine } = require('express-handlebars');    

const app = express();            
const PORT = process.env.PORT || 3001;

app.engine('.hbs', engine({extname: ".hbs"}));  
app.set('view engine', '.hbs');  

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(express.static('public'))

// ROUTES

// GET ROUTE for displaying index page
app.get('/', function(req, res)
    {
        res.render('index');
    });

// GET ROUTE for displaying all utility providers
app.get('/utility-providers', function(req, res) {
    let query = "SELECT * FROM UtilityProviders;";
    db.pool.query(query, function(error, rows, fields) {
        res.render('utility-providers', { data: rows });
    });
});

// POST ROUTE for adding utility provider
app.post('/add-utility-provider-form', function(req, res) {
    let data = req.body;

    let query = `INSERT INTO UtilityProviders (provider_name, service_type, utility_cost) VALUES ('${data['input-provider-name']}', '${data['input-service-type']}', ${data['input-utility-cost']})`;
    db.pool.query(query, function(error, rows, fields) {
        if (error) {
            console.log(error);
            res.sendStatus(400); 
        } else {
            res.redirect('utility-providers');
        }
    });
}); 

// GET ROUTE for rendering the update form
app.get('/load-utility-provider/:id', function(req, res) {
    let providerID = parseInt(req.params.id);

    // Fetch all provider IDs from the database
    let providerIDsQuery = "SELECT provider_ID FROM UtilityProviders;";
    db.pool.query(providerIDsQuery, function(error, rows, fields) {
        if (error) {
            console.error(error);
            res.status(500).send('Internal Server Error: Unable to fetch provider IDs.'); 
        } else {
            // Render the form with the fetched provider IDs
            res.render('update-utility-provider-form', { providerIDs: rows, selectedProviderID: providerID });
        }
    });
});

// PUT ROUTE for updating a utility provider by id
app.put('/update-utility-provider/:id', function(req, res) {
    let data = req.body;
    let providerID = parseInt(req.params.id);

    let updateQuery = `UPDATE UtilityProviders 
                       SET provider_name = '${data['name']}', 
                           service_type = '${data['service-type']}', 
                           utility_cost = '${data['utility-cost']}' 
                       WHERE provider_ID = ${providerID}`;

    db.pool.query(updateQuery, function(error, rows, fields) {
        if (error) {
            console.error(error);
            res.status(500).send('Internal Server Error: Unable to update utility provider.'); 
        } else {
            res.sendStatus(204); // No Content (successful update)
        }
    });
});


// DELETE ROUTE for deleting a utility provider by id
app.delete('/delete-utility-provider-ajax', function(req, res) {
    let data = req.body;
    let providerID = parseInt(data.id);

    let deleteQuery = "DELETE FROM UtilityProviders WHERE provider_ID = ?";

    db.pool.query(deleteQuery, [providerID], function(error, rows, fields) {
        if (error) {
            console.log(error);
            res.sendStatus(500); 
        } else {
            res.sendStatus(204); 
        }
    });
});

app.listen(PORT, function(){     
    console.log('Express started on http://localhost:' + PORT + '; press Ctrl-C to terminate.')
});