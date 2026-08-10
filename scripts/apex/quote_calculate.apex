Map<String, Object> input = new Map<String, Object>();// {}

// Customer Information
Map<String, Object> customerInformation = new Map<String, Object>(); // {}
customerInformation.put('Name', 'John Smith');
customerInformation.put('YearsWithCompany', 4);
customerInformation.put('YearsOfDrivingExperience', 12);
customerInformation.put('DateOfBirth', '1996-07-31');
customerInformation.put('Age', 26);
customerInformation.put('State', 'California');

input.put('CustomerInformation', customerInformation);

// Vehicle Information
Map<String, Object> vehicleInformation = new Map<String, Object>();
vehicleInformation.put('CoverageType', 'Comprehensive');
vehicleInformation.put('Usage', 'Personal');
vehicleInformation.put('VehicleType', 'Sports');
vehicleInformation.put('VehicleAge', 5);
vehicleInformation.put('VehicleNumber', null);

input.put('VehicleInformation', vehicleInformation);

// Driving History
Map<String, Object> drivingHistory = new Map<String, Object>();
drivingHistory.put('NumberOfAccidents', 0);
drivingHistory.put('TrafficViolations', 0);
drivingHistory.put('LicenceNumber', '89788989');
drivingHistory.put('DateOfIssue', '2017-08-01');
drivingHistory.put('LicenceExpiryDate', '2029-08-09');

input.put('DrivingHistory', drivingHistory);

Map<String, Object> options = new Map<String, Object>();
Map<String, Object> output = new Map<String, Object>();

// 3. Define your Integration Procedure Type_SubType name
String procedureName = 'quote_calculate';

try {
    // 4. Invoke the service (use 'omnistudio' or 'vlocity_cmt' namespace)
    output = (Map<String, Object>) omnistudio.IntegrationProcedureService.runIntegrationService(
        procedureName, 
        input, 
        options
    );
    System.debug('IP Output: \n ' + JSON.serializePretty(output));
} catch (Exception e) {
    System.debug('Error calling Integration Procedure: ' + e.getMessage());
}