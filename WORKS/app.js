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
const db = require('./database/db-connector');
const { prototype } = require('events');

const handlebars = require('handlebars');

handlebars.registerHelper('if_eq', function(a, b, opts) {
    return a === b ? opts.fn(this) : opts.inverse(this);
});

const hbs = exphbs.create({
    extname: '.hbs',
    helpers: {
      format_date: function (date) {
        return new Date(date).toLocaleDateString();
      },
    },
});

// Instantiate an express object to interact with the server
const app = express();            
// Set a port number
const PORT = process.env.PORT || 3998;

// Middleware 
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'assets')));
              
// Set up the handlebars engine
app.engine('.hbs', hbs.engine);
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
app.get('/units', function(req, res) {
    let query = "SELECT * FROM Units;";
    db.pool.query(query, function(error, rows, fields) {
        const pageTitle = "Units";
        res.render('units', { data: rows, title: pageTitle });
    });
});

/// Load Unit before Update
app.get('/unitsID', function(req, res){
    let query = "SELECT unit_ID, is_available, num_bedroom, num_bathroom, square_feet, unit_number, rent_price, previous_year_income, year FROM Units WHERE unit_ID = ?";
    let unitID = parseInt(req.query.id);
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
    let isAvailable = (parseInt(data.is_available));
    let numBedroom = parseInt(data.num_bedroom);
    let numBathroom = parseInt(data.num_bathroom);
    let squareFeet = parseInt(data.square_feet);
    let rentPrice = parseFloat(data.rent_price);
    let previousYearIncome = parseFloat(data.previous_year_income);
    let year = parseInt(data.year);

    let query = `INSERT INTO Units (is_available, num_bedroom, num_bathroom, square_feet, unit_number, rent_price, previous_year_income, year) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;
    
    db.pool.query(query, [isAvailable, numBedroom, numBathroom, squareFeet, unitNumber, rentPrice, previousYearIncome, year], function(error, rows, fields) {
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
    let isAvailable = (parseInt(data.is_available));
    let unitNumber = parseInt(data.unit_number);
    let numBedroom = parseInt(data.num_bedroom);
    let numBathroom = parseInt(data.num_bathroom);
    let squareFeet = parseInt(data.square_feet);
    let rentPrice = parseFloat(data.rent_price);
    let previousYearIncome = parseFloat(data.previous_year_income);
    let year = parseInt(data.year);
    console.log(req.body)

   
    let selectUnit = 'SELECT * FROM Units WHERE unit_ID = ? AND unit_number = ?';
    let updateQuery = `UPDATE Units 
                   SET is_available = ?,
                       num_bedroom = ?,
                       num_bathroom = ?,
                       square_feet = ?,
                       rent_price = ?,
                       previous_year_income = ?,
                       year = ?`

    let updateValues = [isAvailable, numBedroom, numBathroom, squareFeet, rentPrice, previousYearIncome, year];

    db.pool.query(updateQuery, updateValues, function(error, rows, fields) {
        if (error) {
            console.error(error);
            res.status(500).send('Internal Server Error: Unable to update utility provider.'); 
        } else {
            db.pool.query(selectUnit, [unitID, unitNumber], function(error, rows, fields) {
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

/****************************************** Tenants ************************************************/

// GET route for displaying all tenants
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
    let query = "SELECT first_name, last_name, phone_number, email, rent_balance FROM Tenants WHERE tenant_ID = ?";

    let tenantID = parseInt(req.query.id);

    db.pool.query(query, [tenantID], function(error, results, fields) {
        if (error) {
            console.error("Error executing query:", error);
            res.status(500).json({ error: "Internal Server Error" });
        } else {
            res.json(results);
        }
    });
});

// PUT route for updating a tenant
app.put('/update-tenant', function(req, res) {
    let data = req.body;

    let tenantID = parseInt(data.tenantId);
    let firstName = data.firstName;
    let lastName = data.lastName;
    let phoneNumber = data.phoneNumber;
    let email = data.email;
    let rentBalance = parseFloat(data.rentBalance);

    if (isNaN(tenantID) || isNaN(rentBalance)) {
        res.status(400).send(`Invalid entry`);
        return;
    }

    let selectTenant = 'SELECT * FROM Tenants WHERE tenant_ID = ?';
    let updateQuery = `UPDATE Tenants 
                   SET first_name = ?, 
                       last_name = ?, 
                       phone_number = ?, 
                       email = ?, 
                       rent_balance = ? 
                   WHERE tenant_ID = ?`;

    let updateValues = [firstName, lastName, phoneNumber, email, isNaN(rentBalance) ? null : rentBalance, tenantID];

    db.pool.query(updateQuery, updateValues, function(error, rows, fields) {
        if (error) {
            console.error(error);
            res.status(500).send('Internal Server Error: Unable to update tenant.'); 
        } else {
            db.pool.query(selectTenant, [tenantID], function(error, rows, fields) {
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

// POST route for adding a new tenant
app.post('/add-tenant-form', function(req, res) {
    let data = req.body;

    let rentBalance = parseFloat(data.rent_balance);

    const query = `
        INSERT INTO Tenants (first_name, last_name, phone_number, email, rent_balance)
        VALUES ('${data.first_name}', '${data.last_name}', '${data.phone_number}', '${data.email}', ${rentBalance});
    `;

    db.pool.query(query, function(error, rows, fields) {
        if (error) {
            console.error("Error adding tenant:", error);
            res.status(500).send("Internal Server Error");
            return;
        }

        const selectQuery = `SELECT * FROM Tenants;`;

        db.pool.query(selectQuery, function(error, rows, fields) {
            if (error) {
                console.error("Error fetching tenants:", error);
                res.status(500).send("Internal Server Error");
                return;
            }
            res.send(rows);
        });
    });
});

// DELETE route for deleting a tenant by id
app.delete('/delete-tenant-ajax', function(req, res) {
    let data = req.body;
    let tenantID = parseInt(data.id);

    let deleteQuery = "DELETE FROM Tenants WHERE tenant_ID = ?";

    db.pool.query(deleteQuery, [tenantID], function(error, rows, fields) {
        if (error) {
            console.log(error);
            res.sendStatus(500);
        } else {
            res.sendStatus(204);
        }
    });
});

/****************************************** Provided Utilities ************************************************/
/// GET ROUTE for displaying all provided Utilities
app.get('/provided-utilities', function(req, res) {
    let query = `SELECT * FROM ProvidedUtilities`;

    db.pool.query(query, function(error, rows, fields) {
        const pageTitle = "Provided Utilities";
        res.render('provided-utilities', { data: rows, title: pageTitle });
    });
});

/// Load providedUtilities before Update
app.get('/providedUtilityID', function(req, res){
    let query = "SELECT unit_ID, provider_ID FROM ProvidedUtilities WHERE utility_ID = ?";
    let utilityID = parseInt(req.query.id)
    console.log(utilityID)
   db.pool.query(query, [utilityID], function(error, results, fields) {
        if (error) {
            console.error("Error executing query:", error);
            res.status(500).json({ error: "Internal Server Error" });
        } else {
                res.json(results);
        }
    });
});

// POST ROUTE for adding provided utility
app.post('/add-provided-utility-form', function(req, res) {
    let data = req.body;

    // Ensure that the utility cost is a valid number
    let unitID = parseInt(data.unit_ID);
    let providerID = parseInt(data.provider_ID);


    let query = `INSERT INTO ProvidedUtilities (unit_ID, provider_ID) VALUES (?, ?)`;
    
    db.pool.query(query, [unitID, providerID], function(error, rows, fields) {
        if (error) {
            console.error(error);
            return res.sendStatus(500); // Internal Server Error
        } else {
            console.log("Unit added successfully");
            res.sendStatus(200); // OK
        }
    });
});

// PUT ROUTE for updating a provided utility by id
app.put('/update-provided-utility', function(req, res) {
    let data = req.body;

    // ensure data is correct
    let utilityID = parseInt(data.utility_ID);
    let unitID = parseInt(data.unit_ID);
    let providerID = parseInt(data.provider_ID);
   
    let selectProvidedUtility = 'SELECT unit_ID, Provider_ID FROM ProvidedUtilities WHERE utility_ID = ?';
    let updateQuery = `UPDATE ProvidedUtilities 
                   SET unit_ID = ?,
                       provider_ID = ?
                   WHERE utility_ID = ?`;

    let updateValues = [unitID, providerID, utilityID];

    db.pool.query(updateQuery, updateValues, function(error, rows, fields) {
        if (error) {
            console.error(error);
            res.status(500).send('Internal Server Error: Unable to update utility provider.'); 
        } else {
            db.pool.query(selectProvidedUtility, [utilityID], function(error, rows, fields) {
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


// DELETE ROUTE for deleting a provided utility by id
app.delete('/delete-provided-utility-ajax', function(req, res) {
    let data = req.body;
    let utilityID = parseInt(data.id);
    console.log(utilityID)

    let deleteQuery = "DELETE FROM ProvidedUtilities WHERE utility_ID = ?";

    db.pool.query(deleteQuery, [utilityID], function(error, rows, fields) {
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
app.get('/workerID', function(req, res){
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

    let query = `INSERT INTO MaintenanceWorkers (first_name, last_name, phone, pay_rate, qualification, hours_worked) VALUES (?, ?, ?, ?, ?, ?)`;
    
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
    let qualifcation = data.qualification;
    let hoursWorked = parseFloat(data.hours_worked);

    let selectedMaitnenanceWorker = 'SELECT first_name, last_name, phone, pay_rate, qualification, hours_worked FROM MaintenanceWorkers WHERE worker_ID = ?';
    let updateQuery = `UPDATE MaintenanceWorkers 
                   SET first_name = ?, 
                       last_name = ?,
                       phone = ?,
                       pay_rate = ?,
                       qualification = ?,
                       hours_worked = ?
                   WHERE worker_ID = ?`;

    let updateValues = [firstName, lastName, phone, payRate, qualifcation, hoursWorked, workerID];

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
  
    // Query to get all data from Units table
    let query2 = `SELECT * FROM Units;`;

    // Query to get all data from Tenants table
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

// GET route for displaying a rental agreement by ID
app.get('/rentalAgreementsID', function(req, res) {
    let query = `
        SELECT 
            RentalAgreements.rental_ID,
            Units.unit_number, 
            Tenants.tenant_ID,
            RentalAgreements.start_date, 
            RentalAgreements.end_date, 
            RentalAgreements.total_rent_balance, 
            RentalAgreements.security_deposit 
        FROM RentalAgreements
        LEFT JOIN Units ON RentalAgreements.unit_ID = Units.unit_ID
        LEFT JOIN Tenants ON RentalAgreements.tenant_ID = Tenants.tenant_ID
        WHERE RentalAgreements.rental_ID = ?`;

    let rentalAgreementID = parseInt(req.query.id);

    db.pool.query(query, [rentalAgreementID], function(error, results, fields) {
        if (error) {
            console.error("Error executing query:", error);
            res.status(500).json({ error: "Internal Server Error" });
        } else {
            res.json(results);
        }
    });
});

// POST route for adding a rental agreement
app.post('/add-rental-agreement-form', function(req, res) {
    let data = req.body;

    let unitID = parseInt(data.unit_ID);
    let tenantID = parseInt(data.tenant_ID);
    let startDate = data.start_date;
    let endDate = data.end_date;
    let totalRentBalance = parseFloat(data.total_rent_balance);
    let securityDeposit = parseFloat(data.security_deposit);

    const query = `
        INSERT INTO RentalAgreements (unit_ID, tenant_ID, start_date, end_date, total_rent_balance, security_deposit)
        VALUES (?, ?, ?, ?, ?, ?);
    `;

    db.pool.query(query, [unitID, tenantID, startDate, endDate, totalRentBalance, securityDeposit], function(error, rows, fields) {

        if (error) {
            console.error("Error adding rental agreement:", error);
            res.status(500).send("Internal Server Error");
            return;
        }

        const selectQuery = `SELECT * FROM RentalAgreements;`;

        db.pool.query(selectQuery, function(error, rows, fields) {
            if (error) {
                console.error("Error fetching rental agreements:", error);
                res.status(500).send("Internal Server Error");
                return;
            }

            res.send(rows);
        });
    });
});

app.put('/update-rental-agreement', function(req, res) {
    let data = req.body;

    let rentalAgreementId = parseInt(data.rentalAgreementId);
    let unitId = parseInt(data.unitId);
    let tenantId = parseInt(data.tenantId);
    let startDate = data.startDate;
    let endDate = data.endDate;
    let totalRentBalance = parseFloat(data.totalRentBalance);
    let securityDeposit = parseFloat(data.securityDeposit);

    if (isNaN(rentalAgreementId) || isNaN(unitId) || isNaN(tenantId) || isNaN(totalRentBalance) || isNaN(securityDeposit)) {
        res.status(400).send(`Invalid entry`);
        return;
    }

    let selectRentalAgreement = 'SELECT * FROM RentalAgreements WHERE rental_ID = ?';
    let updateQuery = `UPDATE RentalAgreements 
                        SET unit_ID = ?, 
                           tenant_ID = ?, 
                           start_date = ?, 
                           end_date = ?, 
                           total_rent_balance = ?, 
                           security_deposit = ? 
                        WHERE rental_ID = ?`;

    let updateValues = [unitId, tenantId, startDate, endDate, isNaN(totalRentBalance) ? null : totalRentBalance, isNaN(securityDeposit) ? null : securityDeposit, rentalAgreementId];

    db.pool.query(updateQuery, updateValues, function(error, rows, fields) {
        if (error) {
            console.error(error);
            res.status(500).send('Internal Server Error: Unable to update rental agreement.'); 
        } else {
            db.pool.query(selectRentalAgreement, [rentalAgreementId], function(error, rows, fields) {
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

// DELETE route for deleting a rental agreement by id
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

/****************************************** Maintenance Requests ************************************************/

app.get('/maintenance-requests', function (req, res) {
    let query1 = 
        `SELECT 
            MaintenanceRequests.maintenance_request_ID, 
            Units.unit_number, 
            CONCAT(Tenants.first_name, ' ', Tenants.last_name) AS tenant_name,
            MaintenanceRequests.description,
            MaintenanceRequests.date_submitted, 
            MaintenanceRequests.time_to_complete, 
            MaintenanceRequests.repair_cost, 
            MaintenanceRequests.is_closed
        FROM MaintenanceRequests
        LEFT JOIN Units ON MaintenanceRequests.unit_ID = Units.unit_ID
        LEFT JOIN Tenants ON MaintenanceRequests.tenant_ID = Tenants.tenant_ID;`;
  
    // Query to get all data from Units table
    let query2 = `SELECT * FROM Units;`;

    // Query to get all data from Tenants table
    let query3 = `SELECT * FROM Tenants;`;

    db.pool.query(query1, function (error, maintenanceRequests, fields) {
        db.pool.query(query2, function (error, units, fields) {
            db.pool.query(query3, function (error, tenants, fields) {

                const pageTitle = "Maintenance Requests";
                res.render('maintenance-requests', {
                    maintenanceRequests: maintenanceRequests,
                    units: units,
                    tenants: tenants,
                    title: pageTitle
                });
            });
        });
    });
});

// POST ROUTE for adding a maintenance request
app.post('/add-maintenance-request-form', function(req, res) {
    let data = req.body;

    // Capture NULL values
    let unitID = parseInt(data.unit_ID);
    let tenantID = parseInt(data.tenant_ID);
    let description = data.description;
    let dateSubmitted = data.date_submitted;
    let timeToComplete = parseInt(data.time_to_complete);
    let repairCost = parseFloat(data.repair_cost);
    let isClosed = data.is_closed === 'true';

    const query = `
        INSERT INTO MaintenanceRequests (unit_ID, tenant_ID, description, date_submitted, time_to_complete, repair_cost, is_closed)
        VALUES (?, ?, ?, ?, ?, ?, ?);
    `;

    db.pool.query(query, [unitID, tenantID, description, dateSubmitted, timeToComplete, repairCost, isClosed], function(error, rows, fields) {
        if (error) {
            console.error("Error adding maintenance request:", error);
            res.status(500).send("Internal Server Error");
            return;
        }

        // SELECT * on MaintenanceRequests to get updated data
        const selectQuery = `SELECT * FROM MaintenanceRequests;`;

        db.pool.query(selectQuery, function(error, rows, fields) {
            if (error) {
                console.error("Error fetching maintenance requests:", error);
                res.status(500).send("Internal Server Error");
                return;
            }
            res.send(rows);
        });
    });
});

app.get('/maintenanceRequestsID', function(req, res){
    let query = `SELECT 
                    MaintenanceRequests.maintenance_request_ID, 
                    Units.unit_number, 
                    Tenants.tenant_ID,
                    MaintenanceRequests.description, 
                    MaintenanceRequests.date_submitted, 
                    MaintenanceRequests.time_to_complete, 
                    MaintenanceRequests.repair_cost 
                FROM MaintenanceRequests
                LEFT JOIN Units ON MaintenanceRequests.unit_ID = Units.unit_ID
                LEFT JOIN Tenants ON MaintenanceRequests.tenant_ID = Tenants.tenant_ID
                WHERE MaintenanceRequests.maintenance_request_ID = ?`;

    let maintenanceRequestID = parseInt(req.query.id)
    db.pool.query(query, [maintenanceRequestID], function(error, results, fields) {
        if (error) {
            console.error("Error executing query:", error);
            res.status(500).json({ error: "Internal Server Error" });
        } else {
                res.json(results);
        }
    });
});

app.put('/update-maintenance-request', function(req, res) {
    let data = req.body;

    let maintenanceRequestId = parseInt(data.maintenanceRequestId);
    let unitId = parseInt(data.unitId);
    let tenantId = parseInt(data.tenantId);
    let description = data.description;
    let dateSubmitted = data.dateSubmitted;
    let timeToComplete = parseInt(data.timeToComplete);
    let repairCost = parseFloat(data.repairCost);
    let isClosed = data.isClosed;

    if (isNaN(maintenanceRequestId) || isNaN(unitId) || isNaN(tenantId) || isNaN(timeToComplete) || isNaN(repairCost)) {
        res.status(400).send(`Invalid entry`);
        return;
    }

    let selectMaintenanceRequest = 'SELECT * FROM MaintenanceRequests WHERE maintenance_request_ID = ?';
    let updateQuery = `
                UPDATE MaintenanceRequests 
                SET unit_ID = ?, 
                    tenant_ID = ?, 
                    description = ?, 
                    date_submitted = ?, 
                    time_to_complete = ?, 
                    repair_cost = ?, 
                    is_closed = ? 
                WHERE maintenance_request_ID = ?`;

    let updateValues = [unitId, tenantId, description, dateSubmitted, timeToComplete, repairCost, isClosed, maintenanceRequestId];

    db.pool.query(updateQuery, updateValues, function(error, rows, fields) {
        if (error) {
            console.error(error);
            res.status(500).send('Internal Server Error: Unable to update maintenance request.'); 
        } else {
            db.pool.query(selectMaintenanceRequest, [maintenanceRequestId], function(error, rows, fields) {
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

// DELETE route for deleting a maintenance request
app.delete('/delete-maintenance-request', function(req, res) {
    let data = req.body;
    let maintenanceRequestID = parseInt(data.id);

    let deleteQuery = "DELETE FROM MaintenanceRequests WHERE maintenance_request_ID = ?";

    db.pool.query(deleteQuery, [maintenanceRequestID], function(error, rows, fields) {
        if (error) {
            console.log(error);
            res.sendStatus(500); 
        } else {
            res.sendStatus(204);
        }
    });
});

/****************************************** Request Assignments ************************************************/

// GET route for displaying all request assignments
app.get('/request-assignments', function(req, res) {
    let query = "SELECT * FROM RequestAssignments;";

    db.pool.query(query, function(error, rows, fields) {
        const pageTitle = "Request Assignments";
        res.render('request-assignments', { data: rows, title: pageTitle });
    });
});

// GET ROUTE for displaying Provided Utilities page
app.get('/provided-utilities', function(req, res) {
    const pageTitle = "Provided Utilities";
    res.render('provided-utilities', { title: pageTitle });
});


app.listen(PORT, function(){     
    console.log('Express started on http://localhost:' + PORT + '; press Ctrl-C to terminate.')
});