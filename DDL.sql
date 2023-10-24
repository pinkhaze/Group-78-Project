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

INSERT INTO Units (is_available, num_bedrooms, num_bathrooms, square_feet, unit_number, rent_price, previous_year_income, year)
VALUES (1, 3, 2, 1480, 12, 1200.00, 1560.00, 2022),
       (1, 2, 1, 1000, 22, 1200, 1320.00, 2021),
       (1, 1, 1, 1000, 30, 1200, 1200.00, 2022),
       (0, 3, 2, 1200, 40, 1200, 0.00,  2021);

DROP TABLE IF EXISTS UtilityProviders;

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

DROP TABLE IF EXISTS UtilityProvidedBy;

CREATE TABLE UtilityProvidedBy(
    utility_ID int AUTO_INCREMENT UNIQUE NOT NULL, 
    unit_ID int NOT NULL,
    provider_ID int NOT NULL,
    PRIMARY KEY (utility_ID),
    FOREIGN KEY (unit_ID) REFERENCES Units(unit_ID),
    FOREIGN KEY (provider_ID) REFERENCES UtilityProviders(provider_ID) ON DELETE CASCADE
);

INSERT INTO UtilityProvidedBy (unit_ID, provider_ID) 
VALUES (12, 1),
       (22, 2),
       (30, 3),
       (40, 4);

-- DROP TABLE IF EXISTS Tenants;

-- CREATE TABLE Tenants(
--     tenant_ID int AUTO_INCREMENT UNIQUE NOT NULL,
--     first_name varchar(50) NOT NULL,
--     last_name varchar(50) NOT NULL,
--     phone_number varchar(15) not NULL,
--     email varchar(50) NOT NULL,
--     rent_balance DECIMAL(7,2) not NULL,
--     PRIMARY KEY (tenant_ID)
-- );

-- INSERT INTO Tenants (first_name, last_name, phone_number, email, rental_balance, rental_agreement_id)
-- VALUES ('Victoria', 'Jones', '123-456-7890', 'victoriajones@yahoo.com', 5000.00, 1),
--        ('Emma', 'Mathis', '555-555-5555', 'emmamathis@hotmail.com', 6000.00, 10),
--        ('John', 'Carey', '312-723-7777', 'john.carey@gmail.com', 4500.00, 33),
--        ('Eric', 'Williams', '312-838-8548', 'eric222@gmail.com', 5200.00, 22);

-- DROP TABLE IF EXISTS RentalAgreements;

-- CREATE TABLE RentalAgreements(
--     rental_ID int AUTO_INCREMENT UNIQUE NOT NULL,
--     unit_ID int NOT NULL,
--     tenant_ID int NOT NULL,
--     start_date DATE not NULL,
--     end_date DATE not NULL,
--     total_rent_balance DECIMAL(7,2) NOT NULL,
--     security_deposit DECIMAL(7,2) not NULL,
--     PRIMARY KEY (rental_ID),
--     FOREIGN KEY (unit_ID) REFERENCES Units(unit_ID),
--     FOREIGN KEY (tenant_ID) REFERENCES Tenants(tenant_ID)
-- );

-- INSERT INTO RentalAgreements (unit_ID, tenant_ID, start_date, end_date, total_rental_balance, security_deposit)
-- VALUES
--     (12, 12, "20210901", "20220831", 9300.00, 1000.00),
--     (33, 33, "20210112", "20220111", 9500.00, 1200.00),
--     (22, 22, "20220823", "20230822", 7000.00, 1200.00),
--     (5, 5, , "20220522", "20230501", 800.00, 1300.00);
    

-- CREATE TABLE MaintenceWorkers(
--     worker_ID int AUTO_INCREMENT UNIQUE NOT NULL,
--     first_name VARCHAR(50) NOT NULL,
--     last_name VARCHAR(50) NOT NULL,
--     phone varchar(15) NOT NULL,
--     pay_rate DECIMAL(5,2) NOT NULL,
--     qualifications TEXT,
--     hours_worked DECIMAL(5,2) DEFAULT 0,
--     PRIMARY KEY (worker_ID)
-- );

-- INSERT INTO MaintenanceWorkers (first_name, last_name, phone, pay_rate, qualifications, hours_worked) 
-- VALUES ('John', 'Anderson', '322-123-4567', 20.50, 'Electrician', 40.25),
-- ('Jane', 'Brown', '322-987-6543', 18.75, 'Plumber', 37.50),
-- ('Robert', 'Miller', '322-234-5678', 28.00, 'HVAC service technician', 10.00),
-- ('Sarah', 'Jones', '322-876-5432', 29.25, 'Elevator mechanic', 30.75);

-- CREATE TABLE MaintenceRequests(
--     maintenence_request_ID int AUTO_INCREMENT UNIQUE NOT NULL,
--     unit_ID int NOT NULL,
--     tenant_ID int not NULL,
--     description TEXT NOT NULL,
--     date_submitted DATE NOT NULL,
--     time_to_complete int NOT NULL,
--     repair_cost DECIMAL(7,2) NOT NULL,
--     is_closed BOOLEAN NOT NULL,
--     PRIMARY KEY (maintenence_request_ID),
--     FOREIGN KEY(unit_ID) REFERENCES Units(unit_ID),
--     FOREIGN KEY (tenant_ID) REFERENCES Tenants(tenant_ID)
-- );

-- INSERT INTO MaintenanceRequests (unit_id, tenant_id, description, date_submitted, time_to_complete, repair_cost, is_closed)
-- VALUES (202, 12, "Leaky faucet in bathroom", "2023-08-10", 2, 50.00, 0),
-- (33, 16, 'Broken window in bathroom', "2022-10-12", 3, 75.00, 0),
-- (45, 18, 'Heating system blowing cold air', "2023-10-15", 6, 200.00, 1),
-- (66, 78, 'Garbage disposal backing up', "2023-10-18", 4, 150.00, 1);


-- CREATE TABLE RequestAssignments(
--     assignmnet_ID int AUTO_INCREMENT UNIQUE NOT NULL,
--     worker_ID int not NULL,
--     maintenence_request_ID int NOT NULL,
--     PRIMARY KEY(assignmnet_ID),
--     FOREIGN KEY(worker_ID) REFERENCES MaintenceWorkers(worker_ID),
--     FOREIGN KEY (maintenence_request_ID) REFERENCES MaintenceRequests(maintenence_request_ID)
-- );

-- INSERT INTO RequestAssignments (worker_ID, maintenance_request_ID) 
-- VALUES (1, 1),
-- (2, 2),
-- (3, 3),
-- (4, 4);
