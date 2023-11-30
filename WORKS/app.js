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

/****************************************** Units ************************************************/
/// GET ROUTE for displaying all units
app.get('/unit', function(req, res) {
    let query = "SELECT * FROM Units;";
    db.pool.query(query, function(error, rows, fields) {
        const pageTitle = "Units";
        res.render('units', { data: rows, title: pageTitle });
    });
});

/// Load Unit before Update
app.get('/unitsID', function(req, res){
    let query = "SELECT unit_number, is_available, num_bedroom, num_bathroom, square_feet, unit_number, rent_price, previous_year_income, year FROM Units WHERE unit_ID = ?";
    let unitID = parseInt(req.query.id)
   db.pool.query(query, [unitID], function(error, results, fields) {
        if (error) {
            console.error("Error executing query:", error);
            res.status(500).json({ error: "Internal Server Error" });
        } else {
                res.json(results);
        }
    });
});

// POST ROUTE for adding unit
app.post('/add-unit-form', function(req, res) {
    let data = req.body;

    // Ensure that the utility cost is a valid number
    let unitNumber = parseInt(data.unit_number);
    let isAvailable = Boolean(Number(data.is_available));
    let numBedroom = parseInt(data.num_bedroom);
    let numBathroom = parseInt(data.num_bathroom);
    let squareFeet = parseInt(data.square_feet);
    let rentPrice = parseFloat(data.rent_price);
    let previousYearIncome = parseFloat(data.previous_year_income);
    let year = parseInt(data.year);

    let query = `INSERT INTO Units (is_available, num_bedroom, num_bathroom, square_feet, unit_number, rent_price, previous_year_income, year) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;
    
    db.pool.query(query, [isAvailable, numBedroom, numBathroom, squareFeet, unitNumber, rentPrice,previousYearIncome, year], function(error, rows, fields) {
        if (error) {
            console.error(error);
            return res.sendStatus(500); // Internal Server Error
        } else {
            console.log("Unit added successfully");
            res.sendStatus(200); // OK
        }
    });
});

// PUT ROUTE for updating a unit by id
app.put('/update-unit', function(req, res) {
    let data = req.body;

    let unitID = parseInt(data.unit_ID);
    let isAvailable = Boolean(Number(data.is_available));
    let numBedroom = parseInt(data.num_bedroom);
    let numBathroom = parseInt(data.num_bathroom);
    let squareFeet = parseInt(data.square_feet);
    let rentPrice = parseFloat(data.rent_price);
    let previousYearIncome = parseFloat(data.previous_year_income);
    let year = parseInt(data.year);

   
    let selectUnit = 'SELECT * FROM Units WHERE unit_ID = ?';
    let updateQuery = `UPDATE Units 
                   SET is_availabe = ?,
                       num_bedroom = ?,
                       num_bathroom = ?,
                       square_feet = ?,
                       unit_number = ?,
                       rent_price = ?,
                       previous_year_income = ?,
                       year = ?
                   WHERE unit_ID = ?`;

    let updateValues = [isAvailable, numBedroom, numBathroom, squareFeet, unitNumber, rentPrice, previousYearIncome, year];

    db.pool.query(updateQuery, updateValues, function(error, rows, fields) {
        if (error) {
            console.error(error);
            res.status(500).send('Internal Server Error: Unable to update utility provider.'); 
        } else {
            db.pool.query(selectUnit, [unitID], function(error, rows, fields) {
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
app.delete('/delete-unit-ajax', function(req, res) {
    let data = req.body;
    let unitID = parseInt(data.id);

    let deleteQuery = "DELETE FROM Units WHERE unit_ID = ?";

    db.pool.query(deleteQuery, [unitID], function(error, rows, fields) {
        if (error) {
            console.log(error);
            res.sendStatus(500); 
        } else {
            res.sendStatus(204); 
        }
    });
});

/****************************************** Maintenance Workers ************************************************/

// GET ROUTE for displaying all utility providers
app.get('/maintenance-workers', function(req, res) {
    let query = "SELECT * FROM MaintenanceWorkers;";
    db.pool.query(query, function(error, rows, fields) {
        const pageTitle = "Maintenance Workers";
        res.render('maintenance-workers', { data: rows, title: pageTitle });
    });
});

/// Load Maintenance Worker before Update
app.get('/workersID', function(req, res){
    let query = "SELECT first_name, last_name, phone, pay_rate, qualification, hours_worked FROM MaintenanceWorkers WHERE worker_ID = ?";
    let workerID = parseInt(req.query.id)
   db.pool.query(query, [workerID], function(error, results, fields) {
        if (error) {
            console.error("Error executing query:", error);
            res.status(500).json({ error: "Internal Server Error" });
        } else {
                res.json(results);
        }
    });
});

// POST ROUTE for adding maintenance worker
app.post('/add-maintenance-worker-form', function(req, res) {
    let data = req.body;

    // Ensure data is correct
    let firstName = data.first_name;
    let lastName = data.last_name;
    let phone = data.phone;
    let payRate = parseFloat(data.pay_rate);
    let qualification = data.qualification;
    let hoursWorked = parseFloat(data.hours_worked);

    let query = `INSERT INTO MaintenanceWorkers (first_name, last_name, phone, pay_rate, qualfication, hours_worked) VALUES (?, ?, ?, ?, ?, ?)`;
    console.log(name)
    
    db.pool.query(query, [firstName, lastName, phone, payRate, qualification, hoursWorked], function(error, rows, fields) {
        if (error) {
            console.error(error);
            return res.sendStatus(500); // Internal Server Error
        } else {
            console.log("Maintenance Worker added successfully");
            res.sendStatus(200); // OK
        }
    });
});

// PUT ROUTE for updating a maintenance worker by id
app.put('/update-maintenance-worker', function(req, res) {
    let data = req.body;
    let workerID = parseInt(data.worker_ID);
    let firstName = data.first_name;
    let lastName = data.last_name;
    let phone = data.phone;
    let payRate = parseFloat(data.pay_rate);
    let qualifcation = data.qualifcation;
    let hoursWorked = parstFloat(data.hours_worked);

    let selectedMaitnenanceWorker = 'SELECT * FROM MaintenanceWorker WHERE worker_ID = ?';
    let updateQuery = `UPDATE MaintenanceWorkers 
                   SET first_name = ?, 
                       last_name = ?,
                       phone = ?,
                       pay_rate = ?,
                       qualification = ?,
                       hours_worked = ?
                   WHERE worker_ID = ?`;

    let updateValues = [firstName, lastName, phone, payRate, qualifcation, hoursWorked];

    db.pool.query(updateQuery, updateValues, function(error, rows, fields) {
        if (error) {
            console.error(error);
            res.status(500).send('Internal Server Error: Unable to update Maintenance Worker.'); 
        } else {
            db.pool.query(selectedMaitnenanceWorker, [workerID], function(error, rows, fields) {
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

// DELETE ROUTE for deleting a Maintenance Worker by id
app.delete('/delete-maintenance-worker-ajax', function(req, res) {
    let data = req.body;
    let workerID = parseInt(data.id);

    let deleteQuery = "DELETE FROM MaintenanceWorkers WHERE worker_ID = ?";

    db.pool.query(deleteQuery, [workerID], function(error, rows, fields) {
        if (error) {
            console.log(error);
            res.sendStatus(500); 
        } else {
            res.sendStatus(204); 
        }
    });
});


/****************************************** Utility Providers ************************************************/

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

/****************************************** TENANTS ************************************************/

// GET ROUTE for displaying all tenants
app.get('/tenants', function(req, res) {
    let query = "SELECT * FROM Tenants;";

    db.pool.query(query, function(error, rows, fields) {
        if (error) {
            console.error("Error fetching tenants:", error);
            res.status(500).send("Internal Server Error");
            return;
        }

        const pageTitle = "Tenants";
        res.render('tenants', { data: rows, title: pageTitle });
    });
});

app.get('/tenantsID', function(req, res) {
    // SQL query to select specific fields for a tenant based on tenant_ID
    let query = "SELECT first_name, last_name, phone_number, email, rent_balance FROM Tenants WHERE tenant_ID = ?";

    // Extract tenant_ID from the query parameter and convert it to an integer
    let tenantID = parseInt(req.query.id);

    // Execute the SQL query with the specified tenant_ID
    db.pool.query(query, [tenantID], function(error, results, fields) {
        if (error) {
            // If there's an error executing the query, log the error and send a 500 Internal Server Error response
            console.error("Error executing query:", error);
            res.status(500).json({ error: "Internal Server Error" });
        } else {
            // If the query is successful, send the results as JSON
            res.json(results);
        }
    });
});

app.put('/update-tenant', function(req, res) {
    let data = req.body;

    // Extracting data from the request body
    let tenantID = parseInt(data.tenantId);
    let firstName = data.firstName;
    let lastName = data.lastName;
    let phoneNumber = data.phoneNumber;
    let email = data.email;
    let rentBalance = parseFloat(data.rentBalance);

    // Input validation
    if (isNaN(tenantID) || isNaN(rentBalance)) {
        res.status(400).send(`Invalid entry`);
        return;
    }

    // SQL queries
    let selectTenant = 'SELECT * FROM Tenants WHERE tenant_ID = ?';
    let updateQuery = `UPDATE Tenants 
                   SET first_name = ?, 
                       last_name = ?, 
                       phone_number = ?, 
                       email = ?, 
                       rent_balance = ? 
                   WHERE tenant_ID = ?`;

    let updateValues = [firstName, lastName, phoneNumber, email, isNaN(rentBalance) ? null : rentBalance, tenantID];

    // Execute the update query
    db.pool.query(updateQuery, updateValues, function(error, rows, fields) {
        if (error) {
            console.error(error);
            res.status(500).send('Internal Server Error: Unable to update tenant.'); 
        } else {
            // Fetch the updated tenant
            db.pool.query(selectTenant, [tenantID], function(error, rows, fields) {
                if (error) {
                    console.log(error);
                    res.sendStatus(400);
                } else {
                    // Send the updated tenant back to the client
                    res.send(rows);
                }
            });
        }
    });
});

// POST ROUTE for adding a new tenant
app.post('/add-tenant-form', function(req, res) {
    // Capture the incoming data and parse it back to a JS object
    let data = req.body;

    // Capture NULL values if necessary
    // For example, assuming rent_balance is an optional field
    let rentBalance = parseFloat(data.rent_balance);
    if (isNaN(rentBalance)) {
        rentBalance = null;
    }

    // Create the query to insert a new tenant into the Tenants table
    const query = `
        INSERT INTO Tenants (first_name, last_name, phone_number, email, rent_balance)
        VALUES ('${data.first_name}', '${data.last_name}', '${data.phone_number}', '${data.email}', ${rentBalance});
    `;

    // Execute the query on the database
    db.pool.query(query, function(error, rows, fields) {
        // Check for errors
        if (error) {
            console.error("Error adding tenant:", error);
            res.status(500).send("Internal Server Error");
            return;
        }

        // If successful, perform a SELECT * on Tenants to get updated data
        const selectQuery = `SELECT * FROM Tenants;`;

        db.pool.query(selectQuery, function(error, rows, fields) {
            // Check for errors in the second query
            if (error) {
                console.error("Error fetching tenants:", error);
                res.status(500).send("Internal Server Error");
                return;
            }

            // Send the updated list of tenants as the response
            res.send(rows);
        });
    });
});

// DELETE ROUTE for deleting a tenant by id
app.delete('/delete-tenant-ajax', function(req, res) {
    let data = req.body;
    let tenantID = parseInt(data.id);

    let deleteQuery = "DELETE FROM Tenants WHERE tenant_ID = ?";

    db.pool.query(deleteQuery, [tenantID], function(error, rows, fields) {
        if (error) {
            console.log(error);
            res.sendStatus(500); // Internal Server Error
        } else {
            res.sendStatus(204); // No Content (indicating successful deletion)
        }
    });
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

// POST ROUTE for adding a rental agreement
app.post('/add-rental-agreement-form', function(req, res) {
    // Capture the incoming data and parse it back to a JS object
    let data = req.body;

    // Capture NULL values if necessary
    let unitID = parseInt(data.unit_ID);
    let tenantID = parseInt(data.tenant_ID);
    let startDate = data.start_date;
    let endDate = data.end_date;
    let totalRentBalance = parseFloat(data.total_rent_balance);
    let securityDeposit = parseFloat(data.security_deposit);

    // Ensure that numeric values are valid; set to null if not
    unitID = isNaN(unitID) ? null : unitID;
    tenantID = isNaN(tenantID) ? null : tenantID;
    totalRentBalance = isNaN(totalRentBalance) ? null : totalRentBalance;
    securityDeposit = isNaN(securityDeposit) ? null : securityDeposit;

    // Create the query to insert a new rental agreement into the RentalAgreements table
    const query = `
        INSERT INTO RentalAgreements (unit_ID, tenant_ID, start_date, end_date, total_rent_balance, security_deposit)
        VALUES (?, ?, ?, ?, ?, ?);
    `;

    // Execute the query on the database
    db.pool.query(query, [unitID, tenantID, startDate, endDate, totalRentBalance, securityDeposit], function(error, rows, fields) {
        // Check for errors
        if (error) {
            console.error("Error adding rental agreement:", error);
            res.status(500).send("Internal Server Error");
            return;
        }

        // If successful, perform a SELECT * on RentalAgreements to get updated data
        const selectQuery = `SELECT * FROM RentalAgreements;`;

        db.pool.query(selectQuery, function(error, rows, fields) {
            // Check for errors in the second query
            if (error) {
                console.error("Error fetching rental agreements:", error);
                res.status(500).send("Internal Server Error");
                return;
            }

            // Send the updated list of rental agreements as the response
            res.send(rows);
        });
    });
});

// PUT route for updating rental agreements
app.put('/update-rental-agreement', (req, res) => {
    // Extract data from the request body
    const { rental_ID, unit_ID, tenant_ID, start_date, end_date, total_rent_balance, security_deposit } = req.body;

    // Assuming you have a database connection (e.g., using a library like MySQL or MongoDB)
    // Perform the update operation in your database
    // Replace the following lines with your actual database update logic

    // Sample MySQL query (assuming you are using a MySQL database)
    const updateQuery = `
        UPDATE RentalAgreements
        SET
            unit_ID = ?,
            tenant_ID = ?,
            start_date = ?,
            end_date = ?,
            total_rent_balance = ?,
            security_deposit = ?
        WHERE rental_ID = ?;
    `;

    // Execute the update query
    db.pool.query(updateQuery, [unit_ID, tenant_ID, start_date, end_date, total_rent_balance, security_deposit, rental_ID], (error, results) => {
        if (error) {
            console.error('Error updating rental agreement:', error);
            res.status(500).send('Internal Server Error');
        } else {
            // Assuming success, you can send a success response
            res.json({ message: 'Rental agreement updated successfully' });
        }
    });
});

// DELETE ROUTE for deleting a rental agreement by id
app.delete('/delete-rental-agreement-ajax', function(req, res) {
    let data = req.body;
    let rentalAgreementID = parseInt(data.id);

    let deleteQuery = "DELETE FROM RentalAgreements WHERE rental_ID = ?";

    db.pool.query(deleteQuery, [rentalAgreementID], function(error, rows, fields) {
        if (error) {
            console.log(error);
            res.sendStatus(500); 
        } else {
            res.sendStatus(204); 
        }
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