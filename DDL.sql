CREATE TABLE Units(
    unit_ID int AUTO_INCREMENT NOT NULL,
    is_available BOOLEAN DEFAULT 1 NOT NULL,
    num_bedrooms int not NULL,
    num_bathrooms int not NULL,
    square_feet int not NULL,
    unit_number int UNIQUE NOT NULL,
    rent_price DECIMAL(6,2) not NULL,
    yearly_net_income DECIMAL(8,2) NOT NULL,
    year int NOT NULL,
    PRIMARY KEY(unit_ID)
);

CREATE TABLE UtilityProviders(
    provider_ID int AUTO_INCREMENT UNIQUE NOT NULL,
    name varchar(50) NOT NULL,
    service_type VARCHAR(25) NOT NULL,
    utility_cost DECIMAL(5,2) NOT NULL,
    PRIMARY KEY(provider_ID)
);

CREATE TABLE UtilityProvidedBY(
    utility_ID int AUTO_INCREMENT UNIQUE NOT NULL, 
    unit_ID int NOT NULL,
    provider_ID int NOT NULL,
    PRIMARY KEY (utility_ID),
    FOREIGN KEY (unit_ID) REFERENCES Units(unit_ID),
    FOREIGN KEY (provider_ID) REFERENCES UtilityProviders(provider_ID)
);

CREATE TABLE Tenants(
    tenant_ID int AUTO_INCREMENT UNIQUE NOT NULL,
    first_name varchar(50) NOT NULL,
    last_name varchar(50) NOT NULL,
    phone_number varchar(15) not NULL,
    email varchar(50) NOT NULL,
    rent_balance DECIMAL(7,2) not NULL,
    PRIMARY KEY (tenant_ID)
);

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

CREATE TABLE MaintenceWorkers(
    worker_ID int AUTO_INCREMENT UNIQUE NOT NULL,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    phone varchar(15) NOT NULL,
    pay_rate DECIMAL(5,2) NOT NULL,
    qualifications TEXT,
    hours_worked DECIMAL(5,2) DEFAULT 0,
    PRIMARY KEY (worker_ID)
);

CREATE TABLE MaintenceRequests(
    maintenence_request_ID int AUTO_INCREMENT UNIQUE NOT NULL,
    unit_ID int NOT NULL,
    tenant_ID int not NULL,
    description TEXT NOT NULL,
    date_submitted DATE NOT NULL,
    time_to_complete int NOT NULL,
    repair_cost DECIMAL(7,2) NOT NULL,
    is_closed BOOLEAN NOT NULL,
    PRIMARY KEY (maintenence_request_ID),
    FOREIGN KEY(unit_ID) REFERENCES Units(unit_ID),
    FOREIGN KEY (tenant_ID) REFERENCES Tenants(tenant_ID)
);

CREATE TABLE RequestAssignments(
    assignmnet_ID int AUTO_INCREMENT UNIQUE NOT NULL,
    worker_ID int not NULL,
    maintenence_request_ID int NOT NULL,
    PRIMARY KEY(assignmnet_ID),
    FOREIGN KEY(worker_ID) REFERENCES MaintenceWorkers(worker_ID),
    FOREIGN KEY (maintenence_request_ID) REFERENCES MaintenceRequests(maintenence_request_ID)
);


INSERT INTO Units (is_available, num_bedrooms, num_bathrooms, square_feet, unit_number, ren_price, utility_providers, yearly_net_income, year)
VALUES 
    (1, 3, 2, 1800.00, 12, 1200, 5, 1560.00, 2022),
    (1, 2, 1, 1100.00, 22, 1200, 5, 1320.00, 2021),
    (1, 1, 1, 1000.00, 30, 1200, 5, 1200.00, 2022),
    (0, 3, 2, 1200.00, 40, 1200, 5, 0.00,  2021);


INSERT INTO RentalAgreements (unit_ID, tenant_ID, start_date, end_date, total_rental_balance, security_deposit)
VALUES
    (12, 12, 2021-09-01, 2022-08-31, 9300.00, 1000.00),
    (33, 33, 2021-01-12, 2022-01-11, 9500.00, 1200.00),
    (22, 22, 2022-08-23, 2023-08-22, 7000.00, 1200.00),
    (5, 5, , 1, 1200, );
    

INSERT INTO Tenants (first_name, last_name, phone_number, email, rental_balance, rental_agreement_id)
VALUES ('Victoria', 'Jones', '123-456-7890', 'victoriajones@yahoo.com', 5000.00, 1),
       ('Emma', 'Mathis', '555-555-5555', 'emmamathis@hotmail.com', 6000.00, 10)
       ('John', 'Carey', '312-723-7777', 'john.carey@gmail.com', 4500.00, 33)
       ('Eric', 'Williams', '312-838-8548', 'eric222@gmail.com', 5200.00, 22);
