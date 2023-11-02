------------------------- SELECT Queries --------------------------

--- Select all Units (in progress)
SELECT * FROM Units;
--- Select all Tenants (in progress)
SELECT * FROM Tenants;
--- Select all RentalAgreements

--- Select all UtilityProviders
SELECT * FROM UtilityProviders;

--- Select all MaintenanceRequests ---

--- Select all MaintenanceWorkers ---

-------------------------- INSERT Queries --------------------------

--- Insert into Units (in progress)

--- Insert into Tenants (in progress)

--- Insert into RentalAgreements

--- Insert into UtilityProviders
INSERT INTO UtilityProviders (name, service_type, utility_cost)
VALUES (:providerNameInput, :serviceTypeInput, :utilityCostInput);

--- Insert into MaintenanceRequests

--- Insert into MaintenanceWorkers


-------------------------- UPDATE Queries --------------------------
--- Update Unit (in progress)
--- Update Tenant (in progress)

-------------------------- DELETE Queries --------------------------
--- Delete Tenant (in progress)
