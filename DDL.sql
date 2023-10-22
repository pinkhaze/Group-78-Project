CREATE TABLE Units(
    unit_ID int AUTO_INCREMENT NOT NULL,
    is_available BOOLEAN DEFAULT 1 NOT NULL,
    num_bedrooms int not NULL,
    num_bathrooms int not NULL,
    square_feet int not NULL,
    unit_number int UNIQUE NOT NULL,
    rent_price int not NULL,
    utility_providers int,
    yearly_net_income DECIMAL(8,2) NOT NULL,
    year int NOT NULL,
    PRIMARY KEY(unit_ID),
    FOREIGN KEY (utility_providers) REFERENCES UtilityProvidedBY(provider_ID)
);

CREATE TABLE UtilityProvidedBY(
    junction_ID int AUTO_INCREMENT UNIQUE NOT NULL, 
    unit_ID int NOT NULL,
    provider_ID int NOT NULL,
    PRIMARY KEY (junction_ID),
    FOREIGN KEY (provider_ID) REFERENCES UtilityProviders(provider_ID),
    FOREIGN KEY (unit_ID) REFERENCES UtilityProviders(provider_ID)
);

CREATE TABLE UtilityProviders(
    provider_ID int AUTO_INCREMENT UNIQUE NOT NULL,
    name varchar(50) NOT NULL,
    service_type VARCHAR(25) NOT NULL,
    utility_cost DECIMAL(5,2) NOT NULL,
    PRIMARY KEY(provider_ID),
);







INSERT INTO Units (is_available, num_bedrooms, num_bathrooms, square_feet, unit_number, ren_price, utility_providers, yearly_net_income, year)
VALUES 
    (1, 3, 2, 1300, 12, 1200, 5, "American Water, Ameren, Dish, AT&T", 1560, 2022)
    (1, 2, 1, 1100, 22, 1200, 5, "American Water, Ameren, DirectTV, Frontier", 1320, 2021)
    (1, 1, 1, 1000, 30, 1200, 5, "American Water, Ameren, Dish, AT&T", 1200, 2022)
    (0, 3, 2, 1200, 40, 1200, 5, "", 2400, 2021)


INSERT INTO RentalAgreements (unit_ID, tenant_ID, start_date, end_date, total_rental_balance, security_deposit)
VALUES 
    (1, 3, 2, 1300, 12, 1200, 5, "American Water, Ameren, Dish, AT&T", 1560, 2022)
    (0, 2, 1, 1100, 22, 1200, 5, "American Water, Ameren, DirectTV, Frontier", 1320, 2021)
    (1, 1, 1, 1000, 30, 1200, 5, "American Water, Ameren, Dish, AT&T", 1200, 2022)
    (0, 3, 2, 1200, 40, 1200, 5, "American Water, Ameren, Dish, Frontier", 2400, 2021)