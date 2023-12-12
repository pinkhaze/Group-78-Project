-- Group 78 Project Step 3 Final
-- Parker Sargeant
-- Monika Racia
------------------------- SELECT Queries --------------------------

--- Select all Units
SELECT
    unit_ID,
    is_available,
    num_bedroom,
    num_bathroom,
    square_feet,
    unit_number,
    rent_price,
    previous_year_income,
    year
FROM Units;

--- Select all Tenants
SELECT
    tenant_ID,
    first_name,
    last_name,
    phone_number,
    email,
    rent_balance
FROM Tenants;

--- Select all RentalAgreements
SELECT RentalAgreements.rental_ID, Tenants.first_name, Tenants.last_name, Units.unit_number, RentalAgreements.start_date, RentalAgreements.end_date, RentalAgreements.total_rent_balance, RentalAgreements.security_deposit
FROM RentalAgreements
JOIN Tenants ON RentalAgreements.tenant_ID = Tenants.tenant_ID
JOIN Units ON RentalAgreements.unit_ID = Units.unit_ID;

--- Select all UtilityProviders
SELECT
    provider_ID,
    name,
    service_type,
    utility_cost
FROM UtilityProviders;

--- Select all MaintenanceRequests
SELECT MaintenanceRequests.maintenance_request_ID, Units.unit_number, Tenants.first_name, Tenants.last_name, MaintenanceRequests.description, MaintenanceRequests.date_submitted, MaintenanceRequests.time_to_complete, MaintenanceRequests.repair_cost, MaintenanceRequests.is_closed
FROM MaintenanceRequests
JOIN Units ON MaintenanceRequests.unit_ID = Units.unit_ID
JOIN Tenants ON MaintenanceRequests.tenant_ID = Tenants.tenant_ID;

--- Select all MaintenanceWorkers
SELECT
    worker_ID,
    first_name,
    last_name,
    phone,
    pay_rate,
    qualification,
    hours_worked
FROM MaintenanceWorkers;

--Select all ProvidedUtilities
SELECT
    ProvidedUtilities.utility_ID,
    Units.unit_number,
    Units.is_available,
    Units.num_bedroom,
    Units.num_bathroom,
    Units.square_feet,
    Units.rent_price,
    UtilityProviders.name AS utility_provider_name,
    UtilityProviders.service_type,
    UtilityProviders.utility_cost
FROM ProvidedUtilities
JOIN Units ON ProvidedUtilities.unit_ID = Units.unit_ID
JOIN UtilityProviders ON ProvidedUtilities.provider_ID = UtilityProviders.provider_ID;

--Select all RequestAssignments
SELECT
    RequestAssignments.assignment_ID,
    MaintenanceWorkers.first_name,
    MaintenanceWorkers.last_name,
    MaintenanceWorkers.phone,
    MaintenanceRequests.description,
    MaintenanceRequests.date_submitted,
    MaintenanceRequests.time_to_complete
FROM RequestAssignments
JOIN MaintenanceWorkers ON RequestAssignments.worker_ID = MaintenanceWorkers.worker_ID
JOIN MaintenanceRequests ON RequestAssignments.maintenance_request_ID = MaintenanceRequests.maintenance_request_ID;

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

--- Update Units
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

--- Update Tenants
UPDATE Tenants
SET 
    first_name = :updatedFirstNameInput,
    last_name = :updatedLastNameInput,
    phone_number = :updatedPhoneNumberInput,
    email = :updatedEmailInput,
    rent_balance = :updatedRentBalanceInput
WHERE tenant_ID = :tenantIDInput;

--- Update UtilityProviders
UPDATE UtilityProviders
SET name = :updatedProviderNameInput, 
    service_type = :updatedServiceTypeInput,
    utility_cost = :updatedUtilityCostInput
WHERE provider_ID = :providerIDInput;

--- Update ProvidedUtilities
UPDATE ProvidedUtilities
SET 
    unit_ID = :updatedUnitIDInput,
    provider_ID = :updatedProviderIDInput
WHERE utility_ID = :utilityIDInput;

--- Update RentalAgreements
UPDATE RentalAgreements
SET 
    unit_ID = :updatedUnitIDInput,
    tenant_ID = :updatedTenantIDInput,
    start_date = :updatedStartDateInput,
    end_date = :updatedEndDateInput,
    total_rent_balance = :updatedTotalRentBalanceInput,
    security_deposit = :updatedSecurityDepositInput
WHERE rental_ID = :rentalIDInput;

--- Update MaintenanceWorkers
UPDATE MaintenanceWorkers
SET name = :updatedFirstNameInput,
    last_name = :updatedLastNameInput,
    phone = :updatedPhoneInput,
    pay_rate = :updatedpay_rateInput,
    qualification = :updatedqualificationInput,
    hours_worked = :updatedhoursworkedInput,
WHERE worker_ID = :workerIDInput

--- Update MaintenanceRequests
UPDATE MaintenanceRequests
SET 
    unit_ID = :updatedUnitIDInput,
    tenant_ID = :updatedTenantIDInput,
    description = :updatedDescriptionInput,
    date_submitted = :updatedDateSubmittedInput,
    time_to_complete = :updatedTimeToCompleteInput,
    repair_cost = :updatedRepairCostInput,
    is_closed = :updatedIsClosedInput
WHERE maintenance_request_ID = :maintenanceRequestIDInput;

--- Update RequestAssignments
UPDATE RequestAssignments
SET 
    worker_ID = :updatedWorkerIDInput,
    maintenance_request_ID = :updatedMaintenanceRequestIDInput
WHERE assignment_ID = :assignmentIDInput;=

-------------------------- DELETE Queries --------------------------
--- Delete a record from Units
DELETE FROM Units
WHERE unit_ID = :unitIDInput;

--- Delete a record from UtilityProviders
DELETE FROM UtilityProviders
WHERE provider_ID = :providerIDInput;

--- Delete a record from ProvidedUtilities
DELETE FROM ProvidedUtilities
WHERE utility_ID = :utilityIDInput;

--- Delete a record from Tenants
DELETE FROM Tenants
WHERE tenant_ID = :tenantIDInput;

--- Delete a record from RentalAgreements
DELETE FROM RentalAgreements
WHERE rental_ID = :rentalIDInput;

--- Delete a record from MaintenanceWorkers
DELETE FROM MaintenanceWorkers
WHERE worker_ID = :workerIDInput;

--- Delete a record from MaintenanceRequests
DELETE FROM MaintenanceRequests
WHERE maintenance_request_ID = :maintenanceRequestIDInput;

--- Delete a record from RequestAssignments
DELETE FROM RequestAssignments
WHERE assignment_ID = :assignmentIDInput;
