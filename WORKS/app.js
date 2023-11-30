/*
    SETUP
*/

// Import express module
const express = require('express'); 
const path = require('path');
// Import express-handlebars module
const { engine } = require('express-handlebars');
const exphbs = require('express-handlebars'); 
// Import database
const db = require('./database/db-connector')

// Instantiate an express object to interact with the server
const app = express();            
// Set a port number
PORT = 3999; 

// Middleware 
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'assets')));
              
// Create an instance of the handlebars engine to process templates
app.engine('.hbs', engine({extname: ".hbs"})); 
// Tell express to use the handlebars engine whenever it encounters a *.hbs file.
app.set('view engine', '.hbs'); 

/*
    ROUTES
*/

// GET ROUTE for displaying index page
app.get('/', function(req, res)
    {
        const pageTitle = "Metropolis Property Management";
        res.render('index', { title: pageTitle });
    });

// GET ROUTE for displaying all utility providers
app.get('/utility-providers', function(req, res) {
    let query = "SELECT * FROM UtilityProviders;";
    db.pool.query(query, function(error, rows, fields) {
        const pageTitle = "Utility Providers";
        res.render('utility-providers', { data: rows, title: pageTitle });
    });
});

app.get('/providersID', function(req, res){
    let query = "SELECT name, service_type, utility_cost FROM UtilityProviders WHERE provider_ID = ?";
    let providerID = parseInt(req.query.id)
   db.pool.query(query, [providerID], function(error, results, fields) {
        if (error) {
            console.error("Error executing query:", error);
            res.status(500).json({ error: "Internal Server Error" });
        } else {
                res.json(results);
        }
    });
});

// POST ROUTE for adding utility provider
app.post('/add-utility-provider-form', function(req, res) {
    let data = req.body;

    if (!data || !data.name || !data.service_type || !data.utility_cost) {
        console.log("Missing required fields");
        return res.sendStatus(400);  // Bad Request
    }

    // Ensure that the utility cost is a valid number
    let utilityCost = parseFloat(data.utility_cost);
    let name = data.name
    let serviceType = data.service_type

    let query = `INSERT INTO UtilityProviders (name, service_type, utility_cost) VALUES (?, ?, ?)`;
    console.log(name)
    
    db.pool.query(query, [name, serviceType, utilityCost], function(error, rows, fields) {
        if (error) {
            console.error(error);
            return res.sendStatus(500); // Internal Server Error
        } else {
            console.log("Utility provider added successfully");
            res.sendStatus(200); // OK
        }
    });
});

// PUT ROUTE for updating a utility provider by id
app.put('/update-utility-provider', function(req, res) {
    let data = req.body;

    let providerID = parseInt(data.providerId);
    let providerName = data.providerName;
    let serviceType = data.serviceType;
    let utilityCost = parseInt(data.utilityCost);

    if (isNaN(providerID) || isNaN(utilityCost)) {
        res.status(400).send(`Invalid entry`);
        return;
    }

    let selectUtilityProvider = 'SELECT * FROM UtilityProviders WHERE provider_ID = ?';
    let updateQuery = `UPDATE UtilityProviders 
                   SET name = ?, 
                       service_type = ?, 
                       utility_cost = ? 
                   WHERE provider_ID = ?`;

    let updateValues = [providerName, serviceType, isNaN(utilityCost) ? null : utilityCost, providerID];

    db.pool.query(updateQuery, updateValues, function(error, rows, fields) {
        if (error) {
            console.error(error);
            res.status(500).send('Internal Server Error: Unable to update utility provider.'); 
        } else {
            db.pool.query(selectUtilityProvider, [providerID], function(error, rows, fields) {
                if (error) {
                    console.log(error);
                    res.sendStatus(400);
                } else {
                    res.send(rows);
                }
            });
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

// GET ROUTE for displaying Tenants page
app.get('/tenants', function(req, res) {
    const pageTitle = "Tenants";
    res.render('tenants', { title: pageTitle });
});

// GET ROUTE for displaying Units page
app.get('/units', function(req, res) {
    const pageTitle = "Units";
    res.render('units', { title: pageTitle });
});

/****************************************** RENTAL AGREEMENTS ************************************************/

app.get('/rental-agreements', function (req, res) {
    let query1 = 
        `SELECT 
            RentalAgreements.rental_ID, 
            Units.unit_number, 
            CONCAT(Tenants.first_name, ' ', Tenants.last_name) AS tenant_name,
            RentalAgreements.start_date, 
            RentalAgreements.end_date, 
            RentalAgreements.total_rent_balance, 
            RentalAgreements.security_deposit
            FROM RentalAgreements
        LEFT JOIN Units ON RentalAgreements.unit_ID = Units.unit_ID
        LEFT JOIN Tenants ON RentalAgreements.tenant_ID = Tenants.tenant_ID;`;
  
    let query2 = `SELECT * FROM Units;`;
  
    let query3 = `SELECT * FROM Tenants;`;
  
    db.pool.query(query1, function (error, rentalAgreements, fields) {
      db.pool.query(query2, function (error, units, fields) {
        db.pool.query(query3, function (error, tenants, fields) {

            const pageTitle = "Rental Agreements";
            res.render('rental-agreements', {
              rentalAgreements: rentalAgreements,
              units: units,
              tenants: tenants,
              title: pageTitle
            });
        });
      });
    });
  });

// GET ROUTE for displaying Provided Utilities page
app.get('/provided-utilities', function(req, res) {
    const pageTitle = "Provided Utilities";
    res.render('provided-utilities', { title: pageTitle });
});

// GET ROUTE for displaying Maintenance Requests page
app.get('/maintenance-requests', function(req, res) {
    const pageTitle = "Maintenance Requests";
    res.render('maintenance-requests', { title: pageTitle });
});

// GET ROUTE for displaying Maintenance Workers page
app.get('/maintenance-workers', function(req, res) {
    const pageTitle = "Maintenance Workers";
    res.render('maintenance-workers', { title: pageTitle });
});

// GET ROUTE for displaying Request Assignments page
app.get('/request-assignments', function(req, res) {
    const pageTitle = "Request Assignments";
    res.render('request-assignments', { title: pageTitle });
});

app.listen(PORT, function(){     
    console.log('Express started on http://localhost:' + PORT + '; press Ctrl-C to terminate.')
});