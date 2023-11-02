------------------------- SELECT Queries --------------------------

--- Select all Units (in progress)
SELECT * FROM Units;

--- Select all Tenants (in progress)
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

--- Insert into Units (in progress)

--- Insert into Tenants (in progress)

--- Insert into RentalAgreements

--- Insert into UtilityProviders
INSERT INTO UtilityProviders (name, service_type, utility_cost)
VALUES (:providerNameInput, :serviceTypeInput, :utilityCostInput);

--- Insert into MaintenanceRequests

--- Insert into MaintenanceWorkers

-- Insert into ProvidedUtilities

--Insert into RequestAssignments


-------------------------- UPDATE Queries --------------------------
--- Update Unit (in progress)
--- Update Tenant (in progress)

-------------------------- DELETE Queries --------------------------
--- Delete Tenant (in progress)
