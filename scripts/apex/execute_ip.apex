// 1. Prepare input, options, and output maps
Map<String, Object> input = new Map<String, Object>();
Map<String, Object> options = new Map<String, Object>();
Map<String, Object> output = new Map<String, Object>();

// 2. Put required parameters into the input map
input.put('ContextId', '0U3aj000000ICabCAG');
input.put('ActionType', 'Submit');

// 3. Define your Integration Procedure Type_SubType name
String procedureName = 'DiscoveryFramework_PrefillById';

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