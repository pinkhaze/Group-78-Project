-- Group 78 Project Step 3 Final
-- Parker Sargeant
-- Monika Racia
------------------------- SELECT Queries --------------------------

--- Select all Units
SELECT * FROM Units;

--- Select all Tenants
SELECT * FROM Tenants;

--- Select all RentalAgreements
SELECT RentalAgreements.rental_ID, Tenants.first_name, Tenants.last_name, Units.unit_number, RentalAgreements.start_date, RentalAgreements.end_date, RentalAgreements.total_rent_balance, RentalAgreements.security_deposit
FROM RentalAgreements
JOIN Tenants ON RentalAgreements.tenant_ID = Tenants.tenant_ID
JOIN Units ON RentalAgreements.unit_ID = Units.unit_ID;

--- Select all UtilityProviders
SELECT * FROM UtilityProviders;

--- Select all MaintenanceRequests
SELECT MaintenanceRequests.maintenance_request_ID, Units.unit_number, Tenants.first_name, Tenants.last_name, MaintenanceRequests.description, MaintenanceRequests.date_submitted, MaintenanceRequests.time_to_complete, MaintenanceRequests.repair_cost, MaintenanceRequests.is_closed
FROM MaintenanceRequests
JOIN Units ON MaintenanceRequests.unit_ID = Units.unit_ID
JOIN Tenants ON MaintenanceRequests.tenant_ID = Tenants.tenant_ID;

--- Select all MaintenanceWorkers
SELECT * FROM MaintenanceWorkers;

--Select all ProvidedUtilities
SELECT * FROM ProvidedUtilities;

--Select all RequestAssignments
SELECT * FROM RequestAssignments;

-------------------------- INSERT Queries --------------------------

--- Insert into Units
INSERT INTO Units (is_available, num_bedrooms, num_bathrooms, square_feet, unit_number, rent_price, previous_year_income, year)
VALUES (:isAvailableInput, :numBedroomsInput, :numBathroomsInput, :squareFeetInput, :unitNumberInput, :rentPriceInput, :previousYearIncomeInput, :yearInput);

--- Insert into Tenants
INSERT INTO Tenants (first_name, last_name, phone_number, email, rent_balance)
VALUES (:firstNameInput, :lastNameInput, :phoneNumberInput, :emailInput, :rentBalanceInput);

--- Insert into RentalAgreements
-- Insert a new rental agreement into the RentalAgreements table
INSERT INTO RentalAgreements (unit_ID, tenant_ID, start_date, end_date, total_rent_balance, security_deposit)
VALUES (:unitIDInput, :tenantIDInput, :startDateInput, :endDateInput, :totalRentBalanceInput, :securityDepositInput);

--- Insert into UtilityProviders
INSERT INTO UtilityProviders (name, service_type, utility_cost)
VALUES (:providerNameInput, :serviceTypeInput, :utilityCostInput);

--- Insert into MaintenanceRequests
INSERT INTO MaintenanceRequests (description, time_to_complete, repair_cost, is_closed)
VALUES;

--- Insert into MaintenanceWorkers
INSERT INTO MaintenanceWorkers (first_name, last_name, phone, pay_rate, qualifications, hours_worked)
VALUES (:workerFirstNameInput, :workerLastNameInput, :phoneInput, :payRateInput, :qualificationsInput, :hoursWorkedInput)

--- Insert into ProvidedUtilities
INSERT INTO ProvidedUtilities (unit_ID, provider_ID)
VALUES (:unitIDInput, :providerIDInput);

--- Insert into RequestAssignments
INSERT INTO RequestAssignments (worker_ID, maintenance_request_ID)
VALUES (:workerIDInput, :maintenanceRequestIDInput);

-------------------------- UPDATE Queries --------------------------

--- Update Unit
UPDATE Units
SET 
    is_available = :updatedIsAvailableInput,
    num_bedrooms = :updatedNumBedroomsInput,
    num_bathrooms = :updatedNumBathroomsInput,
    square_feet = :updatedSquareFeetInput,
    unit_number = :updatedUnitNumberInput,
    rent_price = :updatedRentPriceInput,
    previous_year_income = :updatedPreviousYearIncomeInput,
    year = :updatedYearInput
WHERE unit_ID = :unitIDInput;

--- Update Tenant
UPDATE Tenants
SET 
    first_name = :updatedFirstNameInput,
    last_name = :updatedLastNameInput,
    phone_number = :updatedPhoneNumberInput,
    email = :updatedEmailInput,
    rent_balance = :updatedRentBalanceInput
WHERE tenant_ID = :tenantIDInput;

--- Update UtilityProvider
UPDATE UtilityProviders
SET name = :updatedProviderNameInput, 
    service_type = :updatedServiceTypeInput,
    utility_cost = :updatedUtilityCostInput
WHERE provider_ID = :providerIDInput;


-------------------------- DELETE Queries --------------------------
--- Delete Tenant
DELETE FROM Tenants
WHERE tenant_ID = :tenantIDInput;

--Delete ProvidedUtilities
DELETE FROM ProvidedUtilities
WHERE provider_ID = (SELECT provider_ID FROM UtilityProviders WHERE name = :name);

