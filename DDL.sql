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



INSERT INTO Units (is_available, num_bedrooms, num_bathrooms, square_feet, unit_number, ren_price, utility_providers, yearly_net_income, year)
VALUES 
    (1, 3, 2, 1800, 12, 1200, 5, 1560, 2022)
    (1, 2, 1, 1100, 22, 1200, 5, 1320, 2021)
    (1, 1, 1, 1000, 30, 1200, 5, 1200, 2022)
    (0, 3, 2, 1200, 40, 1200, 5, 0,  2021)


INSERT INTO RentalAgreements (unit_ID, tenant_ID, start_date, end_date, total_rental_balance, security_deposit)
VALUES 
    (12, 12, 2021-09-01, 2022-08-31, 9300.00, 1000.00)
    (33, 33, 2021-01-12, 2022-01-11, 9500.00, 1200.00)
    (22, 22, 2022-08-23, 2023-08-22, 7000.00, 1200.00)
    (5, 5, 2, 1, 1200, )