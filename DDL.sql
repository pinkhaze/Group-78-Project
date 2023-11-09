-- Group 78 Project Step 3 Final
-- Parker Sargeant
-- Monika Racia

SET FOREIGN_KEY_CHECKS = 0;

DROP TABLE IF EXISTS Units;

-- Creates the Units Table
CREATE TABLE Units(
    unit_ID int(11) AUTO_INCREMENT NOT NULL,
    is_available BOOLEAN DEFAULT 1 NOT NULL,
    num_bedroom int(11) NOT NULL,
    num_bathroom int(11) NOT NULL,
    square_feet int(11) NOT NULL,
    unit_number int(11) UNIQUE NOT NULL,
    rent_price DECIMAL(6,2) not NULL,
    previous_year_income DECIMAL(8,2) NOT NULL,
    year int(11) NOT NULL,
    PRIMARY KEY(unit_ID)
);

-- Creates the UtilityProviders Table
CREATE TABLE UtilityProviders(
    provider_ID int(11) AUTO_INCREMENT UNIQUE NOT NULL,
    name varchar(50) NOT NULL,
    service_type VARCHAR(25) NOT NULL,
    utility_cost DECIMAL(5,2) NOT NULL,
    PRIMARY KEY(provider_ID)
);

-- Creates the ProvidedUtilities Table
CREATE TABLE ProvidedUtilities(
    utility_ID int(11) AUTO_INCREMENT UNIQUE NOT NULL, 
    unit_ID int(11) NOT NULL,
    provider_ID int(11) NOT NULL,
    PRIMARY KEY (utility_ID),
    FOREIGN KEY (unit_ID) REFERENCES Units(unit_ID),
    FOREIGN KEY (provider_ID) REFERENCES UtilityProviders(provider_ID) On Delete CASCADE
);

-- Creates the Tenants Table
CREATE TABLE Tenants(
    tenant_ID int(11) AUTO_INCREMENT UNIQUE NOT NULL,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    phone_number VARCHAR(15) NOT NULL,
    email VARCHAR(50) NOT NULL,
    rent_balance DECIMAL(7,2) NOT NULL,
    PRIMARY KEY (tenant_ID)
);

-- Creates the RentalAgreements Table
CREATE TABLE RentalAgreements(
    rental_ID int(11) AUTO_INCREMENT UNIQUE NOT NULL,
    unit_ID int(11) NOT NULL,
    tenant_ID int(11) NOT NULL,
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    total_rent_balance DECIMAL(7,2) NOT NULL,
    security_deposit DECIMAL(7,2) NOT NULL,
    PRIMARY KEY (rental_ID),
    FOREIGN KEY (unit_ID) REFERENCES Units(unit_ID),
    FOREIGN KEY (tenant_ID) REFERENCES Tenants(tenant_ID)
);

-- Creates the MaintenanceWorkers Table
CREATE TABLE MaintenanceWorkers(
    worker_ID int(11) AUTO_INCREMENT UNIQUE NOT NULL,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    phone varchar(15) NOT NULL,
    pay_rate DECIMAL(5,2) NOT NULL,
    qualification TEXT,
    hours_worked DECIMAL(5,2) DEFAULT 0,
    PRIMARY KEY (worker_ID)
);

-- Creates the MaintenanceRequests Table
CREATE TABLE MaintenanceRequests(
    maintenance_request_ID int(11) AUTO_INCREMENT UNIQUE NOT NULL,
    unit_ID int(11) NOT NULL,
    tenant_ID int(11) NOT NULL,
    description TEXT NOT NULL,
    date_submitted DATE NOT NULL,
    time_to_complete int(11) NOT NULL,
    repair_cost DECIMAL(7,2) NOT NULL,
    is_closed BOOLEAN NOT NULL,
    PRIMARY KEY (maintenance_request_ID),
    FOREIGN KEY(unit_ID) REFERENCES Units(unit_ID),
    FOREIGN KEY (tenant_ID) REFERENCES Tenants(tenant_ID)
);

-- Creates the RequestAssignments Table
CREATE TABLE RequestAssignments(
    assignment_ID int(11) AUTO_INCREMENT UNIQUE NOT NULL,
    worker_ID int(11) NOT NULL,
    maintenance_request_ID int(11) NOT NULL,
    PRIMARY KEY(assignment_ID),
    FOREIGN KEY(worker_ID) REFERENCES MaintenanceWorkers(worker_ID),
    FOREIGN KEY (maintenance_request_ID) REFERENCES MaintenanceRequests(maintenance_request_ID)
);

-- Inserts sample data into Units Table
INSERT INTO Units (is_available, num_bedroom, num_bathroom, square_feet, unit_number, rent_price, previous_year_income, year) 
VALUES (1, 2, 2, 1200, 1, 1600.00, 19200.00, 2022),
       (1, 1, 1, 800, 2, 1200.00, 14400.00, 2022),
       (0, 3, 2, 1500, 3, 2000.00, 24000.00, 2021),
       (1, 2, 2, 1100, 4, 1700.00, 20400.00, 2022);

-- Inserts sample data into UtilityProviders Table
INSERT INTO UtilityProviders (name, service_type, utility_cost) 
VALUES ('Electric Company', 'Electricity', 120.00),
       ('American Water', 'Water', 54.00),
       ('Nicor Gas', 'Natural Gas', 75.00),
       ('Comcast', 'Internet', 80.00);

-- Inserts sample data into ProvidedUtilities Table
INSERT INTO ProvidedUtilities(unit_ID, provider_ID) 
VALUES 
((SELECT unit_ID FROM Units WHERE unit_number = 1), (SELECT provider_ID FROM UtilityProviders WHERE name = 'Electric Company')),
((SELECT unit_ID FROM Units WHERE unit_number = 2), (SELECT provider_ID FROM UtilityProviders WHERE name = 'American Water')),
((SELECT unit_ID FROM Units WHERE unit_number = 3), (SELECT provider_ID FROM UtilityProviders WHERE name = 'Comcast')),
((SELECT unit_ID FROM Units WHERE unit_number = 4), (SELECT provider_ID FROM UtilityProviders WHERE name = 'Electric Company'))
;

-- Inserts sample data into Tenants Table
INSERT INTO Tenants (first_name, last_name, phone_number, email, rent_balance)
VALUES ('Victoria', 'Jones', '123-456-7890', 'victoriajones@yahoo.com', 5000.00),
       ('Emma', 'Mathis', '555-555-5555', 'emmamathis@hotmail.com', 6000.00),
       ('John', 'Carey', '3127237777', 'john.carey@gmail.com', 4500.00),
       ('Eric', 'Williams', '3128388548', 'eric222@gmail.com', 5200.00);

-- Inserts sample data into RentalAgreements Table
INSERT INTO RentalAgreements (unit_ID, tenant_ID, start_date, end_date, total_rent_balance, security_deposit)
VALUES
    ((SELECT unit_ID FROM Units WHERE unit_number = 1), (SELECT tenant_ID FROM Tenants WHERE first_name = 'Victoria' AND last_name = 'Jones'), "20220818", "20230817", 0.00, 1000.00),
    ((SELECT unit_ID FROM Units WHERE unit_number = 2), (SELECT tenant_ID FROM Tenants WHERE first_name = 'Emma' AND last_name= 'Mathis'), "20230112", "20240111", 3600.00, 1200.00),
    ((SELECT unit_ID FROM Units WHERE unit_number = 3), (SELECT tenant_ID FROM Tenants WHERE first_name = 'John' AND last_name= 'Carey'), "20230823", "20240822", 20000.00, 1200.00),
    ((SELECT unit_ID FROM Units WHERE unit_number = 4), (SELECT tenant_ID FROM Tenants WHERE first_name = 'Eric' AND last_name= 'Williams'), "20230522", "20240501", 13600.00, 1300.00);

-- Inserts sample data into MaintenanceWorkers Table
INSERT INTO MaintenanceWorkers (first_name, last_name, phone, pay_rate, qualification, hours_worked) 
VALUES ('John', 'Anderson', '322-123-4567', 20.50, 'Electrician', 40.25),
       ('Jane', 'Brown', '322-987-6543', 18.75, 'Plumber', 37.50),
       ('Robert', 'Miller', '3222345678', 28.00, 'HVAC service technician', 10.00),
       ('Sarah', 'Jones', '3228765432', 29.25, 'Elevator mechanic', 30.75);

-- Inserts sample data into MaintenanceRequests Table
INSERT INTO MaintenanceRequests (unit_id, tenant_id, description, date_submitted, time_to_complete, repair_cost, is_closed)
VALUES ((SELECT unit_ID FROM Units WHERE unit_number = 1), (SELECT tenant_ID FROM Tenants WHERE first_name = 'Victoria' AND last_name= 'Jones'), "Leaky faucet in bathroom", "20230610", 2, 50.00, 0),
       ((SELECT unit_ID FROM Units WHERE unit_number = 2), (SELECT tenant_ID FROM Tenants WHERE first_name = 'Emma' AND last_name= 'Mathis'), 'Broken window in bathroom', "20230712", 3, 125.00, 0),
       ((SELECT unit_ID FROM Units WHERE unit_number = 3), (SELECT tenant_ID FROM Tenants WHERE first_name = 'John' AND last_name= 'Carey'), 'Heating system blowing cold air', "20241012", 6, 200.00, 1),
       ((SELECT unit_ID FROM Units WHERE unit_number = 4), (SELECT tenant_ID FROM Tenants WHERE first_name = 'Eric' AND last_name= 'Williams'), 'Garbage disposal backing up', "20241018", 4, 150.00, 1);

-- Inserts sample data into RequestAssignments Table
INSERT INTO RequestAssignments (worker_ID, maintenance_request_ID)
SELECT
    (SELECT worker_ID FROM MaintenanceWorkers WHERE first_name = 'John' AND last_name = 'Anderson'), 
    (SELECT maintenance_request_ID FROM MaintenanceRequests WHERE unit_id = (SELECT unit_ID FROM Units WHERE unit_number = 1) AND tenant_id = (SELECT tenant_ID FROM Tenants WHERE first_name = 'Victoria' AND last_name = 'Jones'))
UNION ALL
SELECT
    (SELECT worker_ID FROM MaintenanceWorkers WHERE first_name = 'Jane' AND last_name = 'Brown'),
    (SELECT maintenance_request_ID FROM MaintenanceRequests WHERE unit_id = (SELECT unit_ID FROM Units WHERE unit_number = 2) AND tenant_id = (SELECT tenant_ID FROM Tenants WHERE first_name = 'Emma' AND last_name = 'Mathis'))
UNION ALL
SELECT
    (SELECT worker_ID FROM MaintenanceWorkers WHERE first_name = 'Robert' AND last_name = 'Miller'),
    (SELECT maintenance_request_ID FROM MaintenanceRequests WHERE unit_id = (SELECT unit_ID FROM Units WHERE unit_number = 3) AND tenant_id = (SELECT tenant_ID FROM Tenants WHERE first_name = 'John' AND last_name = 'Carey'))
UNION ALL
SELECT
    (SELECT worker_ID FROM MaintenanceWorkers WHERE first_name = 'Sarah' AND last_name = 'Jones'),
    (SELECT maintenance_request_ID FROM MaintenanceRequests WHERE unit_id = (SELECT unit_ID FROM Units WHERE unit_number = 4) AND tenant_id = (SELECT tenant_ID FROM Tenants WHERE first_name = 'Eric' AND last_name = 'Williams'));


