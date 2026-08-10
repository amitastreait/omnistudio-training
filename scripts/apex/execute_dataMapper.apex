/** Step1. Prepare Input */
Map<String, Object> inputMap = new Map<String, Object>();
inputMap.put('accountType', 'Customer - Direct');

/** Step2. Wrap input inside ConnectApi representation */
ConnectApi.DataMapperExecuteInputRepresentation inputRep = 
    new ConnectApi.DataMapperExecuteInputRepresentation();
    
inputRep.dataMapperInput = new List<String>{ JSON.serialize(inputMap) };
inputRep.inputType = 'JSON';

/** Step3. Add an options representation to enforce clean response formatting */
ConnectApi.DataMapperExecuteOptionsRepresentation options = 
    new ConnectApi.DataMapperExecuteOptionsRepresentation();
options.shouldSendLegacyResponse = true; // Bypasses specific standard core formatting quirks

inputRep.options = options;

/** Step4. Execute the Data Mapper using the correct API Name */
ConnectApi.DataMapperExecuteOutputRepresentation outputRep = 
    ConnectApi.OmniDesignerConnect.executeDataMapper('DMEGetAccountsWithContacts', inputRep);

/** Step5. Parse response safely */
if (outputRep != null && outputRep.response != null && !outputRep.response.isEmpty()) {
    String jsonResponse = outputRep.response[0];
    System.debug('Data Mapper Output Payload: \n ' + jsonResponse);
} else {
    System.debug('Data Mapper executed but returned an empty response.');
}