SET FOREIGN_KEY_CHECKS = 0;

DROP TABLE IF EXISTS Units;

CREATE TABLE Units(
    unit_ID int AUTO_INCREMENT NOT NULL,
    is_available BOOLEAN DEFAULT 1 NOT NULL,
    num_bedrooms INT not NULL,
    num_bathrooms INT not NULL,
    square_feet INT not NULL,
    unit_number INT UNIQUE NOT NULL,
    rent_price DECIMAL(6,2) not NULL,
    previous_year_income DECIMAL(8,2) NOT NULL,
    year INT NOT NULL,
    PRIMARY KEY(unit_ID)
);

INSERT INTO Units (is_available, num_bedrooms, num_bathrooms, square_feet, unit_number, rent_price, yearly_net_income, year) 
VALUES (1, 2, 2, 1200, 101, 1600.00, 19200.00, 2022),
(1, 1, 1, 800, 1020, 1200.00, 14400.00, 2022),
(0, 3, 2, 1500, 2010, 2000.00, 24000.00, 2021),
(1, 2, 2, 1100, 1030, 1700.00, 20400.00, 2022);

CREATE TABLE UtilityProviders(
    provider_ID int AUTO_INCREMENT UNIQUE NOT NULL,
    name varchar(50) NOT NULL,
    service_type VARCHAR(25) NOT NULL,
    utility_cost DECIMAL(5,2) NOT NULL,
    PRIMARY KEY(provider_ID)
);

INSERT INTO UtilityProviders (name, service_type, utility_cost) 
VALUES ('Electric Company', 'Electricity', 120.00),
('American Water', 'Water', 54.00),
('Nicor Gas', 'Natural Gas', 75.00),
('Comcast', 'Internet', 80.00);

CREATE TABLE UtilityProvidedBY(
    utility_ID int AUTO_INCREMENT UNIQUE NOT NULL, 
    unit_ID int NOT NULL,
    provider_ID int NOT NULL,
    PRIMARY KEY (utility_ID),
    FOREIGN KEY (unit_ID) REFERENCES Units(unit_ID),
    FOREIGN KEY (provider_ID) REFERENCES UtilityProviders(provider_ID)
);

INSERT INTO UtilityProvidedBY (unit_ID, provider_ID) 
VALUES 
((SELECT unit_ID FROM Units WHERE unit_number = 101), (SELECT provider_ID FROM UtilityProviders WHERE name = 'Electric Company')),
((SELECT unit_ID FROM Units WHERE unit_number = 1020), (SELECT provider_ID FROM UtilityProviders WHERE name = 'American Water')),
((SELECT unit_ID FROM Units WHERE unit_number = 2010), (SELECT provider_ID FROM UtilityProviders WHERE name = 'Comcast')),
((SELECT unit_ID FROM Units WHERE unit_number = 1030), (SELECT provider_ID FROM UtilityProviders WHERE name = 'Electric Company'))
;

CREATE TABLE Tenants(
    tenant_ID int AUTO_INCREMENT UNIQUE NOT NULL,
    first_name varchar(50) NOT NULL,
    last_name varchar(50) NOT NULL,
    phone_number varchar(15) not NULL,
    email varchar(50) NOT NULL,
    rent_balance DECIMAL(7,2) not NULL,
    PRIMARY KEY (tenant_ID)
);

INSERT INTO Tenants (first_name, last_name, phone_number, email, rent_balance)
VALUES ('Victoria', 'Jones', '1234567890', 'victoriajones@yahoo.com', 5000.00),
       ('Emma', 'Mathis', '5555555555', 'emmamathis@hotmail.com', 6000.00),
       ('John', 'Carey', '3127237777', 'john.carey@gmail.com', 4500.00),
       ('Eric', 'Williams', '3128388548', 'eric222@gmail.com', 5200.00);

CREATE TABLE RentalAgreements(
    rental_ID int AUTO_INCREMENT UNIQUE NOT NULL,
    unit_ID int NOT NULL,
    tenant_ID int NOT NULL,
    start_date DATE not NULL,
    end_date DATE not NULL,
    total_rent_balance DECIMAL(7,2) NOT NULL,
    security_deposit DECIMAL(7,2) not NULL,
    PRIMARY KEY (rental_ID),
    FOREIGN KEY (unit_ID) REFERENCES Units(unit_ID),
    FOREIGN KEY (tenant_ID) REFERENCES Tenants(tenant_ID)
);

INSERT INTO RentalAgreements (unit_ID, tenant_ID, start_date, end_date, total_rent_balance, security_deposit)
VALUES
    ((SELECT unit_ID FROM Units WHERE unit_number = 101), (SELECT tenant_ID FROM Tenants WHERE first_name = 'Victoria' AND last_name = 'Jones'), "20210901", "20220831", 9300.00, 1000.00),
    ((SELECT unit_ID FROM Units WHERE unit_number = 2010), (SELECT tenant_ID FROM Tenants WHERE first_name = 'Emma' AND last_name= 'Mathis'), "20210112", "20220111", 9500.00, 1200.00),
    ((SELECT unit_ID FROM Units WHERE unit_number = 1020), (SELECT tenant_ID FROM Tenants WHERE first_name = 'John' AND last_name= 'Carey'), "20220823", "20230822", 7000.00, 1200.00),
    ((SELECT unit_ID FROM Units WHERE unit_number = 1030), (SELECT tenant_ID FROM Tenants WHERE first_name = 'Eric' AND last_name= 'Williams'), "20220522", "20230501", 800.00, 1300.00);
    

CREATE TABLE MaintenanceWorkers(
    worker_ID int AUTO_INCREMENT UNIQUE NOT NULL,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    phone varchar(15) NOT NULL,
    pay_rate DECIMAL(5,2) NOT NULL,
    qualifications TEXT,
    hours_worked DECIMAL(5,2) DEFAULT 0,
    PRIMARY KEY (worker_ID)
);

INSERT INTO MaintenanceWorkers (first_name, last_name, phone, pay_rate, qualifications, hours_worked) 
VALUES ('John', 'Anderson', '3221234567', 20.50, 'Electrician', 40.25),
('Jane', 'Brown', '3229876543', 18.75, 'Plumber', 37.50),
('Robert', 'Miller', '3222345678', 28.00, 'HVAC service technician', 10.00),
('Sarah', 'Jones', '3228765432', 29.25, 'Elevator mechanic', 30.75);

CREATE TABLE MaintenanceRequests(
    maintenance_request_ID int AUTO_INCREMENT UNIQUE NOT NULL,
    unit_ID int NOT NULL,
    tenant_ID int not NULL,
    description TEXT NOT NULL,
    date_submitted DATE NOT NULL,
    time_to_complete int NOT NULL,
    repair_cost DECIMAL(7,2) NOT NULL,
    is_closed BOOLEAN NOT NULL,
    PRIMARY KEY (maintenance_request_ID),
    FOREIGN KEY(unit_ID) REFERENCES Units(unit_ID),
    FOREIGN KEY (tenant_ID) REFERENCES Tenants(tenant_ID)
);

INSERT INTO MaintenanceRequests (unit_id, tenant_id, description, date_submitted, time_to_complete, repair_cost, is_closed)
VALUES ((SELECT unit_ID FROM Units WHERE unit_number = 101), (SELECT tenant_ID FROM Tenants WHERE first_name = 'Victoria' AND last_name= 'Jones'), "Leaky faucet in bathroom", "20230810", 2, 50.00, 0),
((SELECT unit_ID FROM Units WHERE unit_number = 2010), (SELECT tenant_ID FROM Tenants WHERE first_name = 'Emma' AND last_name= 'Mathis'), 'Broken window in bathroom', "20221012", 3, 75.00, 0),
((SELECT unit_ID FROM Units WHERE unit_number = 1020), (SELECT tenant_ID FROM Tenants WHERE first_name = 'John' AND last_name= 'Carey'), 'Heating system blowing cold air', "202310-5", 6, 200.00, 1),
((SELECT unit_ID FROM Units WHERE unit_number = 1030), (SELECT tenant_ID FROM Tenants WHERE first_name = 'Eric' AND last_name= 'Williams'), 'Garbage disposal backing up', "20231018", 4, 150.00, 1);


CREATE TABLE RequestAssignments(
    assignmnet_ID int AUTO_INCREMENT UNIQUE NOT NULL,
    worker_ID int not NULL,
    maintenance_request_ID int NOT NULL,
    PRIMARY KEY(assignmnet_ID),
    FOREIGN KEY(worker_ID) REFERENCES MaintenanceWorkers(worker_ID),
    FOREIGN KEY (maintenance_request_ID) REFERENCES MaintenanceRequests(maintenance_request_ID)
);


INSERT INTO RequestAssignments (worker_ID, maintenance_request_ID) 
VALUES 
((SELECT worker_ID FROM MaintenanceWorkers WHERE first_name = 'John' and last_name= 'Anderson'), 1),
((SELECT worker_ID FROM MaintenanceWorkers WHERE first_name = 'Jane' and last_name= 'Brown'), 2),
((SELECT worker_ID FROM MaintenanceWorkers WHERE first_name = 'Robert' and last_name= 'Miller'), 3),
((SELECT worker_ID FROM MaintenanceWorkers WHERE first_name = 'Sarah' and last_name= 'Jones'), 4);
